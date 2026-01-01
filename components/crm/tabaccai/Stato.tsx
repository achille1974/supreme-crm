"use client";

type TabaccaioStatoProps = {
  stato_supreme?: string | null;
  interesse_supreme?: string | null;
  priorita?: string | null;

  prossima_azione?: string | null;
  data_prossima_azione?: string | null;
  nota_prossima_azione?: string | null;

  onChange: (v: Partial<any>) => void;
};

export default function TabaccaioStato({
  stato_supreme,
  interesse_supreme,
  priorita,
  prossima_azione,
  data_prossima_azione,
  nota_prossima_azione,
  onChange,
}: TabaccaioStatoProps) {
  const today = new Date().toISOString().slice(0, 10);

  const isOggi = data_prossima_azione === today;
  const isScaduto =
    data_prossima_azione && data_prossima_azione < today;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="font-semibold text-slate-800">
          Stato commerciale & Agenda
        </h3>
        <p className="text-xs text-slate-500">
          Qui decidi cosa fare e quando
        </p>
      </div>

      {/* STATO / INTERESSE / PRIORITÀ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Stato
          </label>
          <select
            value={stato_supreme ?? ""}
            onChange={(e) =>
              onChange({ stato_supreme: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          >
            <option value="">—</option>
            <option value="mai_contattato">Mai contattato</option>
            <option value="contattato">Contattato</option>
            <option value="trattativa">In trattativa</option>
            <option value="cliente">Cliente</option>
            <option value="perso">Perso</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Interesse
          </label>
          <select
            value={interesse_supreme ?? ""}
            onChange={(e) =>
              onChange({ interesse_supreme: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          >
            <option value="">—</option>
            <option value="basso">Basso</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Priorità
          </label>
          <select
            value={priorita ?? "media"}
            onChange={(e) =>
              onChange({ priorita: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          >
            <option value="bassa">Bassa</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      {/* AGENDA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Prossima azione
          </label>
          <input
            type="text"
            value={prossima_azione ?? ""}
            onChange={(e) =>
              onChange({ prossima_azione: e.target.value })
            }
            className="w-full border rounded-lg p-2"
            placeholder="Es. Richiamare, inviare biglietto"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Data
          </label>
          <input
            type="date"
            value={data_prossima_azione ?? ""}
            onChange={(e) =>
              onChange({
                data_prossima_azione: e.target.value || null,
              })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Nota azione
        </label>
        <textarea
          value={nota_prossima_azione ?? ""}
          onChange={(e) =>
            onChange({
              nota_prossima_azione: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2 min-h-[80px]"
        />
      </div>

      {isScaduto && (
        <div className="text-sm text-red-700 bg-red-50 border rounded-lg p-3">
          ⏰ Follow-up scaduto
        </div>
      )}

      {isOggi && (
        <div className="text-sm text-blue-700 bg-blue-50 border rounded-lg p-3">
          🔥 Azione prevista per oggi
        </div>
      )}
    </div>
  );
}
