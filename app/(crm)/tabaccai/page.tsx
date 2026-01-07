import { createServerSupabaseClient } from "@/lib/supabase/server";
import TabaccaiClient from "@/components/crm/tabaccai/TabaccaiClient";
import DashboardFiltri from "@/components/crm/tabaccai/DashboardFiltri";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ f?: string }>;
};

export default async function TabaccaiPage({ searchParams }: PageProps) {
  const supabase = createServerSupabaseClient();
  const params = await searchParams;
  const filtro = params?.f ?? null;

  const today = new Date().toISOString().slice(0, 10);

  // ✅ ORA LEGGIAMO LA TABELLA GIUSTA
  const { data } = await supabase
    .from("tabaccai_master")
    .select("*")
    .order("comune", { ascending: true });

  let tabaccai = data ?? [];

  // 🔎 I filtri restano invariati (se un campo non esiste, non rompe nulla)
  if (filtro === "alta") {
    tabaccai = tabaccai.filter((t) => t.priorita === "alta");
  }

  if (filtro === "oggi") {
    tabaccai = tabaccai.filter(
      (t) => t.data_prossima_azione === today
    );
  }

  if (filtro === "scaduti") {
    tabaccai = tabaccai.filter(
      (t) =>
        t.data_prossima_azione &&
        t.data_prossima_azione < today
    );
  }

  if (filtro === "mai") {
    tabaccai = tabaccai.filter(
      (t) => !t.stato_supreme || t.stato_supreme === "mai_contattato"
    );
  }

  if (filtro === "privacy") {
    tabaccai = tabaccai.filter(
      (t) => !t.stato_consenso || t.stato_consenso === "mai_chiesto"
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* ✅ STEP 3 — contatore totale (read-only, sicuro) */}
      <DashboardFiltri totale={tabaccai.length} />

      {/* ✅ TABELLA ESISTENTE — NON TOCCATA */}
      <TabaccaiClient tabaccai={tabaccai} />
    </div>
  );
}
