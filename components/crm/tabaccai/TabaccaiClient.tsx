"use client";

import { useMemo, useState } from "react";
import TabaccaiList from "./TabaccaiList";
import TabaccaiFilters from "./TabaccaiFilters";

/**
 * Tipo UNIFICATO e compatibile
 * (coincide con TabaccaiList e TabaccaioRow)
 */
export type Tabaccaio = {
  id?: number | null;
  id_tabacchino?: number | null;

  ragione_sociale?: string | null;
  comune?: string | null;
  indirizzo?: string | null;

  stato_supreme?: string | null;
  interesse_supreme?: string | null;
  priorita?: string | null;

  stato_consenso?: string | null;
  data_prossima_azione?: string | null;
};

type Filters = {
  search: string;
  comune: string;
};

export default function TabaccaiClient({
  tabaccai,
}: {
  tabaccai: Tabaccaio[];
}) {
  /* =========================
     STATO FILTRI
  ========================= */
  const [filters, setFilters] = useState<Filters>({
    search: "",
    comune: "",
  });

  /* =========================
     LISTA FILTRATA
  ========================= */
  const filteredTabaccai = useMemo(() => {
    return tabaccai.filter((t) => {
      const haystack = `
        ${t.ragione_sociale ?? ""}
        ${t.comune ?? ""}
        ${t.indirizzo ?? ""}
      `.toLowerCase();

      if (
        filters.search &&
        !haystack.includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.comune && t.comune !== filters.comune) {
        return false;
      }

      return true;
    });
  }, [tabaccai, filters]);

  /* =========================
     COMUNI (per select)
  ========================= */
  const comuni = useMemo(() => {
    return Array.from(
      new Set(
        tabaccai
          .map((t) => t.comune)
          .filter((c): c is string => Boolean(c))
      )
    ).sort();
  }, [tabaccai]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Tabaccai</h1>
        <p className="text-sm text-gray-500">
          Lista operativa tabaccai
        </p>
      </div>

      {/* FILTRI */}
      <TabaccaiFilters
        filters={filters}
        onChange={setFilters}
        comuni={comuni}
      />

      {/* LISTA */}
      <TabaccaiList tabaccai={filteredTabaccai} />
    </div>
  );
}
