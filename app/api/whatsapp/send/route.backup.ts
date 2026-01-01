import { NextResponse } from "next/server";
import Twilio from "twilio";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPrivacyConsent } from "@/lib/data/privacy";

export async function POST(req: Request) {
  try {
    const { tabaccaioId } = await req.json();

    if (!tabaccaioId) {
      return NextResponse.json(
        { error: "tabaccaioId mancante" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // 1️⃣ Verifica consenso privacy
    const consent = await hasPrivacyConsent(tabaccaioId);
    if (!consent) {
      return NextResponse.json(
        { error: "Consenso privacy mancante" },
        { status: 403 }
      );
    }

    // 2️⃣ Recupera numero del tabaccaio
    const { data: tabaccaio, error: tabError } = await supabase
      .from("tabaccai")
      .select("telefono")
      .eq("id", tabaccaioId)
      .single();

    if (tabError || !tabaccaio?.telefono) {
      return NextResponse.json(
        { error: "Numero di telefono non disponibile" },
        { status: 400 }
      );
    }

    // 3️⃣ Inizializza Twilio
    const client = Twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    const messageBody = "Ciao! Messaggio di test dal tuo CRM 🚀";

    // 🔴 NUMERO WHATSAPP REALE (NON SANDBOX)
    await client.messages.create({
      from: "whatsapp:+15557380908", // ← IL TUO NUMERO REALE TWILIO
      to: `whatsapp:${tabaccaio.telefono}`,
      body: messageBody,
    });

    // 4️⃣ Salva messaggio nel DB
    await supabase.from("messages").insert({
      tabaccaio_id: tabaccaioId,
      direction: "out",
      channel: "whatsapp",
      body: messageBody,
      template_name: null,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Errore invio WhatsApp:", err);

    return NextResponse.json(
      { error: err.message || "Errore interno" },
      { status: 500 }
    );
  }
}