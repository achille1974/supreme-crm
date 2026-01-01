export type TabaccaioMock = {
  nome: string;
  citta: string;
  telefono: string;
  email: string;
};

export const TABACCAI_MOCK: Record<number, TabaccaioMock> = {
  218: {
    nome: "Tabaccheria Beltrami",
    citta: "Floridia",
    telefono: "0931 123456",
    email: "info@tabaccaiobeltrami.it",
  },
  219: {
    nome: "Tabaccheria Rossi",
    citta: "Siracusa",
    telefono: "0931 654321",
    email: "rossi@example.it",
  },
  220: {
    nome: "Tabaccheria Bianchi",
    citta: "Avola",
    telefono: "0931 777888",
    email: "bianchi@example.it",
  },
};