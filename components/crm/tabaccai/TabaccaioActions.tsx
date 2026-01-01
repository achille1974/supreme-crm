import { openWhatsApp } from "@/lib/whatsapp";

type TabaccaioActionsProps = {
  onSave: () => void;
  saving?: boolean;
  onBack: () => void;
  cellulare?: string;
};

export default function TabaccaioActions({
  onSave,
  saving,
  onBack,
  cellulare,
}: TabaccaioActionsProps) {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {/* SALVA */}
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Salvataggio…" : "Salva dati CRM"}
      </button>

      {/* TORNA */}
      <button
        type="button"
        onClick={onBack}
        className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold"
      >
        ← Torna alla lista
      </button>

      {/* WHATSAPP */}
      <button
        type="button"
        onClick={() => openWhatsApp(cellulare)}
        className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
      >
        💬 WhatsApp
      </button>
    </div>
  );
}
