"use client";

export default function DashboardFiltri({
  totale,
}: {
  totale: number;
}) {
  return (
    <div
      style={{
        padding: "16px",
        marginBottom: "16px",
        border: "1px dashed #ccc",
        borderRadius: "8px",
      }}
    >
      <strong>Dashboard Filtri Tabaccai</strong>

      {/* ✅ BOX TOTALE TABACCAI — CLICCABILE */}
      <a
        href="/tabaccai"
        style={{
          marginTop: "12px",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          display: "inline-block",
          minWidth: "180px",
          textAlign: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div style={{ fontSize: "12px", color: "#666" }}>
          Totale tabaccai
        </div>

        <div style={{ fontSize: "28px", fontWeight: "bold" }}>
          {totale}
        </div>
      </a>

      {/* ✅ PULSANTE BIGLIETTO (SEPARATO) */}
      <div>
        <a
          href="/v/achille"
          style={{
            display: "inline-block",
            marginTop: "8px",
            padding: "6px 10px",
            fontSize: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            textDecoration: "none",
            color: "#000",
          }}
        >
          Vai al Biglietto
        </a>
      </div>
    </div>
  );
}
