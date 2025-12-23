"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Tabaccaio = {
  id: number;
  consenso_marketing: boolean | null;
  stato_relazione_supreme: string | null;
};

export default function DashboardPage() {
  const [totali, setTotali] = useState(0);
  const [conConsenso, setConConsenso] = useState(0);
  const [inTrattativa, setInTrattativa] = useState(0);
  const [clientiAttivi, setClientiAttivi] = useState(0);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("tabaccai").select("*");

      if (data) {
        setTotali(data.length);
        setConConsenso(data.filter((t) => t.consenso_marketing).length);
        setInTrattativa(data.filter((t) => t.stato_relazione_supreme === "In trattativa").length);
        setClientiAttivi(data.filter((t) => t.stato_relazione_supreme === "Cliente attivo").length);
      }
    }

    load();
  }, []);

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard CRM Suprem-e</h1>

      {/* CARDS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500 text-sm">Tabaccai totali</p>
          <p className="text-3xl font-bold mt-1">{totali}</p>
        </div>

        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500 text-sm">Con consenso marketing</p>
          <p className="text-3xl font-bold mt-1 text-green-600">{conConsenso}</p>
        </div>

        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500 text-sm">In trattativa</p>
          <p className="text-3xl font-bold mt-1 text-blue-600">{inTrattativa}</p>
        </div>

        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500 text-sm">Clienti attivi</p>
          <p className="text-3xl font-bold mt-1 text-purple-600">{clientiAttivi}</p>
        </div>
      </div>

      {/* SEZIONE LINK RAPIDI */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3 text-lg">Azioni rapide</h2>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/tabaccai"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            📄 Gestione tabaccai
          </Link>

          <Link
            href="/tabaccai/nuovo"
            className="px-4 py-2 bg-green-600 text-white rounded shadow"
          >
            ➕ Aggiungi tabaccaio
          </Link>

          <Link
            href="/agenda"
            className="px-4 py-2 bg-gray-700 text-white rounded shadow"
          >
            🗓 Agenda
          </Link>
        </div>
      </section>
    </main>
  );
}