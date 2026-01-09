"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TabaccaiList from "./TabaccaiList";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TabaccaiClient() {
  const [tabaccai, setTabaccai] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 filtri
  const [search, setSearch] = useState("");
  const [comune, setComune] = useState("");

  // 📥 carico lista UNA VOLTA
  useEffect(() => {
    supabase
      .from("tabaccai_master")
      .select("*")
      .order("comune", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase error:", error);
          setTabaccai([]);
        } else {
          setTabaccai(data ?? []);
        }
        setLoading(false);
      });
  }, []);

  // 📍 elenco comuni (unici)
  const comuni = useMemo(() => {
    return Array.from(
      new Set(
        tabaccai
          .map((t) => t.comune)
          .filter(Boolean)
      )
    ).sort();
  }, [tabaccai]);

  // 🔎 filtro finale
  const filteredTabaccai = useMemo(() => {
    return tabaccai.filter((t) => {
      // filtro comune
      if (comune && t.comune !== comune) return false;

      // ricerca libera
      if (search.trim()) {
        const q = search.toLowerCase();

        const haystack = `
          ${t.ragione_sociale ?? ""}
          ${t.comune ?? ""}
          ${t.indirizzo ?? ""}
          ${t.telefono ?? ""}
          ${t.cellulare ?? ""}
        `.toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [tabaccai, search, comune]);

  if (loading) {
    return <div className="p-4">Caricamento…</div>;
  }

  return (
    <div className="space-y-4">
      {/* FILTRI */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* 🔍 ricerca */}
        <input
          type="text"
          placeholder="Cerca per nome, telefono, indirizzo…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-lg
            border border-gray-300
            px-4 py-2
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />

        {/* 📍 comune */}
        <select
          value={comune}
          onChange={(e) => setComune(e.target.value)}
          className="
            w-full md:w-64
            rounded-lg
            border border-gray-300
            px-4 py-2
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        >
          <option value="">Tutti i comuni</option>
          {comuni.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* LISTA */}
      <TabaccaiList tabaccai={filteredTabaccai} />
    </div>
  );
}
