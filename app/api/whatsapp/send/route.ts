import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { createClient } from "@supabase/supabase-js";
import { hasPrivacyConsent } from "@/lib/data/privacy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TemplateKind = "intro" | "followup";

function digitsOnly(input: string) {
  return (input || "").replace(/[^\d]/g, "");
}

function toWhatsappAddress(rawPhone: string) {
  let d = digitsOnly(rawPhone);

  // 00... -> (togli 00)
  if (d.startsWith("00")) d = d.slice(2);

  // IT: se è un cellulare da 10 cifre che inizia per 3, aggiungi prefisso 39
  if (d.length === 10 && d.startsWith("3")) d = "39" + d;

  return `whatsapp:+${d}`;
}

function pickPhone(tab: any): string | null {
  return (
    tab?.whatsapp_numero ||
    tab?.whatsapp ||
    tab?.cellulare ||
    tab?.telefono ||
    tab?.telefono_fisso ||
    tab?.phone ||
    tab?.mobile ||
    tab?.tel ||
    null
  );
}

function isTemplateRequiredError(err: any) {
  const code = err?.code;
  const msg = String(err?.message || "").toLowerCase();

  // Twilio: 63016 = fuori finestra 24h, serve template
  if (code === 63016) return true;

  if (msg.includes("outside the allowed window")) return true;
  if (msg.includes("use a template")) return true;
  if (msg.includes("message template")) return true;

  return false;
}

function getTemplateSid(kind: TemplateKind | undefined) {
  if (kind === "followup") return process.env.TWILIO_WHATSAPP_TEMPLATE_SID_FOLLOWUP;
  return process.env.TWILIO_WHATSAPP_TEMPLATE_SID; // default intro
}

function normalizeTemplateVars(input: any): Record<string, string> {
  const obj = input && typeof input === "object" ? input : {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) out[String(k)] = String(v ?? "");
  return out;
}

function nowIso() {
  return new Date().toISOString();
}

