import type { ExportStatus } from "@/lib/firc/match";

const META: Record<ExportStatus, { label: string; cls: string }> = {
  zero_rated: {
    label: "✓ Zero-rated",
    cls: "bg-emerald-100 text-emerald-800",
  },
  at_risk: { label: "✗ At risk — no FIRC", cls: "bg-red-100 text-red-700" },
  domestic: { label: "Domestic", cls: "bg-raha-ink/8 text-raha-ink/60" },
};

export function StatusChip({ status }: { status: ExportStatus }) {
  const meta = META[status];
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.cls}`}
    >
      {meta.label}
    </span>
  );
}
