/**
 * Punto di Relazione
 * ==================
 * Identifica un QR / NFC reale (negozio fisico o progetto)
 * e collega:
 * - contesto (negozio)
 * - responsabile umano
 * - canale WhatsApp (Twilio)
 *
 * QUESTO FILE È STRATEGICO.
 * Se cambia una persona o un numero:
 * - NON cambiare gli ID
 * - aggiorna solo i riferimenti
 */

export type PuntoRelazione = {
  id: string;
  nome: string;
  indirizzo: string;
  responsabileId: string;   // riferimento a RESPONSABILI
  canaleWhatsApp: "twilio"; // canale unico
  progetto: "phonesia" | "tabaccai";
};

export const PUNTI_RELAZIONE: PuntoRelazione[] = [
  {
    id: "phonesia_floridia",
    nome: "PHONESIA Floridia",
    indirizzo: "Corso Vittorio Emanuele 735/737",
    responsabileId: "marco_magnano",
    canaleWhatsApp: "twilio",
    progetto: "phonesia",
  },
  {
    id: "phonesia_augusta",
    nome: "PHONESIA Augusta",
    indirizzo: "Via Italia 195/197",
    responsabileId: "federico_berardi",
    canaleWhatsApp: "twilio",
    progetto: "phonesia",
  },
  {
    id: "phonesia_siracusa",
    nome: "PHONESIA Siracusa",
    indirizzo: "Corso Gelone 41",
    responsabileId: "andrea_bellofiore",
    canaleWhatsApp: "twilio",
    progetto: "phonesia",
  },
  {
    id: "phonesia_avola",
    nome: "PHONESIA Avola",
    indirizzo: "Corso Vittorio Emanuele 281/283",
    responsabileId: "gaetano_proietto",
    canaleWhatsApp: "twilio",
    progetto: "phonesia",
  },
  {
    id: "tabaccheria_beltrami",
    nome: "Tabaccheria Beltrami",
    indirizzo: "Via Archimede 202",
    responsabileId: "achille_beltrami",
    canaleWhatsApp: "twilio",
    progetto: "tabaccai",
  },
];
