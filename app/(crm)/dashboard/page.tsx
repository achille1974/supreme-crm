import { createServerSupabaseClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/crm/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  const count = async (field: string, value: string) =>
    supabase
      .from("tabaccai_master")
      .select("id", { count: "exact", head: true })
      .eq(field, value)
      .then((r) => r.count ?? 0);

  const totale =
    (await supabase
      .from("tabaccai_master")
      .select("id", { count: "exact", head: true })
      .then((r) => r.count)) ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-slate-50">
      <DashboardClient
        totale={totale}
        consensoSi={await count("stato_consenso", "autorizzato")}
        consensoNo={await count("stato_consenso", "negato")}

        stato={{
          mai: await count("stato_supreme", "mai_contattato"),
          contattato: await count("stato_supreme", "contattato"),
          interessato: await count("stato_supreme", "interessato"),
          cliente: await count("stato_supreme", "cliente"),
          perso: await count("stato_supreme", "perso"),
        }}
        interesse={{
          alto: await count("interesse_supreme", "alto"),
          medio: await count("interesse_supreme", "medio"),
          basso: await count("interesse_supreme", "basso"),
        }}
        priorita={{
          alta: await count("priorita", "alta"),
          media: await count("priorita", "media"),
          bassa: await count("priorita", "bassa"),
        }}
        categoria={{
          potenziale: await count("categoria_cliente", "potenziale"),
          attivo: await count("categoria_cliente", "attivo"),
          fermo: await count("categoria_cliente", "fermo"),
          perso: await count("categoria_cliente", "perso"),
        }}
      />
    </div>
  );
}
