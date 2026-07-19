const DEFAULT_MESSAGE =
  "Hi! I'm a creator and I want to know more about Raha's Founding Creator plan.";

/** Builds a wa.me deep link with a prefilled message. */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
