"use client";

import Link from "next/link";
import TabaccaioRow from "./TabaccaioRow";

export type Tabaccaio = {
  id?: number | null;

  ragione_sociale?: string | null;
  comune?: string | null;
  provincia?: string | null;
  indirizzo?: string | null;

  telefono?: string | null;
  cellulare?: string | null;
  email?: string | null;

  stato_supreme?: string | null;
  interesse_supreme?: string | null;
  priorita?: string | null;

  tipo_cliente?: string | null;

  stato_consenso?: string | null;
  canali_consenso?: string | null;

  prossima_azione?: string | null;
  data_prossima_azione?: string | null;
};

type Props = {
  tabaccai: Tabaccaio[];
};

export default function TabaccaiList({ tabaccai }: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* HEADER LISTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Lista tabaccai
          </h2>
          <p className="text-sm text-slate-500">
            Agenda operativa
          </p>
        </div>

        {/* ✅ UNICO MODO CORRETTO DI CREARE */}
        <Link
          href="/tabaccai/new"
          className="
            px-4 py-2 rounded-lg
            bg-green-600 text-white font-semibold
            hover:bg-green-700
          "
        >
          ➕ Nuovo tabaccaio
        </Link>
      </div>

      {/* LISTA */}
      {!tabaccai || tabaccai.length === 0 ? (
        <div className="text-sm text-slate-500 text-center py-8">
          Nessun tabaccaio trovato.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tabaccai.map((t) => {
            if (!t.id) return null;

            return (
              <div
                key={t.id}
                className="
                  bg-white
                  rounded-xl
                  border border-slate-200
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                <TabaccaioRow tabaccaio={t} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
