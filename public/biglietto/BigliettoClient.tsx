"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BigliettoClient() {
  const searchParams = useSearchParams();
  const tabaccaioId = Number(searchParams.get("tabaccaio_id"));

  const [loading, setLoading] = useState(true);
  const [tabaccaio, setTabaccaio] = useState<any>(null);

  useEffect(() => {
    if (!tabaccaioId) {
      setLoading(false);
      return;
    }

    async function load() {
      const { data, error } = await supabase
        .from("tabaccai")
        .select("*")
        .eq("id", tabaccaioId)
        .single();

      if (!error) setTabaccaio(data);
      setLoading(false);
    }

    load();
  }, [tabaccaioId]);

  if (loading) return null;

  if (!tabaccaio) {
    return (
      <div className="p-6">
        <h2>Biglietto non disponibile</h2>
        <p>ID non valido o tabaccaio non trovato</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {tabaccaio.ragione_sociale}
      </h1>

      <p className="text-slate-600">
        {tabaccaio.comune} – {tabaccaio.indirizzo}
      </p>

      <hr />

      <h2 className="text-xl font-semibold">
        Achille Beltrami
      </h2>

      <p className="text-sm">
        Tabaccheria storica dal 1876 · Quarta generazione
      </p>

      <p className="text-sm text-slate-700">
        Il tabaccaio oggi non è più un semplice punto vendita.
        È un imprenditore che deve scegliere, specializzarsi
        e costruire margini sostenibili.
      </p>

      <p className="text-sm text-slate-700">
        Questo progetto nasce da un’esperienza reale,
        applicata prima nella mia tabaccheria e oggi
        replicabile per altri colleghi.
      </p>
    </div>
  );
}
