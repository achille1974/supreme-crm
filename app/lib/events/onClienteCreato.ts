import { createClient } from "@supabase/supabase-js";
import { sendWhatsApp } from "@/lib/services/whatsappService";

// 🔒 Supabase server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Evento: cliente creato da QR / NFC con privacy accettata
 * Scopo: inviare UNA SOLA VOLTA il messaggio di benvenuto
 */
export async function onClienteCreato(clienteId: number) {
  // 1️⃣ ricarico cliente (verità ufficiale)
  const { data: cliente, error } = await supabase
    .from("acq_clienti")
    .select("*")
    .eq("id", clienteId)
    .single();

  if (error || !cliente) {
    console.error("Cliente non trovato", clienteId);
    return;
  }

  // 2️⃣ controlli BLOCCANTI
  if (cliente.privacy_accepted !== true) return;
  if (!cliente.whatsapp) return;
  if (cliente.source !== "qr_nfc_negozio") return;

  // 3️⃣ LOCK anti-doppio invio (idempotenza)
  const { data: lock } = await supabase
    .from("acq_clienti")
    .update({
      benvenuto_inviato: true,
      benvenuto_inviato_at: new Date().toISOString(),
    })
    .eq("id", cliente.id)
    .eq("benvenuto_inviato", false)
    .select();

  if (!lock || lock.length === 0) {
    // già inviato o già in corso
    return;
  }

  // 4️⃣ testo benvenuto (TESTO BLOCCATO APPROVATO)
  const testo = `Ciao 👋
sono ${cliente.responsabile_nome}, responsabile di PHONESIA.

Non siamo un call center né un operatore da centro commerciale.
Siamo un negozio su strada, fatto di persone, dove il cliente viene prima di tutto.

Il nostro obiettivo è essere il tuo punto di riferimento per tutto ciò che riguarda i settori che trattiamo, con un rapporto diretto, umano e nel tempo.

Qui trovi il mio biglietto digitale, così sai sempre con chi stai parlando:
👉 ${cliente.link_biglietto}

A presto,
${cliente.responsabile_nome}`;

  // 5️⃣ invio WhatsApp via Twilio
  const result = await sendWhatsApp(cliente.whatsapp, testo);

  // 6️⃣ log SEMPRE (successo o errore)
  await supabase.from("acq_log_messaggi").insert({
    cliente_id: cliente.id,
    canale: "whatsapp",
    tipo: "automatico",
    categoria: "benvenuto",
    origine: "qr_nfc_negozio",
    testo_snapshot: testo,
    provider: "twilio",
    esito: result.success ? "success" : "error",
    provider_message_id: result.sid || null,
  });

  // 7️⃣ rollback se Twilio fallisce
  if (!result.success) {
    await supabase
      .from("acq_clienti")
      .update({
        benvenuto_inviato: false,
        benvenuto_inviato_at: null,
      })
      .eq("id", cliente.id);
  }
}
