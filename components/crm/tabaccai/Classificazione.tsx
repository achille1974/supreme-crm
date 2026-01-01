type Props = {
  tipo_attivita?: string | null;
  dimensione_attivita?: string | null;
  zona_attivita?: string | null;
  afflusso_attivita?: string | null;

  potenziale_commerciale?: string | null;
  categoria_cliente?: string | null;
  marchi_trattati?: string | null;

  altro_1?: string | null;
  altro_2?: string | null;
  altro_3?: string | null;

  onChange: (v: Partial<any>) => void;
};

export default function Classificazione({
  tipo_attivita,
  dimensione_attivita,
  zona_attivita,
  afflusso_attivita,
  potenziale_commerciale,
  categoria_cliente,
  marchi_trattati,
  altro_1,
  altro_2,
  altro_3,
  onChange,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-6">
      <h3 className="font-semibold text-slate-800">
        Classificazione & Potenziale
      </h3>

      {/* CLASSIFICAZIONE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Tipo attività"
          value={tipo_attivita}
          options={[
            "Tabaccheria",
            "Bar-tabacchi",
            "Ricevitoria",
            "Altro",
          ]}
          onChange={(v) => onChange({ tipo_attivita: v })}
        />

        <Select
          label="Dimensione attività"
          value={dimensione_attivita}
          options={[
            "Piccola",
            "Media",
            "Grande",
            "Non so",
          ]}
          onChange={(v) => onChange({ dimensione_attivita: v })}
        />

        <Select
          label="Zona"
          value={zona_attivita}
          options={[
            "Centro",
            "Periferia",
            "Extraurbana",
          ]}
          onChange={(v) => onChange({ zona_attivita: v })}
        />

        <Select
          label="Afflusso"
          value={afflusso_attivita}
          options={[
            "Basso",
            "Medio",
            "Alto",
            "Variabile",
          ]}
          onChange={(v) => onChange({ afflusso_attivita: v })}
        />
      </div>

      {/* POTENZIALE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Potenziale commerciale"
          value={potenziale_commerciale}
          options={[
            "Basso",
            "Medio",
            "Alto",
          ]}
          onChange={(v) =>
            onChange({ potenziale_commerciale: v })
          }
        />

        <Select
          label="Categoria cliente"
          value={categoria_cliente}
          options={[
            "Potenziale",
            "Cliente attivo",
            "Cliente occasionale",
            "Ex cliente",
          ]}
          onChange={(v) =>
            onChange({ categoria_cliente: v })
          }
        />
      </div>

      {/* MARCHI */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Marchi trattati
        </label>
        <input
          type="text"
          value={marchi_trattati ?? ""}
          onChange={(e) =>
            onChange({ marchi_trattati: e.target.value })
          }
          className="w-full border rounded-lg p-2"
          placeholder="Es. IQOS, Glo, Vape..."
        />
      </div>

      {/* CAMPI APERTI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Altro 1"
          value={altro_1}
          onChange={(v) => onChange({ altro_1: v })}
        />
        <Input
          label="Altro 2"
          value={altro_2}
          onChange={(v) => onChange({ altro_2: v })}
        />
        <Input
          label="Altro 3"
          value={altro_3}
          onChange={(v) => onChange({ altro_3: v })}
        />
      </div>
    </div>
  );
}

/* ====== COMPONENTI BASE ====== */

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string | null;
  options: string[];
  onChange: (v: string | null) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value || null)
        }
        className="w-full border rounded-lg p-2"
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}
