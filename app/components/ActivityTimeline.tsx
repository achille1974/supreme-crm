"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

type Activity = {
id: number;
tabaccaio_id: number;
tipo: string;
titolo: string;
descrizione: string | null;
data_attivita: string;
prossima_azione: string | null;
prossima_azione_descrizione: string | null;
};

export default function ActivityTimeline({ tabaccaioId }: { tabaccaioId: number }) {
const [attivita, setAttivita] = useState<Activity[]>([]);
const [loading, setLoading] = useState(true);

const [tipo, setTipo] = useState("");
const [titolo, setTitolo] = useState("");
const [descrizione, setDescrizione] = useState("");

async function load() {
const { data } = await supabase
.from("attivita_tabaccai")
.select("*")
.eq("tabaccaio_id", tabaccaioId)
.order("data_attivita", { ascending: false });

setAttivita(data || []);
setLoading(false);
}

useEffect(() => {
load();
}, []);

async function aggiungiAttivita() {
if (!tipo || !titolo) return alert("Compila almeno tipo e titolo");

const { error } = await supabase.from("attivita_tabaccai").insert({
tabaccaio_id: tabaccaioId,
tipo,
titolo,
descrizione,
});

if (error) alert("Errore salvataggio!");
else {
setTipo("");
setTitolo("");
setDescrizione("");
load();
}
}

return (
<section className="border rounded p-3 bg-white space-y-4">
<h2 className="font-semibold text-lg">Cronologia attività</h2>

{/* FORM AGGIUNTA */}
<div className="space-y-2">
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
<select
className="border rounded px-2 py-1"
value={tipo}
onChange={(e) => setTipo(e.target.value)}
>
<option value="">Tipo attività</option>
<option value="Telefonata">Telefonata</option>
<option value="Visita">Visita in negozio</option>
<option value="WhatsApp">WhatsApp</option>
<option value="Email">Email</option>
<option value="Ordine">Ordine</option>
<option value="Follow-up">Follow-up</option>
<option value="Nota">Nota interna</option>
</select>

<input
className="border rounded px-2 py-1"
placeholder="Titolo attività"
value={titolo}
onChange={(e) => setTitolo(e.target.value)}
/>

<button
onClick={aggiungiAttivita}
className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
>
Aggiungi
</button>
</div>

<textarea
className="border rounded px-2 py-1 w-full text-sm"
placeholder="Descrizione (opzionale)"
value={descrizione}
onChange={(e) => setDescrizione(e.target.value)}
/>
</div>

{/* TIMELINE */}
{loading ? (
<p>Caricamento attività…</p>
) : attivita.length === 0 ? (
<p className="text-gray-500">Nessuna attività registrata.</p>
) : (
<div className="space-y-3">
{attivita.map((a) => (
<div key={a.id} className="border rounded p-2 bg-gray-50">
<p className="text-xs text-gray-500">
{new Date(a.data_attivita).toLocaleString()}
</p>
<p className="font-semibold">
{a.tipo} — {a.titolo}
</p>
{a.descrizione && (
<p className="text-sm mt-1">{a.descrizione}</p>
)}
</div>
))}
</div>
)}
</section>
);
}