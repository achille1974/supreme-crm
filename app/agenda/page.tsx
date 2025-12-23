"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import TaskModal from "../components/TaskModal";
import TaskList from "../components/TaskList";

export default function AgendaPage() {
const [tasks, setTasks] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

const [modalOpen, setModalOpen] = useState(false);

// Carica tutti i task
useEffect(() => {
async function load() {
setLoading(true);
const { data } = await supabase
.from("tasks")
.select("*")
.order("data_scadenza", { ascending: true });

setTasks(data || []);
setLoading(false);
}

load();
}, []);

const salvaTask = async (taskData: any) => {
const { data, error } = await supabase
.from("tasks")
.insert(taskData)
.select()
.single();

if (!error && data) {
setTasks((prev) => [...prev, data]);
}
};

return (
<main className="p-4 space-y-4">
<div className="flex justify-between items-center">
<h1 className="text-xl font-bold">Agenda & Task Management</h1>
<button
onClick={() => setModalOpen(true)}
className="px-3 py-2 bg-purple-600 text-white rounded"
>
+ Nuovo Promemoria
</button>
</div>

{loading ? (
<p>Caricamento task…</p>
) : (
<TaskList tasks={tasks} />
)}

<TaskModal
open={modalOpen}
onClose={() => setModalOpen(false)}
onSave={salvaTask}
/>
</main>
);
}