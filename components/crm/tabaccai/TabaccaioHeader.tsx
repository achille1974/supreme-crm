"use client";

type TabaccaioHeaderProps = {
  id: number;
  ragione_sociale?: string | null;
  titolare?: string | null;
  comune?: string | null;
  indirizzo?: string | null;
  provincia?: string | null;
  cap?: string | null;
  numero_rivendita?: number | null;
  onChange?: (v: Partial<any>) => void;
};

export default function TabaccaioHeader({
  id,
  ragione_sociale,
  titolare,
  comune,
  indirizzo,
  provincia,
  cap,
  numero_rivendita,
  onChange,
}: TabaccaioHeaderProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* =========================
          HEADER VISIVO
      ========================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-400">
            Scheda tabaccaio
          </div>
          <div className="text-2xl font-extrabold text-slate-900 leading-tight">
            {ragione_sociale || "Nuovo tabaccaio"}
          </div>
          <div className="text-sm text-slate-500">
            ID CRM: {id}
            {comune && provincia && (
              <>
                {" "}• {comune} ({provincia})
              </>
            )}
          </div>
        </div>

        {/* BADGE */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Anagrafica
          </span>
        </div>
      </div>

      {/* =========================
          FORM ANAGRAFICA
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* RAGIONE SOCIALE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ragione sociale
          </label>
          <input
            type="text"
            value={ragione_sociale ?? ""}
            onChange={(e) =>
              onChange?.({ ragione_sociale: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* TITOLARE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome titolare
          </label>
          <input
            type="text"
            value={titolare ?? ""}
            onChange={(e) =>
              onChange?.({ titolare: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* COMUNE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Comune
          </label>
          <input
            type="text"
            value={comune ?? ""}
            onChange={(e) =>
              onChange?.({ comune: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* PROVINCIA */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Provincia
          </label>
          <input
            type="text"
            value={provincia ?? ""}
            onChange={(e) =>
              onChange?.({ provincia: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="SR / RG"
          />
        </div>

        {/* INDIRIZZO */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Indirizzo
          </label>
          <input
            type="text"
            value={indirizzo ?? ""}
            onChange={(e) =>
              onChange?.({ indirizzo: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* CAP */}
        <div>
          <label className="block text-sm font-medium mb-1">
            CAP
          </label>
          <input
            type="text"
            value={cap ?? ""}
            onChange={(e) =>
              onChange?.({ cap: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* NUMERO RIVENDITA */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Numero rivendita (Monopoli)
          </label>
          <input
            type="number"
            value={numero_rivendita ?? ""}
            onChange={(e) =>
              onChange?.({
                numero_rivendita: e.target.value
                  ? Number(e.target.value)
                  : null,
              })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Es. 12"
          />
        </div>
      </div>
    </div>
  );
}
