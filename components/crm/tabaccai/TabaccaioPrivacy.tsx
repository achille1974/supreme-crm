"use client";

type TabaccaioPrivacyProps = {
  consenso_stato?: string | null;
  consenso_whatsapp?: boolean | null;
  consenso_email?: boolean | null;
  consenso_telefono?: boolean | null;
  consenso_nota?: string | null;
  onChange: (v: Partial<any>) => void;
};

export default function TabaccaioPrivacy({
  consenso_stato,
  consenso_whatsapp,
  consenso_email,
  consenso_telefono,
  consenso_nota,
  onChange,
}: TabaccaioPrivacyProps) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-800">
        Privacy & Consensi
      </h3>

      <div>
        <label className="block text-sm font-medium mb-1">
          Stato consenso
        </label>
        <select
          value={consenso_stato ?? "mai_chiesto"}
          onChange={(e) =>
            onChange({ stato_consenso: e.target.value })
          }
          className="w-full border rounded-lg p-2"
        >
          <option value="mai_chiesto">Mai chiesto</option>
          <option value="da_richiedere">Da richiedere</option>
          <option value="verbale">Verbale</option>
          <option value="messaggio">Messaggio</option>
          <option value="negato">Negato</option>
          <option value="non_contattare">Non contattare</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={consenso_whatsapp === true}
            onChange={(e) =>
              onChange({ consenso_whatsapp: e.target.checked })
            }
          />
          WhatsApp
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={consenso_email === true}
            onChange={(e) =>
              onChange({ consenso_email: e.target.checked })
            }
          />
          Email
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={consenso_telefono === true}
            onChange={(e) =>
              onChange({ consenso_telefono: e.target.checked })
            }
          />
          Telefonata
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Nota consenso
        </label>
        <textarea
          value={consenso_nota ?? ""}
          onChange={(e) =>
            onChange({ consenso_nota: e.target.value })
          }
          className="w-full border rounded-lg p-2"
          rows={3}
        />
      </div>
    </div>
  );
}
