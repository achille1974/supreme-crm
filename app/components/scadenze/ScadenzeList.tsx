"use client";

import { useEffect, useState } from "react";
import { getScadenzeByCliente, markScadenzaGestita } from "@/lib/data/scadenze";
import { Scadenza } from "@/lib/types/scadenza";
import ScadenzaForm from "./ScadenzaForm";

export default function ScadenzeList({ clienteId }: { clienteId: number }) {
  const [scadenze, setScadenze] = useState<Scadenza[]>([]);
  const [editing, setEditing] = useState<Scadenza | null>(null);
  const [adding, setAdding] = useState(false);

  async function load() {
    const data = await getScadenzeByCliente(clienteId);
    setScadenze(data);
  }

  useEffect(() => {
    load();
  }, [clienteId]);

  return (
    <div>
      <button onClick={() => setAdding(true)}>➕ Aggiungi scadenza</button>

      {adding && (
        <ScadenzaForm
          clienteId={clienteId}
          onClose={() => setAdding(false)}
          onSaved={load}
        />
      )}

      {editing && (
        <ScadenzaForm
          clienteId={clienteId}
          scadenza={editing}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}

      <ul>
        {scadenze.map((s) => (
          <li key={s.id}>
            <b>{s.tipo_scadenza}</b> – {s.data_scadenza} –{" "}
            {s.descrizione || "-"} – <i>{s.stato}</i>
            {s.stato === "attiva" && (
              <>
                <button onClick={() => setEditing(s)}>✏️</button>
                <button
                  onClick={async () => {
                    await markScadenzaGestita(s.id);
                    load();
                  }}
                >
                  ✅
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