function shouldSetBigliettoSent(kind: TemplateKind | undefined, message?: string) {
  if (kind === "intro") return true;
  if (!message) return false;
  return message.includes("/v/achille") || message.includes("v/achille");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const tabaccaioId = Number(body?.tabaccaioId);
    const message: string | undefined = body?.message;
    const preview: boolean = Boolean(body?.preview);
    const forceTemplate: boolean = Boolean(body?.forceTemplate);

    const templateKind: TemplateKind | undefined = body?.template;
    const templateSidOverride: string | undefined = body?.templateSid;
    const templateVariables = normalizeTemplateVars(body?.templateVariables);

    if (!tabaccaioId || Number.isNaN(tabaccaioId)) {
      return NextResponse.json(
        { ok: false, error: "tabaccaioId mancante o non valido" },
        { status: 400 }
      );
    }

    // --- ENV Supabase (admin read/write) ---
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { ok: false, error: "ENV Supabase mancanti (URL o SERVICE_ROLE_KEY)" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: tab, error: tabErr } = await supabaseAdmin
      .from("tabaccai")
      .select("*")
      .eq("id", tabaccaioId)
      .single();

    if (tabErr || !tab) {
      return NextResponse.json(
        { ok: false, error: "Tabaccaio non trovato", detail: tabErr?.message || null },
        { status: 404 }
      );
    }

    const rawPhone = pickPhone(tab);
    if (!rawPhone) {
      return NextResponse.json(
        {
          ok: false,
          error: "Numero mancante nel record tabaccaio (whatsapp/cellulare/telefono)",
          tabaccaioId,
        },
        { status: 400 }
      );
    }

    const to = toWhatsappAddress(String(rawPhone));

    // --- Consenso ---
    let consent = false;
    try {
      consent = await hasPrivacyConsent(tabaccaioId);
    } catch {
      consent = false;
    }

    // --- ENV Twilio ---
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (!accountSid || !authToken) {
      return NextResponse.json(
        { ok: false, error: "ENV Twilio mancanti (ACCOUNT_SID / AUTH_TOKEN)" },
        { status: 500 }
      );
    }

    // Sender: usa MG se presente, altrimenti FROM
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    const from = process.env.TWILIO_WHATSAPP_FROM; // sandbox
    if (!messagingServiceSid && !from) {
      return NextResponse.json(
        { ok: false, error: "Manca TWILIO_MESSAGING_SERVICE_SID oppure TWILIO_WHATSAPP_FROM" },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const baseParams: any = {
      to,
      ...(messagingServiceSid ? { messagingServiceSid } : { from }),
    };

    async function sendTemplate(kindUsed: TemplateKind) {
      const sid = templateSidOverride || getTemplateSid(kindUsed);

      if (!sid) {
        throw new Error(
          `TemplateSid mancante: imposta ${
            kindUsed === "intro"
              ? "TWILIO_WHATSAPP_TEMPLATE_SID"
              : "TWILIO_WHATSAPP_TEMPLATE_SID_FOLLOWUP"
          } (HX...)`
        );
      }

      return client.messages.create({
        ...baseParams,
        contentSid: sid,
        contentVariables: JSON.stringify(templateVariables),
      });
    }

    async function sendFreeform() {
      if (!message || !message.trim()) {
        throw new Error("message mancante per invio freeform");
      }
      return client.messages.create({
        ...baseParams,
        body: message,
      });
    }

    async function updateCrmAfterSend(args: {
      mode: "template" | "freeform" | "template_fallback";
      templateUsed?: TemplateKind;
      twilioSid?: string | null;
    }) {
      const ts = nowIso();

      const update: any = {
        last_message_at: ts,
        last_contact_at: ts,
        whatsapp_ok: true,
        whatsapp_enabled: true,
      };

      if (!tab.first_message_at) update.first_message_at = ts;
      if (!tab.first_contact_at) update.first_contact_at = ts;

      const currentStatus = String(tab.crm_status || "").trim().toLowerCase();
      if (!currentStatus || currentStatus === "new") update.crm_status = "contacted";

      if (!tab.biglietto_inviato_at && shouldSetBigliettoSent(args.templateUsed, message)) {
        update.biglietto_inviato_at = ts;
      }

      const { error: updErr } = await supabaseAdmin.from("tabaccai").update(update).eq("id", tabaccaioId);

      return { ok: !updErr, error: updErr?.message || null, update };
    }

    // --- Preview (nessun invio) ---
    if (preview) {
      const suggestedMode = forceTemplate || !consent || !message?.trim() ? "template" : "freeform";
      return NextResponse.json({
        ok: true,
        preview: true,
        tabaccaioId,
        to,
        consent,
        suggestedMode,
        template: templateKind || "intro",
        templateSid: templateSidOverride || getTemplateSid(templateKind) || null,
        templateVariables,
        message: message || null,
      });
    }

    // --- Regola invio ---
    const mustTemplate = forceTemplate || !consent || !message?.trim();

    console.log("[WA_SEND]", {
      tabaccaioId,
      to,
      consent,
      mustTemplate,
      requestedTemplate: templateKind || null,
      hasMessage: Boolean(message?.trim()),
    });

    // ✅ FIX DEFINITIVO:
    // - se NON c'è consenso → sempre INTRO
    // - se è primo contatto → sempre INTRO
    if (mustTemplate) {
      const isFirstContact = !tab.first_message_at;

      let kind: TemplateKind = templateKind || "intro";
      if (!consent || isFirstContact) kind = "intro";

      const m = await sendTemplate(kind);
      const crm = await updateCrmAfterSend({ mode: "template", templateUsed: kind, twilioSid: m.sid });

      return NextResponse.json({
        ok: true,
        mode: "template",
        template: kind,
        sid: m.sid,
        status: m.status,
        to,
        tabaccaioId,
        consent,
        crm,
      });
    }

    // Proviamo freeform
    try {
      const m = await sendFreeform();
      const crm = await updateCrmAfterSend({ mode: "freeform", twilioSid: m.sid });

      return NextResponse.json({
        ok: true,
        mode: "freeform",
        sid: m.sid,
        status: m.status,
        to,
        tabaccaioId,
        consent,
        crm,
      });
    } catch (err: any) {
      // Sandbox: destinatario non ha joinato
      if (err?.code === 63015) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Errore 63015: se stai usando la Sandbox WhatsApp, il destinatario deve 'joinare' la sandbox.",
            detail: err?.message || null,
            to,
            tabaccaioId,
          },
          { status: 400 }
        );
      }

      // Fuori finestra 24h -> fallback su template followup
      if (isTemplateRequiredError(err)) {
        const m = await sendTemplate("followup");
        const crm = await updateCrmAfterSend({
          mode: "template_fallback",
          templateUsed: "followup",
          twilioSid: m.sid,
        });

        return NextResponse.json({
          ok: true,
          mode: "template_fallback",
          template: "followup",
          sid: m.sid,
          status: m.status,
          to,
          tabaccaioId,
          consent,
          note: "freeform non permesso (fuori 24h) -> inviato template followup",
          crm,
        });
      }

      throw err;
    }
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Errore non gestito" },
      { status: 500 }
    );
  }
}
