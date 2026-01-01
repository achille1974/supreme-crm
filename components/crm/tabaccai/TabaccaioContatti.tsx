import { openWhatsApp } from "@/lib/whatsapp";

type Props = {
  telefono?: string | null;
  cellulare?: string | null;
  email?: string | null;
  pec?: string | null;
  partita_iva?: string | null;
  codice_fiscale?: string | null;
  onChange: (v: Partial<any>) => void;
};

export default function TabaccaioContatti({
  telefono,
  cellulare,
  email,
  pec,
  partita_iva,
  codice_fiscale,
  onChange,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-800">Contatti</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TELEFONO */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Telefono fisso
          </label>
          <input
            type="text"
            value={telefono ?? ""}
            onChange={(e) =>
              onChange({ telefono: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* CELLULARE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Cellulare
          </label>
          <input
            type="text"
            value={cellulare ?? ""}
            onChange={(e) =>
              onChange({ cellulare: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email ?? ""}
            onChange={(e) =>
              onChange({ email: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* PEC */}
        <div>
          <label className="block text-sm font-medium mb-1">
            PEC
          </label>
          <input
            type="email"
            value={pec ?? ""}
            onChange={(e) =>
              onChange({ pec: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* PARTITA IVA */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Partita IVA
          </label>
          <input
            type="text"
            value={partita_iva ?? ""}
            onChange={(e) =>
              onChange({ partita_iva: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* CODICE FISCALE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Codice fiscale
          </label>
          <input
            type="text"
            value={codice_fiscale ?? ""}
            onChange={(e) =>
              onChange({ codice_fiscale: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* AZIONI */}
      <div className="flex flex-wrap gap-3 pt-2">
        {cellulare && (
          <button
            onClick={() => openWhatsApp(cellulare)}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            💬 WhatsApp
          </button>
        )}

        {telefono && (
          <a
            href={`tel:${telefono}`}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold"
          >
            📞 Chiama
          </a>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold"
          >
            ✉️ Email
          </a>
        )}
      </div>
    </div>
  );
}
