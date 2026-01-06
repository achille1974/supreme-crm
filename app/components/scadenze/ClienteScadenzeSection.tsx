import ScadenzeList from "@/components/scadenze/ScadenzeList";

export default function ClienteScadenzeSection({
  clienteId,
}: {
  clienteId: number;
}) {
  return (
    <section style={{ marginTop: 24 }}>
      <h3>Scadenze</h3>
      <ScadenzeList clienteId={clienteId} />
    </section>
  );
}
