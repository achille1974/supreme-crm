"use client";

type Filters = {
  search: string;
  comune: string;
};

export default function TabaccaiFilters({
  filters,
  onChange,
  comuni,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  comuni: string[];
}) {
  return (
    <div className="bg-white border rounded-xl p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* RICERCA */}
      <input
        placeholder="Cerca tabaccaio…"
        value={filters.search}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
        className="border rounded-lg px-3 py-2"
      />

      {/* COMUNE */}
      <select
        value={filters.comune}
        onChange={(e) =>
          onChange({ ...filters, comune: e.target.value })
        }
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Tutti i comuni</option>
        {comuni.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* RESET */}
      <button
        onClick={() =>
          onChange({ search: "", comune: "" })
        }
        className="border rounded-lg px-3 py-2 bg-gray-100 hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}
