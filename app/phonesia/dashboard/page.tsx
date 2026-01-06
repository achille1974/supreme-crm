import { createClient } from "@supabase/supabase-js";
import DashboardClient from "./DashboardClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function DashboardPHONESIA() {
  /* =========================
     OVERVIEW – KPI PRINCIPALI
  ========================= */
  const [
    clientiTotali,
    clientiOggi,
    azioniAttive,
    clientiSenzaContatto,
    scadenze7gg,
    messaggiOggi,
  ] = await Promise.all([
    supabase.from("acq_clienti").select("*", { count: "exact", head: true }),

    supabase
      .from("acq_clienti")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date().toISOString().slice(0, 10)),

    supabase
      .from("acq_azioni")
      .select("*", { count: "exact", head: true })
      .eq("stato", "attiva"),

    supabase
      .from("acq_clienti")
      .select("*", { count: "exact", head: true })
      .not(
        "id",
        "in",
        supabase.from("acq_log_messaggi").select("cliente_id")
      ),

    supabase
      .from("acq_scadenze")
      .select("*", { count: "exact", head: true })
      .gte("data_scadenza", new Date().toISOString().slice(0, 10))
      .lte(
        "data_scadenza",
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      ),

    supabase
      .from("acq_log_messaggi")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date().toISOString().slice(0, 10)),
  ]);

  const overview = [
    { label: "Clienti totali", value: clientiTotali.count ?? 0 },
    { label: "Nuovi oggi", value: clientiOggi.count ?? 0 },
    { label: "Azioni attive", value: azioniAttive.count ?? 0 },
    { label: "Clienti mai contattati", value: clientiSenzaContatto.count ?? 0 },
    { label: "Scadenze 7 giorni", value: scadenze7gg.count ?? 0 },
    { label: "Messaggi inviati oggi", value: messaggiOggi.count ?? 0 },
  ];

  /* =========================
     OGGI – CLIENTI PRIORITARI
  ========================= */
  const { data: oggiRaw } = await supabase
    .from("acq_clienti")
    .select("id, nome, cognome, telefono")
    .not(
      "id",
      "in",
      supabase.from("acq_log_messaggi").select("cliente_id")
    )
    .order("created_at", { ascending: true })
    .limit(10);

  const oggi = oggiRaw ?? [];

  /* =========================
     AZIONI – LISTA DECISIONALE
  ========================= */
  const { data: azioniRaw } = await supabase
    .from("acq_azioni")
    .select("id, titolo, canale, pubblico, stato, created_at")
    .order("created_at", { ascending: false });

  const azioni = azioniRaw ?? [];

  /* =========================
     RENDER
  ========================= */
  return (
    <DashboardClient
      overview={overview}
      oggi={oggi}
      azioni={azioni}
    />
  );
}
