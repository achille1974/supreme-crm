"use client";

import { useMemo, useState } from "react";
import TabaccaiList from "./TabaccaiList";
import TabaccaiFilters from "./TabaccaiFilters";

type Tabaccaio = {
  id?: number | null; // ✅ FIX TS (accetta null dal DB)
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

export default function TabaccaiClient({
  tabaccai,
}: {
  tabaccai: Tabaccaio[];
}) {
  /* =========================
     FILTRI ATTIVI (SOLO QUESTI)
     - ricerca testo
     - comune
  ========================= */
  const [filters, setFilters] = useState({
    search: "",
    comune: "",
  });

  /* =========================
     FILTRAGGIO UNICO
  ========================= */
  const filtered = useMemo(() => {
    return tabaccai.filter((t) => {
      // ---- ricerca testo ----
      const text = `${t.ragione_sociale ?? ""} ${t.comune ?? ""} ${
        t.indirizzo ?? ""
      }`.toLowerCase();

      if (
        filters.search &&
        !text.includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // ---- filtro comune ----
      if (filters.comune && t.comune !== filters.comune) {
        return false;
      }

      return true;
    });
  }, [tabaccai, filters]);

  /* =========================
     COMUNI DISPONIBILI (FIX TS)
  ========================= */
  const comuni = useMemo(() => {
    return Array.from(
      new Set(
        tabaccai
          .map((t) => t.comune)
          .filter((c): c is string => Boolean(c))
      )
    );
  }, [tabaccai]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Tabaccai</h1>
        <p className="text-sm text-gray-500">Lista operativa</p>
      </div>

      {/* FILTRI */}
      <TabaccaiFilters
        filters={filters}
        onChange={setFilters}
        comuni={comuni}
      />

      {/* LISTA */}
      <TabaccaiList tabaccai={filtered} />
    </div>
  );
}
