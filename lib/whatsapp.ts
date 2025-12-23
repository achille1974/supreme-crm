// lib/whatsapp.ts

export function formatWhatsAppNumber(raw: string): string {
  // toglie tutto ciò che non è numero
  let cleaned = raw.replace(/\D/g, "");

  // rimuove zeri iniziali
  cleaned = cleaned.replace(/^0+/, "");

  // se non inizia con 39 (Italia), lo aggiunge
  if (!cleaned.startsWith("39")) {
    cleaned = "39" + cleaned;
  }

  return cleaned;
}