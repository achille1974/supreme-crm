import { createServerSupabaseClient } from "@/lib/supabase/server";
import TabaccaiClient from "@/components/crm/tabaccai/TabaccaiClient";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    // filtri legacy
    f?: "alta" | "oggi" | "scaduti" | "mai" | "privacy";

    // filtri dashboard
    consenso?: "si" | "no";
    stato?: "mai" | "contattato" | "interessato" | "cliente" | "perso";
    priorita?: "alta" | "media" | "bassa";
    interesse?: "alto" | "medio" | "basso";
    categoria?: "attivo" | "potenziale" | "fermo" | "perso";
  }>;
};

export default async function TabaccaiPage({ searchParams }: PageProps) {
  const supabase = createServerSupabaseClient();
  const params = await searchParams;

  const {
    f,
    consenso,
    stato,
    priorita,
    interesse,
    categoria,
  } = params ?? {};

  const today = new Date().toISOString().slice(0, 10);

  // =========================
  // QUERY BASE
  // =========================
  const { data } = await supabase
    .from("tabaccai_master")
    .select("*")
    .order("comune", { ascending: true });

  let tabaccai = data ?? [];

  // =========================
  // FILTRI LEGACY (INVARIATI)
  // =========================

  if (f === "alta") {
    tabaccai = tabaccai.filter((t) => t.priorita === "alta");
  }

  if (f === "oggi") {
    tabaccai = tabaccai.filter(
      (t) => t.data_prossima_azione === today
    );
  }

  if (f === "scaduti") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.data_prossima_azione &&
        t.data_prossima_azione < today
    );
  }

  if (f === "mai") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.stato_supreme === null ||
        t.stato_supreme === "mai_contattato"
    );
  }

  if (f === "privacy") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.stato_consenso === null ||
        t.stato_consenso === "mai_chiesto"
    );
  }

  // =========================
  // FILTRI DASHBOARD (ROBUSTI)
  // =========================

  // CONSENSO
  if (consenso === "si") {
    tabaccai = tabaccai.filter(
      (t) => t.stato_consenso === "consenso"
    );
  }

  if (consenso === "no") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.stato_consenso === null ||
        t.stato_consenso === "mai_chiesto"
    );
  }

  // STATO COMMERCIALE
  if (stato === "mai") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.stato_supreme === null ||
        t.stato_supreme === "mai_contattato"
    );
  }

  if (stato) {
    tabaccai = tabaccai.filter(
      (t) => t.stato_supreme === stato
    );
  }

  // PRIORITÀ (NULL = BASSA)
  if (priorita === "bassa") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.priorita === null ||
        t.priorita === "bassa"
    );
  }

  if (priorita === "media") {
    tabaccai = tabaccai.filter(
      (t) => t.priorita === "media"
    );
  }

  if (priorita === "alta") {
    tabaccai = tabaccai.filter(
      (t) => t.priorita === "alta"
    );
  }

  // INTERESSE (NULL = BASSO)
  if (interesse === "basso") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.interesse_supreme === null ||
        t.interesse_supreme === "basso"
    );
  }

  if (interesse === "medio") {
    tabaccai = tabaccai.filter(
      (t) => t.interesse_supreme === "medio"
    );
  }

  if (interesse === "alto") {
    tabaccai = tabaccai.filter(
      (t) => t.interesse_supreme === "alto"
    );
  }

  // CATEGORIA CLIENTE
  if (categoria) {
    tabaccai = tabaccai.filter(
      (t) => t.categoria_cliente === categoria
    );
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <TabaccaiClient tabaccai={tabaccai} />
    </div>
  );
}
