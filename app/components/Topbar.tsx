"use client";

export default function Topbar() {
  return (
    <header className="w-full bg-white border-b p-3 flex items-center justify-between shadow-sm sticky top-0 z-50">

      <div className="flex items-center gap-3">
        <img
          src="https://rhemerlnszwhrjzicesd.supabase.co/storage/v1/object/public/media/loghi/Logo-Achille-%20Beltrami.jpg"
          alt="Logo Achille Beltrami"
          className="w-10 h-auto rounded-md"
        />
        <h1 className="font-semibold text-lg tracking-wide">
          CRM Suprem-e • Achille Beltrami
        </h1>
      </div>

      <div className="text-sm text-gray-600">
        Powered by Suprem-e • 2025
      </div>

    </header>
  );
}