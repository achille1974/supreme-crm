"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-gray-900 text-white min-h-screen p-4">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://rhemerlnszwhrjzicesd.supabase.co/storage/v1/object/public/media/loghi/Logo-Achille-%20Beltrami.jpg"
          alt="Logo Achille Beltrami"
          className="w-20 h-auto rounded-md shadow-lg mb-3"
        />
        <p className="text-xs text-gray-300 text-center">
          CRM Suprem-e • Achille Beltrami
        </p>
      </div>

      <nav className="flex flex-col space-y-3">
        <Link href="/dashboard" className="hover:underline">
          📊 Dashboard
        </Link>

        <Link href="/tabaccai" className="hover:underline">
          🏪 Tabaccai
        </Link>

        <Link href="/agenda" className="hover:underline">
          🗓 Agenda
        </Link>
      </nav>
    </aside>
  );
}