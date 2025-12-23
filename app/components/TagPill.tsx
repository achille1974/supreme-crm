"use client";

type Props = {
  tag: string;
  onClick?: (tag: string) => void;
};

function getTagColor(tag: string): string {
  const t = tag.toLowerCase();

  if (t.includes("liquid") || t.includes("aroma") || t.includes("nicot"))
    return "#7A3EF0"; // Viola Supreme

  if (t.includes("iqos") || t.includes("kiwi") || t.includes("device"))
    return "#0066FF"; // Blu Premium

  if (t.includes("cliente") || t.includes("potenziale") || t.includes("interesse"))
    return "#00B56A"; // Green Fresh

  if (t.includes("whatsapp") || t.includes("email") || t.includes("consenso"))
    return "#FF7A21"; // Orange Energy

  return "#222222"; // Carbon Black (default elegante)
}

export default function TagPill({ tag, onClick }: Props) {
  const color = getTagColor(tag);

  return (
    <span
      onClick={() => onClick?.(tag)}
      className="text-white text-[11px] px-2 py-0.5 rounded-full cursor-pointer transition-opacity hover:opacity-80"
      style={{
        backgroundColor: color,
        display: "inline-block",
        marginRight: "4px",
        marginBottom: "4px",
      }}
    >
      {tag}
    </span>
  );
}