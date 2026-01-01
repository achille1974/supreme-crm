export function openWhatsApp(rawNumber?: string) {
  if (!rawNumber) {
    alert("Numero WhatsApp mancante");
    return;
  }

  // Pulizia numero
  let numero = rawNumber.replace(/[^\d]/g, "");

  // Prefisso Italia
  if (numero.length === 10) {
    numero = "39" + numero;
  }

  // ⚠️ TESTO SENZA EMOJI (LINK SEMPRE CLICCABILE)
  const testo =
    "Ciao, sono Achille.\n\n" +
    "Ti mando il mio biglietto digitale:\n" +
    "https://app.crm-supreme.it/v/achille\n\n" +
    "Qui trovi chi sono, la mia storia e tutti i contatti.\n" +
    "A presto.";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
  window.open(url, "_blank");
}
