"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopSwitch() {
  const pathname = usePathname();

  const isTabaccai = pathname === "/tabaccai";
  const isDashboard = pathname.startsWith("/tabaccai/dashboard");
  const isBiglietto = pathname.startsWith("/v/");

  const base =
    "px-4 py-2 rounded-lg border text-sm font-medium transition";
  const active = "bg-black text-white";
  const inactive = "bg-white text-black";

  return (
    <div className="flex gap-2">
      <Link
        href="/tabaccai"
        className={`${base} ${isTabaccai ? active : inactive}`}
      >
        Tabaccai
      </Link>

      <Link
        href="/tabaccai/dashboard"
        className={`${base} ${isDashboard ? active : inactive}`}
      >
        Dashboard
      </Link>

      <Link
        href="/v/achille"
        className={`${base} ${isBiglietto ? active : inactive}`}
      >
        Biglietto
      </Link>
    </div>
  );
}

