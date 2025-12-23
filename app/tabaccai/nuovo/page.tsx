"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

// Opzioni menu a tendina
const STATO_OPZIONI = [
"",
"Primo contatto",
"In valutazione",
"In trattativa",
"Cliente attivo",
"Cliente perso",
];

const INTERESSE_OPZIONI = ["", "Basso", "Medio", "Alto", "Non interessato"];

export default function NuovoTabaccaioPage() {
const router = useRouter();

const [form, setForm] = useState({
ragione_sociale: "",
comune: "",
indirizzo: "",
telefono_fisso: "",
cellulare: "",
whatsapp_numero: "",
stato_relazione_supreme: "",
interesse_supreme: "",
punteggio_potenziale: "",
tratta_ecig: false,
tratta_liquidi: false,
});

const [saving, setSaving] = useState(false);
const [errore, setErrore] = useState<string | null>(null);

function handleChange(key: string, value: any) {
setForm((prev) => ({ ...prev, [key]: value }));
}

async function handleSubmit(e: React.FormEvent) {
e.preventDefault();
setSaving(true);
setErrore(null);

// Costruzione payload coerente con Supabase
const payload = {
ragione_sociale: form.ragione_sociale || null,
comune: form.comune || null,
indirizzo: form.indirizzo || null,
telefono_fisso: form.telefono_fisso || null,
cellulare: form.cellulare || null,
whatsapp_numero: form.whatsapp_numero || null,
stato_relazione_supreme:
form.stato_relazione_supreme || null,
interesse_supreme: form.interesse_supreme || null,
punteggio_potenziale:
form.punteggio_potenziale !== ""
? Number(form.punteggio_potenziale)
: null,
tratta_ecig: form.tratta_ecig,
tratta_liquidi: form.tratta_liquidi,
data_ultimo_contatto_supreme: null,
consenso_marketing: null,
consenso_canale: null,
consenso_data: null,
};

const { data, error } = await supabase
.from("tabaccai")
.insert(payload)
.select()
.single();

if (error) {
console.error(error);
setErrore("Errore nel salvataggio.");
setSaving(false);
return;
}

// Vai alla scheda tabaccaio appena creato
router.push(`/tabaccai/${data.id}`);
}

return (
<main className="space-y-4">
<div className="flex justify-between items-center">
<h1 className="text-xl font-bold">Nuovo tabaccaio</h1>
<Link href="/tabaccai" className="text-blue-600 underline text-sm">
← Torna alla lista
</Link>
</div>

<form
onSubmit={handleSubmit}
className="border rounded p-4 bg-white space-y-4"
>
<h2 className="font-semibold">Dati anagrafici e commerciali</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* RAGIONE SOCIALE */}
<div>
<label>Ragione sociale *</label>
<input
className="w-full border rounded px-2 py-1"
value={form.ragione_sociale}
onChange={(e) => handleChange("ragione_sociale", e.target.value)}
required
/>
</div>

{/* COMUNE */}
<div>
<label>Comune *</label>
<input
className="w-full border rounded px-2 py-1"
value={form.comune}
onChange={(e) => handleChange("comune", e.target.value)}
required
/>
</div>

{/* INDIRIZZO */}
<div>
<label>Indirizzo</label>
<input
className="w-full border rounded px-2 py-1"
value={form.indirizzo}
onChange={(e) => handleChange("indirizzo", e.target.value)}
/>
</div>

{/* TELEFONO */}
<div>
<label>Telefono fisso</label>
<input
className="w-full border rounded px-2 py-1"
value={form.telefono_fisso}
onChange={(e) => handleChange("telefono_fisso", e.target.value)}
/>
</div>

{/* CELLULARE */}
<div>
<label>Cellulare</label>
<input
className="w-full border rounded px-2 py-1"
value={form.cellulare}
onChange={(e) => handleChange("cellulare", e.target.value)}
/>
</div>

{/* WHATSAPP */}
<div>
<label>WhatsApp</label>
<input
className="w-full border rounded px-2 py-1"
value={form.whatsapp_numero}
onChange={(e) => handleChange("whatsapp_numero", e.target.value)}
/>
</div>

{/* STATO */}
<div>
<label>Stato relazione Suprem-e</label>
<select
className="w-full border rounded px-2 py-1"
value={form.stato_relazione_supreme}
onChange={(e) =>
handleChange("stato_relazione_supreme", e.target.value)
}
>
{STATO_OPZIONI.map((s) => (
<option key={s} value={s}>
{s || "—"}
</option>
))}
</select>
</div>

{/* INTERESSE */}
<div>
<label>Interesse Suprem-e</label>
<select
className="w-full border rounded px-2 py-1"
value={form.interesse_supreme}
onChange={(e) =>
handleChange("interesse_supreme", e.target.value)
}
>
{INTERESSE_OPZIONI.map((s) => (
<option key={s} value={s}>
{s || "—"}
</option>
))}
</select>
</div>

{/* PUNTEGGIO */}
<div>
<label>Punteggio potenziale (0–100)</label>
<input
type="number"
min={0}
max={100}
className="w-full border rounded px-2 py-1"
value={form.punteggio_potenziale}
onChange={(e) =>
handleChange("punteggio_potenziale", e.target.value)
}
/>
</div>

{/* TRATTA E-CIG */}
<div className="flex items-center gap-2 mt-6">
<input
type="checkbox"
checked={form.tratta_ecig}
onChange={(e) => handleChange("tratta_ecig", e.target.checked)}
/>
<label>Tratta e-cig</label>
</div>

{/* TRATTA LIQUIDI */}
<div className="flex items-center gap-2 mt-6">
<input
type="checkbox"
checked={form.tratta_liquidi}
onChange={(e) => handleChange("tratta_liquidi", e.target.checked)}
/>
<label>Tratta liquidi</label>
</div>
</div>

{/* BOTTONI */}
<div className="flex gap-2">
<button
type="submit"
className="px-4 py-2 bg-green-600 text-white rounded"
>
{saving ? "Salvataggio..." : "Crea tabaccaio"}
</button>

<Link
href="/tabaccai"
className="px-4 py-2 bg-gray-300 rounded text-sm"
>
Annulla
</Link>
</div>

{errore && <p className="text-red-600 text-sm">{errore}</p>}
</form>
</main>
);
}