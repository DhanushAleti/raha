/**
 * GST invoice math — pure, no I/O, CA-reviewable in one screen.
 *
 * Domestic supplies carry 18% GST (SAC 9983xx services):
 *   intra-state → CGST 9% + SGST 9%; inter-state (or unknown state) → IGST 18%.
 * Exports under LUT are zero-rated: no tax, invoice carries the LUT note.
 * Rounding: half-up to 2 decimals per line; taxes computed on the subtotal.
 */
import { roundInr } from "@/lib/fx/convert";

export type SupplyType = "domestic" | "export";

export interface InvoiceItemInput {
  qty: number;
  unitPrice: number;
}

export interface InvoiceTotals {
  lineAmounts: number[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

const GST_RATE = 0.18;
const HALF_RATE = 0.09;

function normalizeState(state: string): string {
  return state.trim().toLowerCase();
}

export function computeInvoiceTotals(
  items: InvoiceItemInput[],
  supplyType: SupplyType,
  creatorState: string,
  clientState: string,
): InvoiceTotals {
  if (items.length === 0) throw new Error("An invoice needs at least one line item");
  for (const item of items) {
    if (!(item.qty > 0)) throw new Error("Quantity must be positive");
    if (!(item.unitPrice > 0)) throw new Error("Unit price must be positive");
  }

  const lineAmounts = items.map((item) => roundInr(item.qty * item.unitPrice));
  const subtotal = roundInr(lineAmounts.reduce((sum, amount) => sum + amount, 0));

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (supplyType === "domestic") {
    const sameState =
      normalizeState(creatorState) !== "" &&
      normalizeState(creatorState) === normalizeState(clientState);
    if (sameState) {
      cgst = roundInr(subtotal * HALF_RATE);
      sgst = roundInr(subtotal * HALF_RATE);
    } else {
      // Unknown client state defaults to IGST — the safe inter-state assumption.
      igst = roundInr(subtotal * GST_RATE);
    }
  }

  return {
    lineAmounts,
    subtotal,
    cgst,
    sgst,
    igst,
    total: roundInr(subtotal + cgst + sgst + igst),
  };
}

/** The mandatory declaration on zero-rated export invoices. */
export const EXPORT_LUT_NOTE =
  "Supply meant for export of services under LUT without payment of IGST.";
