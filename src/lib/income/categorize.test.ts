import { describe, expect, test } from "vitest";
import { defaultCategoryFor } from "./categorize";

describe("defaultCategoryFor", () => {
  test("maps known platforms to their categories", () => {
    expect(defaultCategoryFor("YouTube / AdSense")).toBe("ads");
    expect(defaultCategoryFor("adsense")).toBe("ads");
    expect(defaultCategoryFor("Patreon")).toBe("memberships");
    expect(defaultCategoryFor("YouTube Memberships")).toBe("memberships");
    expect(defaultCategoryFor("Twitch")).toBe("memberships");
    expect(defaultCategoryFor("Brand deal")).toBe("brand_deal");
    expect(defaultCategoryFor("Instagram sponsorship")).toBe("brand_deal");
    expect(defaultCategoryFor("Gumroad")).toBe("digital_products");
    expect(defaultCategoryFor("Ko-fi shop")).toBe("digital_products");
  });

  test("is case- and whitespace-insensitive", () => {
    expect(defaultCategoryFor("  PATREON  ")).toBe("memberships");
    expect(defaultCategoryFor("ADSENSE payouts")).toBe("ads");
  });

  test("unknown platforms fall back to other", () => {
    expect(defaultCategoryFor("Some New Platform")).toBe("other");
    expect(defaultCategoryFor("")).toBe("other");
  });
});
