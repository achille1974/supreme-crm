"use client";

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Tabaccaio = {
  id?: number | null;

  ragione_sociale?: string | null;
  comune?: string | null;
  indirizzo?: string | null;

  telefono?: string | null;
  cellulare?: string | null;

  priorita?: "alta" | "media" | "bassa" | string | null;
  stato_consenso?: "completo" | "parziale" | "negato" | string | null;

  prossima_azione?: string | null;
  data_prossima_azione?: string | null;

  attivo?: boolean | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TabaccaioRow({
  tabaccaio,
  onReload,
}: {
  tabaccaio: Tabaccaio;
  onReload?: () => void; // ✅ OPZIONALE (FIX DEFINITIVO)
}) {
  const id = tabaccaio.id;
  if (!id) return null;

  /* =========================
     TELEFONO
  ========================= */
  const phoneRaw = tabaccaio.cellulare || tabaccaio.telefono;
  const phone = phoneRaw ? phoneRaw.replace(/[^\d]/g, "") : null;

  /* =========================
     DATE
  ========================= */
  const today = new Date().toISOString().slice(0, 10);

  const isOggi = tabaccaio.data_prossima_azione === today;
  const isScaduto =
    !!tabaccaio.data_prossima_azione &&
    tabaccaio.data_prossima_azione < today;

  /* =========================
     BADGE PRIORITÀ
  ========================= */
  const badgePriorita = () => {
    if (tabaccaio.priorita === "alta")
      return "bg-red-100 text-red-700";
    if (tabaccaio.priorita === "media")
      return "bg-yellow-100 text-yellow-700";
    return "bg-slate-100 text-slate-600";
  };

  /* =========================
     BADGE CONSENSO
  ========================= */
  const badgePrivacy = () => {
    if (tabaccaio.stato_consenso === "completo")
      return "bg-green-100 text-green-700";
    if (tabaccaio.stato_consenso === "parziale")
      return "bg-yellow-100 text-yellow-700";
    if (tabaccaio.stato_consenso === "negato")
      return "bg-red-100 text-red-700";
    return "bg-slate-100 text-slate-500";
  };

  /* =========================
     DISATTIVA
  ========================= */
  const handleDisattiva = async () => {
    await supabase
      .from("tabaccai_master")
      .update({ attivo: false })
      .eq("id", id);

    onReload?.(); // ✅ SAFE CALL
  };

  return (
    <div
      className={`
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between
        p-4
        border rounded
        ${tabaccaio.attivo === false ? "opacity-40" : ""}
      `}
    >
      {/* DATI */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-xs font-semibold uppercase text-slate-400">
            {tabaccaio.comune || "—"}
          </div>

          {tabaccaio.priorita && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgePriorita()}`}
            >
              {tabaccaio.priorita}
            </span>
          )}

          {tabaccaio.stato_consenso && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgePrivacy()}`}
            >
              privacy
            </span>
          )}

          {tabaccaio.attivo === false && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              Disattivato
            </span>
          )}
        </div>

        <div className="text-base font-bold text-slate-900">
          {tabaccaio.ragione_sociale || "Senza nome"}
        </div>

        <div className="text-sm text-slate-600">
          {tabaccaio.indirizzo || "Indirizzo non disponibile"}
        </div>

        <div className="text-sm">
          {tabaccaio.prossima_azione ? (
            <span
              className={
                isScaduto
                  ? "text-red-600 font-semibold"
                  : isOggi
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600"
              }
            >
              {tabaccaio.prossima_azione}
              {tabaccaio.data_prossima_azione
                ? ` • ${tabaccaio.data_prossima_azione}`
                : ""}
            </span>
          ) : (
            <span className="italic text-slate-400">
              Nessuna azione pianificata
            </span>
          )}
        </div>
      </div>

      {/* AZIONI */}
      <div className="flex items-center gap-2">
        {phone ? (
          <a
            href={`tel:${phone}`}
            title="Chiama"
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            📞
          </a>
        ) : (
          <div className="h-10 w-10 flex items-center justify-center opacity-30">
            📞
          </div>
        )}

        {phone ? (
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            💬
          </a>
        ) : (
          <div className="h-10 w-10 flex items-center justify-center opacity-30">
            💬
          </div>
        )}

        <Link
          href={`/tabaccai/${id}`}
          title="Apri scheda CRM"
          className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          📇
        </Link>

        {tabaccaio.attivo !== false && (
          <button
            onClick={handleDisattiva}
            title="Disattiva"
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200"
          >
            ⛔
          </button>
        )}
      </div>
    </div>
  );
}
