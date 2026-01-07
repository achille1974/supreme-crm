import { createServerSupabaseClient } from "@/lib/supabase/server";
import DashboardFiltri from "@/components/crm/tabaccai/DashboardFiltri";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  const { count } = await supabase
    .from("tabaccai_master")
    .select("id", { count: "exact", head: true });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">
        Dashboard Tabaccai
      </h1>

      <DashboardFiltri totale={count ?? 0} />
    </div>
  );
}
