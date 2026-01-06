"use client";

import { useEffect, useState } from "react";
import ScadenzaForm from "./ScadenzaForm";

type Scadenza = {
  id: number;
  titolo: string;
  data_scadenza: string;
};

type Props = {
  clienteId: number;
};

export default function ScadenzeList({ clienteId }: Props) {
  const [scadenze, setScadenze] = useState<Scadenza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/phonesia/api/scadenze?cliente_id=${clienteId}`
        );
        const json = await res.json();
        setScadenze(json || []);
      } catch {
        setScadenze([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [clienteId]);

  if (loading) return <p>Caricamento scadenze…</p>;

  return (
    <div>
      <ScadenzaForm clienteId={clienteId} />

      {scadenze.length === 0 ? (
        <p style={{ color: "#777", marginTop: 12 }}>
          Nessuna scadenza presente.
        </p>
      ) : (
        <ul style={{ marginTop: 12 }}>
          {scadenze.map((s) => (
            <li key={s.id}>
              {s.titolo} –{" "}
              {new Date(s.data_scadenza).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
