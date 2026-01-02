"use client";

import TabaccaioRow from "./TabaccaioRow";

export type Tabaccaio = {
  id?: number | null; // ✅ FIX DEFINITIVO
  id_tabacchino?: number | null;

  ragione_sociale?: string | null;
  comune?: string | null;
  indirizzo?: string | null;

  stato_supreme?: string | null;
  interesse_supreme?: string | null;
  priorita?: string | null;

  stato_consenso?: string | null;
  data_prossima_azione?: string | null;
};

export default function TabaccaiList({
  tabaccai,
}: {
  tabaccai: Tabaccaio[];
}) {
  if (!tabaccai.length) {
    return (
      <div className="text-sm text-gray-500">
        Nessun tabaccaio trovato
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tabaccai.map((t, idx) => (
        <div key={t.id ?? idx}>
          <TabaccaioRow tabaccaio={t} />
        </div>
      ))}
    </div>
  );
}
