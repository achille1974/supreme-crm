// lib/data/tabaccai.ts

import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * 🔐 SWITCH CENTRALE
 * false = MOCK (sviluppo sicuro)
 * true  = SUPABASE (produzione)
 *
 * ⚠️ NON cambiare senza motivo
 */
const USE_DB = false;

/**
 * 🎯 TIPO ALLINEATO AL DATABASE SUPABASE
 * (usa ESATTAMENTE i nomi delle colonne)
 */
export type Tabaccaio = {
  id: number;
  ragione_sociale: string;
  indirizzo: string | null;
  telefono: string | null;
  email: string | null;
};

/**
 * 🧪 MOCK DATI (stabili, affidabili)
 * Usati finché USE_DB = false
 */
const TABACCAI_MOCK: Tabaccaio[] = [
  {
    id: 218,
    ragione_sociale: "Tabaccheria Beltrami",
    indirizzo: "Floridia",
    telefono: "0931 123456",
    email: "info@tabaccaiobeltrami.it",
  },
  {
    id: 300,
    ragione_sociale: "Tabaccheria Centrale",
    indirizzo: "Siracusa",
    telefono: "0931 654321",
    email: "centrale@tabacchi.it",
  },
];

/**
 * 🔎 OTTIENI UN TABACCAIO PER ID
 * (usata dalla pagina /tabaccai/[id])
 */
export async function getTabaccaioById(
  id: number
): Promise<Tabaccaio | null> {
  // ▶ MOCK
  if (!USE_DB) {
    return TABACCAI_MOCK.find((t) => t.id === id) ?? null;
  }

  // ▶ SUPABASE
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tabaccai")
    .select("id, ragione_sociale, indirizzo, telefono, email")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return data;
}

/**
 * 📋 OTTIENI TUTTI I TABACCAI
 * (usata dalla pagina /tabaccai)
 */
export async function getAllTabaccai(): Promise<Tabaccaio[]> {
  // ▶ MOCK
  if (!USE_DB) {
    return TABACCAI_MOCK;
  }

  // ▶ SUPABASE
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tabaccai")
    .select("id, ragione_sociale, indirizzo, telefono, email")
    .order("ragione_sociale");

  if (error || !data) return [];

  return data;
}