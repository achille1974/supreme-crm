"use client";

import { useState } from "react";
import TabaccaioRow from "./TabaccaioRow";
import NuovoTabaccaioModal from "./NuovoTabaccaioModal";

export type Tabaccaio = {
  id?: number | null;
  id_tabacchino?: number | null;

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
  const [open, setOpen] = useState(false);

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

        <button
          onClick={() => setOpen(true)}
          className="
            px-4 py-2 rounded-lg
            bg-blue-600 text-white font-semibold
            hover:bg-blue-700
          "
        >
          ➕ Nuovo tabaccaio
        </button>
      </div>

      {/* LISTA */}
      {!tabaccai || tabaccai.length === 0 ? (
        <div className="text-sm text-slate-500 text-center py-8">
          Nessun tabaccaio trovato.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tabaccai.map((t) => {
            const id = t.id_tabacchino ?? t.id;
            if (!id) return null;

            return (
              <div
                key={id}
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

      {/* MODALE NUOVO TABACCAIO */}
      {open && (
        <NuovoTabaccaioModal
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
