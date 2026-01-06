import ScadenzeList from "./ScadenzeList";

type Props = {
  clienteId: number;
};

export default function ClienteScadenzeSection({ clienteId }: Props) {
  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Scadenze</h2>
      <ScadenzeList clienteId={clienteId} />
    </section>
  );
}
