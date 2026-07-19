import { describe, expect, test } from "vitest";
import { formatInr, inrAmountInWords } from "./inr";

describe("formatInr — lakh/crore digit grouping", () => {
  test("groups Indian style with ₹ symbol", () => {
    expect(formatInr(1234567)).toBe("₹12,34,567");
    expect(formatInr(123)).toBe("₹123");
    expect(formatInr(12345)).toBe("₹12,345");
    expect(formatInr(10000000)).toBe("₹1,00,00,000");
  });

  test("keeps two decimals when requested", () => {
    expect(formatInr(1234567.5, { decimals: true })).toBe("₹12,34,567.50");
    expect(formatInr(99.999, { decimals: true })).toBe("₹100.00");
  });

  test("handles zero and negatives", () => {
    expect(formatInr(0)).toBe("₹0");
    expect(formatInr(-45000)).toBe("−₹45,000");
  });
});

describe("inrAmountInWords", () => {
  test("crore/lakh/thousand composition", () => {
    expect(inrAmountInWords(12345678)).toBe(
      "Rupees One Crore Twenty-Three Lakh Forty-Five Thousand Six Hundred Seventy-Eight Only",
    );
  });

  test("simple values", () => {
    expect(inrAmountInWords(100)).toBe("Rupees One Hundred Only");
    expect(inrAmountInWords(0)).toBe("Rupees Zero Only");
    expect(inrAmountInWords(21)).toBe("Rupees Twenty-One Only");
  });

  test("includes paise when present", () => {
    expect(inrAmountInWords(1500.5)).toBe(
      "Rupees One Thousand Five Hundred and Fifty Paise Only",
    );
  });

  test("rounds paise to two decimals", () => {
    expect(inrAmountInWords(10.999)).toBe("Rupees Eleven Only");
  });
});
