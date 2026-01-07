import DashboardFiltri from "@/components/crm/tabaccai/DashboardFiltri";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">
        Dashboard Tabaccai
      </h1>

      <DashboardFiltri totale={0} />
    </div>
  );
}
