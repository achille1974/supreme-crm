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

      <div
        style={{
          marginTop: "12px",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          display: "inline-block",
          minWidth: "180px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "12px", color: "#666" }}>
          Totale tabaccai
        </div>
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>
          {totale}
        </div>
      </div>
    </div>
  );
}
