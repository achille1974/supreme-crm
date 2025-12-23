"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function NewsletterPage() {
  const [tabaccai, setTabaccai] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtroComune, setFiltroComune] = useState("");

  // CARICA SOLO CHI HA IL CONSENSO
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("tabaccai")
        .select("*")
        .eq("consenso_marketing", true)
        .order("comune")
        .order("ragione_sociale");

      setTabaccai(data || []);
      setLoading(false);
    };

    load();
  }, []);

  const comuniDisponibili = useMemo(() => {
    const set = new Set<string>();
    tabaccai.forEach((t) => t.comune && set.add(t.comune));
    return Array.from(set);
  }, [tabaccai]);

  const filtrati = useMemo(() => {
    return tabaccai.filter((t) => !filtroComune || t.comune === filtroComune);
  }, [tabaccai, filtroComune]);

  // EXPORT EMAIL
  const exportEmails = () => {
    const emails = filtrati
      .map((t) => t.email || t.whatsapp_numero || t.cellulare)
      .filter(Boolean)
      .join("; ");

    navigator.clipboard.writeText(emails);
    alert("Lista email/contatti copiata!");
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Lista Newsletter (solo consensi)</h1>

      <Link href="/tabaccai" className="text-blue-600 underline text-sm">
        ← Torna ai tabaccai
      </Link>

      <section className="border rounded p-3 bg-gray-50">
        <label className="block text-sm font-medium">Filtra per comune</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filtroComune}
          onChange={(e) => setFiltroComune(e.target.value)}
        >
          <option value="">Tutti</option>
          {comuniDisponibili.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          className="ml-3 px-3 py-1 bg-blue-600 text-white text-xs rounded"
          onClick={exportEmails}
        >
          📧 Esporta lista contatti
        </button>
      </section>

      {/* TABELLA */}
      <section className="border rounded bg-white overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1">Ragione sociale</th>
              <th className="px-2 py-1">Comune</th>
              <th className="px-2 py-1">Contatto</th>
              <th className="px-2 py-1">Canale consenso</th>
              <th className="px-2 py-1">Data</th>
            </tr>
          </thead>
          <tbody>
            {filtrati.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-2 py-1">{t.ragione_sociale}</td>
                <td className="px-2 py-1">{t.comune}</td>
                <td className="px-2 py-1">
                  {t.whatsapp_numero || t.cellulare}
                </td>
                <td className="px-2 py-1">{t.consenso_canale}</td>
                <td className="px-2 py-1">{t.consenso_data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}