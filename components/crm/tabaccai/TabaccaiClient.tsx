"use client";

import { useMemo, useState } from "react";
import TabaccaiList from "./TabaccaiList";
import { useTabaccai } from "./data/useTabaccai";

export default function TabaccaiClient() {
  // 🔗 DATI CENTRALIZZATI
  const {
    tabaccai,
    loading,
    reload,
  } = useTabaccai();

  // 🔍 filtri UI
  const [search, setSearch] = useState("");
  const [comune, setComune] = useState("");

  // 📍 elenco comuni (derivato, non query)
  const comuni = useMemo(() => {
    return Array.from(
      new Set(
        tabaccai
          .map((t) => t.comune)
          .filter(Boolean)
      )
    ).sort();
  }, [tabaccai]);

  // 🔎 filtro finale (SOLO client)
  const filteredTabaccai = useMemo(() => {
    return tabaccai.filter((t) => {
      if (comune && t.comune !== comune) return false;

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
      <TabaccaiList
        tabaccai={filteredTabaccai}
        onReload={reload}
      />
    </div>
  );
}
