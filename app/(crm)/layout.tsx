import Link from "next/link";
import TopSwitch from "@/components/crm/TopSwitch";

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

          {/* NAV SWITCH */}
          <TopSwitch />
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
