export type ScadenzaStato = "attiva" | "gestita";

export type Scadenza = {
  id: number;
  cliente_id: number;
  tipo_scadenza: string;
  data_scadenza: string;
  descrizione?: string | null;
  stato: ScadenzaStato;
  created_at: string;
};
