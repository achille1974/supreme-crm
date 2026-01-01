import Link from "next/link";

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-extrabold tracking-tight">
              CRM Tabaccai
            </div>
            <div className="text-xs text-slate-500">
              Operativo • Separato dal biglietto pubblico
            </div>
          </div>

          {/* NAV */}
          <nav className="flex gap-2">
            <Link
              href="/tabaccai"
              className="px-3 py-2 rounded-lg border bg-white text-sm font-semibold hover:bg-slate-100"
            >
              Tabaccai
            </Link>

            <Link
              href="/v/achille"
              className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-100"
            >
              Biglietto
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl p-4">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
        © 2025 • CRM operativo
      </footer>
    </div>
  );
}
