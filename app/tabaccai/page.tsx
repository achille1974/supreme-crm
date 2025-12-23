"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

// ===== MODELLO DATI =====
type Tabaccaio = {
id: number;

ragione_sociale: string | null;
rivendita: string | null;
titolare: string | null;

comune: string | null;
indirizzo: string | null;

telefono_fisso: string | null;
cellulare: string | null;
whatsapp_numero: string | null;
email: string | null;
pec: string | null;
codice_aams: string | null;
partita_iva: string | null;

tratta_ecig: boolean | null;
tratta_liquidi: boolean | null;

stato_relazione_supreme: string | null;
interesse_supreme: string | null;

punteggio_potenziale: number | null;
data_ultimo_contatto_supreme: string | null;

consenso_marketing: boolean | null;
consenso_canale: string | null;
consenso_data: string | null;

tag_attivita: string[] | null;
};

// URL PRODUZIONE
const APP_BASE_URL = "https://app.crm-supreme.it";

// ===== COSTRUZIONE LINK WHATSAPP =====
function buildWA(number: string | null, message: string): string | null {
if (!number) return null;

let digits = number.replace(/\D/g, "");
if (!digits.startsWith("39")) digits = `39${digits}`;
if (digits.length < 10) return null;

return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function msgPrimoContatto(nome: string | null, comune: string | null) {
let msg = "Ciao, sono Achille Beltrami 👋\n";
msg += "Mi occupo dei prodotti Suprem-e dedicati ai tabaccai.\n\n";

if (nome) msg += `Riguardo la tabaccheria "${nome}"`;
if (comune) msg += ` di ${comune}`;

msg +=
", vorrei condividere con te alcune informazioni utili. Posso inviarti una proposta dedicata?";
return msg;
}

function msgBiglietto(id: number, nome: string | null) {
return (
`Ciao 👋\n` +
`Ecco il mio biglietto digitale dedicato alla tabaccheria "${nome || "—"}".\n\n` +
`${APP_BASE_URL}/biglietto-digitale?tabaccaio_id=${id}\n\n` +
`Trovi contatti, servizi e il modulo per autorizzare comunicazioni mirate.`
);
}

// =========================================================
// COMPONENTE PRINCIPALE LISTA TABACCAI
// =========================================================
export default function TabaccaiPage() {
const [tabaccai, setTabaccai] = useState<Tabaccaio[]>([]);
const [loading, setLoading] = useState(true);
const [errore, setErrore] = useState<string | null>(null);

// FILTRI
const [search, setSearch] = useState("");
const [filterComune, setFilterComune] = useState("");
const [filterStato, setFilterStato] = useState("");
const [filterInteresse, setFilterInteresse] = useState("");
const [filterTag, setFilterTag] = useState("");
const [filterConsenso, setFilterConsenso] = useState("");

// CARICA DATI
useEffect(() => {
async function load() {
setLoading(true);

const { data, error } = await supabase
.from("tabaccai")
.select("*")
.order("comune", { ascending: true })
.order("ragione_sociale", { ascending: true });

if (error) {
console.error(error);
setErrore("Errore nel caricamento dei tabaccai");
} else {
setTabaccai(data as Tabaccaio[]);
}

setLoading(false);
}
load();
}, []);

// LISTA COMUNI / STATI / INTERESSE
const comuni = useMemo(() => {
const s = new Set<string>();
tabaccai.forEach((t) => t.comune && s.add(t.comune));
return [...s].sort();
}, [tabaccai]);

const stati = useMemo(() => {
const s = new Set<string>();
tabaccai.forEach(
(t) => t.stato_relazione_supreme && s.add(t.stato_relazione_supreme)
);
return [...s].sort();
}, [tabaccai]);

const interessi = useMemo(() => {
const s = new Set<string>();
tabaccai.forEach(
(t) => t.interesse_supreme && s.add(t.interesse_supreme)
);
return [...s].sort();
}, [tabaccai]);

// FILTRI APPLICATI
const filtered = useMemo(() => {
return tabaccai.filter((t) => {
const text = search.toLowerCase();
const matchSearch =
!text ||
(t.ragione_sociale || "").toLowerCase().includes(text) ||
(t.rivendita || "").toLowerCase().includes(text);

const matchComune = !filterComune || t.comune === filterComune;
const matchStato =
!filterStato || t.stato_relazione_supreme === filterStato;
const matchInteresse =
!filterInteresse || t.interesse_supreme === filterInteresse;

const matchTag =
!filterTag ||
(t.tag_attivita || []).some((tag) =>
tag.toLowerCase().includes(filterTag.toLowerCase())
);

const matchConsenso =
!filterConsenso ||
(filterConsenso === "con" && t.consenso_marketing) ||
(filterConsenso === "senza" && !t.consenso_marketing);

return (
matchSearch &&
matchComune &&
matchStato &&
matchInteresse &&
matchTag &&
matchConsenso
);
});
}, [
tabaccai,
search,
filterComune,
filterStato,
filterInteresse,
filterTag,
filterConsenso,
]);

// =========================================================
// RENDER LISTA
// =========================================================

return (
<main className="space-y-4">
{/* HEADER */}
<div className="flex justify-between items-center">
<h1 className="text-xl font-bold">Tabaccai – Provincia di Siracusa</h1>

<Link
href="/tabaccai/nuovo"
className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
>
+ Nuova scheda tabaccaio
</Link>
</div>

{/* FILTRI */}
<section className="border rounded p-3 bg-gray-50 text-xs space-y-3">
<div className="grid grid-cols-1 md:grid-cols-6 gap-3">
<div>
<label>Ricerca</label>
<input
className="border rounded px-2 py-1 w-full"
placeholder="Nome, rivendita..."
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
</div>

<div>
<label>Comune</label>
<select
className="border rounded px-2 py-1 w-full"
value={filterComune}
onChange={(e) => setFilterComune(e.target.value)}
>
<option value="">Tutti</option>
{comuni.map((c) => (
<option key={c}>{c}</option>
))}
</select>
</div>

<div>
<label>Stato</label>
<select
className="border rounded px-2 py-1 w-full"
value={filterStato}
onChange={(e) => setFilterStato(e.target.value)}
>
<option value="">Tutti</option>
{stati.map((s) => (
<option key={s}>{s}</option>
))}
</select>
</div>

<div>
<label>Interesse</label>
<select
className="border rounded px-2 py-1 w-full"
value={filterInteresse}
onChange={(e) => setFilterInteresse(e.target.value)}
>
<option value="">Tutti</option>
{interessi.map((s) => (
<option key={s}>{s}</option>
))}
</select>
</div>

<div>
<label>Tag</label>
<input
className="border rounded px-2 py-1 w-full"
placeholder="iqos, liquidi..."
value={filterTag}
onChange={(e) => setFilterTag(e.target.value)}
/>
</div>

<div>
<label>Consenso</label>
<select
className="border rounded px-2 py-1 w-full"
value={filterConsenso}
onChange={(e) => setFilterConsenso(e.target.value)}
>
<option value="">Tutti</option>
<option value="con">Solo consensi</option>
<option value="senza">Senza consenso</option>
</select>
</div>
</div>
</section>

{/* TABELLA */}
<div className="overflow-x-auto border rounded bg-white">
<table className="min-w-full text-xs">
<thead className="bg-gray-100">
<tr>
<th className="px-2 py-1">Ragione sociale</th>
<th className="px-2 py-1">Comune</th>
<th className="px-2 py-1">Tel</th>
<th className="px-2 py-1">Cell</th>
<th className="px-2 py-1">Tags</th>
<th className="px-2 py-1">Azioni</th>
</tr>
</thead>

<tbody>
{filtered.map((t) => {
const waPrimo = buildWA(
t.whatsapp_numero || t.cellulare,
msgPrimoContatto(t.ragione_sociale, t.comune)
);

const waBiglietto = buildWA(
t.whatsapp_numero || t.cellulare,
msgBiglietto(t.id, t.ragione_sociale)
);

return (
<tr key={t.id} className="border-t hover:bg-gray-50">
<td className="px-2 py-1">{t.ragione_sociale}</td>
<td className="px-2 py-1">{t.comune}</td>
<td className="px-2 py-1">{t.telefono_fisso}</td>
<td className="px-2 py-1">{t.cellulare}</td>
<td className="px-2 py-1">
{(t.tag_attivita || []).join(", ") || "—"}
</td>

<td className="px-2 py-1">
<div className="flex flex-col gap-1">

<Link
href={`/tabaccai/${t.id}`}
className="text-blue-600 underline"
>
Scheda
</Link>

{waPrimo && (
<a
href={waPrimo}
target="_blank"
className="text-green-600 underline"
>
WhatsApp – Primo contatto
</a>
)}

{waBiglietto && (
<a
href={waBiglietto}
target="_blank"
className="text-green-700 underline"
>
WhatsApp – Biglietto
</a>
)}
</div>
</td>
</tr>
);
})}
</tbody>
</table>
</div>
</main>
);
}