"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function TaskList({ tabaccaioId }) {
const [tasks, setTasks] = useState([]);

async function load() {
const { data } = await supabase
.from("tasks")
.select("*")
.eq("tabaccaio_id", tabaccaioId)
.order("data_scadenza", { ascending: true });

setTasks(data || []);
}

async function completaTask(id) {
await supabase
.from("tasks")
.update({ completato: true, stato: "completato" })
.eq("id", id);

load();
}

useEffect(() => {
load();
}, []);

return (
<div className="space-y-2 mt-2">
{tasks.length === 0 && (
<p className="text-sm text-gray-500">Nessun task per questo tabaccaio.</p>
)}

{tasks.map((t) => (
<div
key={t.id}
className={`border p-2 rounded ${
t.completato ? "bg-green-100" : "bg-white"
}`}
>
<div className="flex justify-between">
<div>
<strong>{t.titolo}</strong>
<p className="text-xs text-gray-600">{t.descrizione}</p>
{t.data_scadenza && (
<p className="text-xs mt-1">
📅 Scadenza: {new Date(t.data_scadenza).toLocaleDateString()}
</p>
)}
</div>

{!t.completato && (
<button
className="px-2 py-1 bg-green-600 text-white text-xs rounded"
onClick={() => completaTask(t.id)}
>
Completa
</button>
)}
</div>
</div>
))}
</div>
);
}