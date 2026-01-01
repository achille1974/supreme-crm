"use client";

type TabaccaioNoteProps = {
  note?: string | null;
  onChange: (v: string) => void;
};

export default function TabaccaioNote({
  note,
  onChange,
}: TabaccaioNoteProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      {/* =========================
          TITOLO
      ========================= */}
      <div>
        <h3 className="font-semibold text-slate-800">
          Note strategiche
        </h3>
        <p className="text-xs text-slate-500">
          Informazioni interne utili per la trattativa
        </p>
      </div>

      {/* =========================
          AREA NOTE
      ========================= */}
      <textarea
        value={note ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Scrivi qui ciò che conta davvero:
• carattere del titolare
• obiezioni emerse
• prodotti di interesse
• accordi verbali
• dettagli personali utili`}
        className="
          w-full
          min-h-[160px]
          resize-y
          border border-slate-300
          rounded-xl
          px-3 py-3
          text-sm
          leading-relaxed
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {/* =========================
          HINT
      ========================= */}
      <div className="text-xs text-slate-500 italic">
        💡 Queste note sono **solo per uso interno** e non vengono
        mostrate al cliente.
      </div>
    </div>
  );
}
