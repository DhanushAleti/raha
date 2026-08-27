const DEFAULT_MESSAGE =
  "Hi! I want to know more about the ₹2,000 Foreign Income Evidence Check.";

/** Builds a wa.me deep link with a prefilled message. */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
