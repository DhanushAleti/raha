/** Platform → default income category. Always user-overridable in the UI. */

export type IncomeCategory =
  | "ads"
  | "memberships"
  | "brand_deal"
  | "digital_products"
  | "other";

/** Checked in order — first match wins. */
const RULES: Array<{ pattern: RegExp; category: IncomeCategory }> = [
  { pattern: /adsense|admob|ad revenue|youtube(?! member)/i, category: "ads" },
  { pattern: /member|patreon|twitch|substack|superchat|super thanks|fan club/i, category: "memberships" },
  { pattern: /brand|sponsor|collab|campaign|instagram/i, category: "brand_deal" },
  { pattern: /gumroad|ko-?fi|shop|course|preset|merch|digital/i, category: "digital_products" },
];

export function defaultCategoryFor(platform: string): IncomeCategory {
  const normalized = platform.trim();
  for (const rule of RULES) {
    if (rule.pattern.test(normalized)) return rule.category;
  }
  return "other";
}
