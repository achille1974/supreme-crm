"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Interazione = {
  id: number;
  data_ora: string;
  canale: string | null;
  oggetto: string | null;
  esito: string | null;
  note: string | null;
};

export default function InterazioniList({ tabaccaioId }: { tabaccaioId: number }) {
  const [interazioni, setInterazioni] = useState<Interazione[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("interazioni")
      .select("*")
      .eq("tabaccaio_id", tabaccaioId)
      .order("data_ora", { ascending: false });

    setInterazioni(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Caricamento interazioni…</p>;

  if (!interazioni.length)
    return <p className="text-sm text-gray-500">Nessuna interazione registrata.</p>;

  return (
    <div className="space-y-3">
      {interazioni.map((i) => (
        <div key={i.id} className="border rounded p-3 bg-gray-50">
          <div className="flex justify-between">
            <strong>{i.oggetto || "Senza oggetto"}</strong>
            <span className="text-xs text-gray-500">
              {new Date(i.data_ora).toLocaleString("it-IT")}
            </span>
          </div>

          <p className="text-xs text-gray-600">
            Canale: <strong>{i.canale || "-"}</strong> — Esito:{" "}
            <strong>{i.esito || "-"}</strong>
          </p>

          {i.note && (
            <p className="mt-2 text-sm bg-white p-2 rounded border">{i.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}