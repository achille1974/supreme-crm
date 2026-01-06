export type Responsabile = {
  id: string;
  nome: string;
  cognome: string;
  telefono: string; // numero WhatsApp (Twilio o reale)
  ruolo: string;
  foto: string; // URL pubblico
};

export const RESPONSABILI: Record<string, Responsabile> = {
  marco_magnano: {
    id: "marco_magnano",
    nome: "Marco",
    cognome: "Magnano",
    telefono: "+39XXXXXXXXXX",
    ruolo: "Responsabile PHONESIA Floridia",
    foto: "/phonesia/images/responsabili/marco-magnano.jpg",
  },
  federico_berardi: {
    id: "federico_berardi",
    nome: "Federico",
    cognome: "Berardi",
    telefono: "+39XXXXXXXXXX",
    ruolo: "Responsabile PHONESIA Augusta",
    foto: "/phonesia/images/responsabili/federico-berardi.jpg",
  },
  andrea_bellofiore: {
    id: "andrea_bellofiore",
    nome: "Andrea",
    cognome: "Bellofiore",
    telefono: "+39XXXXXXXXXX",
    ruolo: "Responsabile PHONESIA Siracusa",
    foto: "/phonesia/images/responsabili/andrea-bellofiore.jpg",
  },
  gaetano_proietto: {
    id: "gaetano_proietto",
    nome: "Gaetano",
    cognome: "Proietto",
    telefono: "+39XXXXXXXXXX",
    ruolo: "Responsabile PHONESIA Avola",
    foto: "/phonesia/images/responsabili/gaetano-proietto.jpg",
  },
  achille_beltrami: {
    id: "achille_beltrami",
    nome: "Achille",
    cognome: "Beltrami",
    telefono: "+39XXXXXXXXXX",
    ruolo: "Tabaccheria Beltrami",
    foto: "/phonesia/images/responsabili/achille-beltrami.jpg",
  },
};
