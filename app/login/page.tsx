"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const MASTER_PASSWORD = "Supreme2025!";

export default function LoginPage() {
const [password, setPassword] = useState("");
const [errore, setErrore] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const router = useRouter();

const handleSubmit = (e: FormEvent) => {
e.preventDefault();
setErrore(null);

// ✅ Controllo password
if (password !== MASTER_PASSWORD) {
setErrore("Password errata.");
return;
}

setLoading(true);

const maxAge = 60 * 60 * 24 * 7; // 7 giorni

// ✅ imposto DUE cookie, così il middleware ti riconosce sicuro
document.cookie = `crm_auth_ok=1; path=/; max-age=${maxAge}`;
document.cookie = `supreme_crm_auth_ok=1; path=/; max-age=${maxAge}`;

// ✅ dopo il login vai alla lista tabaccai
router.push("/tabaccai");
};

return (
<main className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
<h1 className="text-xl font-semibold mb-4 text-center">
Login CRM Suprem-e
</h1>

<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-sm font-medium mb-1">
Password
</label>
<input
type="password"
className="w-full border rounded px-3 py-2"
value={password}
onChange={(e) => setPassword(e.target.value)}
autoFocus
/>
</div>

{errore && (
<p className="text-sm text-red-600">{errore}</p>
)}

<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
>
{loading ? "Accesso in corso..." : "Entra"}
</button>
</form>

<p className="mt-4 text-xs text-gray-500 text-center">
Password: Supreme2025!
</p>
</div>
</main>
);
}