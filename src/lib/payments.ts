/**
 * The ₹2,000 Foreign Income Evidence Check — pricing and the UPI collect link.
 *
 * Until 2026-08-27 there was no way for any human to give Raha money: the
 * landing page said, in as many words, "No payment online — we onboard every
 * founding member personally over a call." That made the only kill criterion
 * that matters (someone pays) untestable.
 *
 * UPI rather than a gateway on purpose. A gateway needs a registered business,
 * KYC and a settlement account; a UPI collect link needs a VPA. The payment is
 * the signal, not the margin — so the cheapest rail that clears money wins.
 *
 * Nothing here is hardcoded: with NEXT_PUBLIC_UPI_ID unset, `upiLink()` returns
 * null and every caller falls back to WhatsApp. Set it in Vercel env and the
 * button goes live without a code change.
 */

export const DIAGNOSTIC_PRICE_INR = 2000;
export const DIAGNOSTIC_TURNAROUND_HOURS = 48;
export const DIAGNOSTIC_NAME = "Foreign Income Evidence Check";

/** upi:// deep links only resolve where a UPI app is installed — i.e. mobile. */
export function upiLink(note = DIAGNOSTIC_NAME): string | null {
  const vpa = process.env.NEXT_PUBLIC_UPI_ID?.trim();
  if (!vpa) return null;
  const payee = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME?.trim() || "Raha";
  const params = new URLSearchParams({
    pa: vpa,
    pn: payee,
    am: String(DIAGNOSTIC_PRICE_INR),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

/** The raw VPA, shown alongside the link so desktop visitors can still pay. */
export function upiId(): string | null {
  return process.env.NEXT_PUBLIC_UPI_ID?.trim() || null;
}
