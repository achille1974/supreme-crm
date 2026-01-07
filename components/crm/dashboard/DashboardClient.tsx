"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Link from "next/link";

/* ======================
   COMPONENTI BASE
====================== */

type BigCardProps = {
  label: string;
  value: number;
  color: string;
  href?: string;
};

function BigCard({ label, value, color, href }: BigCardProps) {
  const content = (
    <div className="rounded-xl border bg-white p-4 text-center hover:bg-slate-50 transition">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`text-4xl font-extrabold ${color}`}>
        {value}
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function PieBlock({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <div className="w-full" style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ======================
   DASHBOARD CLIENT
====================== */

export default function DashboardClient(props: any) {
  const {
    totale,
    consensoSi,
    consensoNo,
    stato,
    interesse,
    priorita,
    categoria,
  } = props;

  return (
    <div className="space-y-16">

      {/* ================= TABACCAI ================= */}
      <section>
        <h2 className="text-lg font-bold mb-4">Tabaccai</h2>

        <div className="grid grid-cols-3 gap-4">
          <BigCard label="Totale" value={totale} color="text-blue-600" />
          <BigCard
            label="Consenso SÌ"
            value={consensoSi}
            color="text-green-600"
            href="/tabaccai?consenso=si"
          />
          <BigCard
            label="Consenso NO"
            value={consensoNo}
            color="text-red-600"
            href="/tabaccai?consenso=no"
          />
        </div>

        <PieBlock
          data={[
            { name: "Sì", value: consensoSi, color: "#16a34a" },
            { name: "No", value: consensoNo, color: "#dc2626" },
          ]}
        />
      </section>

      {/* ================= STATO COMMERCIALE ================= */}
      <section>
        <h2 className="text-lg font-bold mb-4">Stato commerciale</h2>

        <div className="grid grid-cols-6 gap-4">
          <BigCard label="Totale" value={totale} color="text-blue-600" />
          <BigCard
            label="Mai contattati"
            value={stato.mai}
            color="text-amber-500"
            href="/tabaccai?stato=mai"
          />
          <BigCard
            label="Contattati"
            value={stato.contattato}
            color="text-blue-500"
            href="/tabaccai?stato=contattato"
          />
          <BigCard
            label="Interessati"
            value={stato.interessato}
            color="text-green-500"
            href="/tabaccai?stato=interessato"
          />
          <BigCard
            label="Clienti"
            value={stato.cliente}
            color="text-emerald-600"
            href="/tabaccai?stato=cliente"
          />
          <BigCard
            label="Persi"
            value={stato.perso}
            color="text-red-600"
            href="/tabaccai?stato=perso"
          />
        </div>

        <PieBlock
          data={[
            { name: "Mai", value: stato.mai, color: "#f59e0b" },
            { name: "Contattati", value: stato.contattato, color: "#3b82f6" },
            { name: "Interessati", value: stato.interessato, color: "#22c55e" },
            { name: "Clienti", value: stato.cliente, color: "#059669" },
            { name: "Persi", value: stato.perso, color: "#dc2626" },
          ]}
        />
      </section>

      {/* ================= INTERESSE ================= */}
      <section>
        <h2 className="text-lg font-bold mb-4">Interesse</h2>

        <div className="grid grid-cols-4 gap-4">
          <BigCard label="Totale" value={totale} color="text-blue-600" />
          <BigCard
            label="Alto"
            value={interesse.alto}
            color="text-green-600"
            href="/tabaccai?interesse=alto"
          />
          <BigCard
            label="Medio"
            value={interesse.medio}
            color="text-amber-500"
            href="/tabaccai?interesse=medio"
          />
          <BigCard
            label="Basso"
            value={interesse.basso}
            color="text-slate-400"
            href="/tabaccai?interesse=basso"
          />
        </div>

        <PieBlock
          data={[
            { name: "Alto", value: interesse.alto, color: "#16a34a" },
            { name: "Medio", value: interesse.medio, color: "#f59e0b" },
            { name: "Basso", value: interesse.basso, color: "#94a3b8" },
          ]}
        />
      </section>

      {/* ================= PRIORITÀ ================= */}
      <section>
        <h2 className="text-lg font-bold mb-4">Priorità</h2>

        <div className="grid grid-cols-4 gap-4">
          <BigCard label="Totale" value={totale} color="text-blue-600" />
          <BigCard
            label="Alta"
            value={priorita.alta}
            color="text-red-600"
            href="/tabaccai?priorita=alta"
          />
          <BigCard
            label="Media"
            value={priorita.media}
            color="text-amber-500"
            href="/tabaccai?priorita=media"
          />
          <BigCard
            label="Bassa"
            value={priorita.bassa}
            color="text-slate-400"
            href="/tabaccai?priorita=bassa"
          />
        </div>

        <PieBlock
          data={[
            { name: "Alta", value: priorita.alta, color: "#dc2626" },
            { name: "Media", value: priorita.media, color: "#f59e0b" },
            { name: "Bassa", value: priorita.bassa, color: "#94a3b8" },
          ]}
        />
      </section>

      {/* ================= CATEGORIA CLIENTE ================= */}
      <section>
        <h2 className="text-lg font-bold mb-4">Categoria cliente</h2>

        <div className="grid grid-cols-5 gap-4">
          <BigCard label="Totale" value={totale} color="text-blue-600" />
          <BigCard
            label="Potenziale"
            value={categoria.potenziale}
            color="text-amber-500"
            href="/tabaccai?categoria=potenziale"
          />
          <BigCard
            label="Attivo"
            value={categoria.attivo}
            color="text-emerald-600"
            href="/tabaccai?categoria=attivo"
          />
          <BigCard
            label="Fermo"
            value={categoria.fermo}
            color="text-slate-400"
            href="/tabaccai?categoria=fermo"
          />
          <BigCard
            label="Perso"
            value={categoria.perso}
            color="text-red-600"
            href="/tabaccai?categoria=perso"
          />
        </div>

        <PieBlock
          data={[
            { name: "Potenziale", value: categoria.potenziale, color: "#f59e0b" },
            { name: "Attivo", value: categoria.attivo, color: "#059669" },
            { name: "Fermo", value: categoria.fermo, color: "#94a3b8" },
            { name: "Perso", value: categoria.perso, color: "#dc2626" },
          ]}
        />
      </section>

    </div>
  );
}
