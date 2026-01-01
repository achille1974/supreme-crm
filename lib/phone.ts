export function cleanPhone(v?: string | null) {
  return (v || "").replace(/[^\d]/g, "");
}

export function getPrimaryPhone(row: {
  whatsapp?: string | null;
  cellulare?: string | null;
  telefono?: string | null;
}) {
  return cleanPhone(row.whatsapp || row.cellulare || row.telefono);
}
