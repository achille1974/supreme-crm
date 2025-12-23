import "./globals.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export const metadata = {
  title: "CRM Suprem-e – Achille Beltrami",
  description: "Gestione Tabaccai – CRM Suprem-e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-gray-100 flex">

        {/* SIDEBAR (desktop) */}
        <Sidebar />

        {/* AREA PRINCIPALE */}
        <div className="flex-1 flex flex-col">

          {/* TOPBAR */}
          <Topbar />

          {/* CONTENUTO PAGINE */}
          <main className="p-4">{children}</main>

        </div>

      </body>
    </html>
  );
}