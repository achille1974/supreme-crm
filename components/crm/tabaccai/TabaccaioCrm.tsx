type TabaccaioCrmProps = {
  stato?: string | null;
  interesse?: string | null;
  note?: string | null;
  onChange: (patch: {
    stato?: string;
    interesse?: string;
    note?: string;
  }) => void;
};

export default function TabaccaioCrm({
  stato,
  interesse,
  note,
  onChange,
}: TabaccaioCrmProps) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-800">Stato CRM</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm">
          <span className="text-slate-600">Stato contatto</span>
          <select
            value={stato || ""}
            onChange={(e) => onChange({ stato: e.target.value })}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          >
            <option value="">—</option>
            <option>Mai contattato</option>
            <option>Contattato</option>
            <option>Interessato</option>
            <option>Cliente</option>
            <option>Perso</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="text-slate-600">Livello interesse</span>
          <select
            value={interesse || ""}
            onChange={(e) => onChange({ interesse: e.target.value })}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          >
            <option value="">—</option>
            <option>Basso</option>
            <option>Medio</option>
            <option>Alto</option>
          </select>
        </label>
      </div>

      <label className="text-sm block">
        <span className="text-slate-600">Note interne</span>
        <textarea
          value={note || ""}
          onChange={(e) => onChange({ note: e.target.value })}
          rows={4}
          className="mt-1 w-full border rounded-lg px-3 py-2"
          placeholder="Annotazioni commerciali, richieste, follow-up…"
        />
      </label>
    </div>
  );
}
