"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function TaskModal({ open, onClose, tabaccaioId, onCreated }) {
const [titolo, setTitolo] = useState("");
const [descrizione, setDescrizione] = useState("");
const [scadenza, setScadenza] = useState("");
const [salvando, setSalvando] = useState(false);

if (!open) return null;

async function creaTask() {
if (!titolo.trim()) return alert("Inserisci un titolo");

setSalvando(true);

const { error } = await supabase.from("tasks").insert({
tabaccaio_id: tabaccaioId,
titolo,
descrizione,
data_scadenza: scadenza || null,
stato: "da_fare",
tipo: "Generico",
completato: false,
});

setSalvando(false);

if (error) {
console.error(error);
alert("Errore nel salvataggio del task");
} else {
onCreated(); // aggiorna lista
onClose(); // chiudi modale
setTitolo("");
setDescrizione("");
setScadenza("");
}
}

return (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
<div className="bg-white p-4 rounded shadow-xl w-96 space-y-3">

<h2 className="font-bold text-lg">Nuovo Task</h2>

<div>
<label className="text-sm">Titolo</label>
<input
className="w-full border rounded px-2 py-1"
value={titolo}
onChange={(e) => setTitolo(e.target.value)}
/>
</div>

<div>
<label className="text-sm">Descrizione</label>
<textarea
className="w-full border rounded px-2 py-1"
value={descrizione}
onChange={(e) => setDescrizione(e.target.value)}
/>
</div>

<div>
<label className="text-sm">Scadenza</label>
<input
type="date"
className="w-full border rounded px-2 py-1"
value={scadenza}
onChange={(e) => setScadenza(e.target.value)}
/>
</div>

<div className="flex justify-end gap-2">
<button className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>
Annulla
</button>

<button
className="px-3 py-1 bg-blue-600 text-white rounded"
onClick={creaTask}
disabled={salvando}
>
{salvando ? "Salvo..." : "Salva task"}
</button>
</div>

</div>
</div>
);
}