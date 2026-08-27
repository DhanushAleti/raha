import { afterEach, describe, expect, test, vi } from "vitest";
import { DIAGNOSTIC_PRICE_INR, upiId, upiLink } from "./payments";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("upiLink", () => {
  test("returns null when no VPA is configured, so callers fall back", () => {
    vi.stubEnv("NEXT_PUBLIC_UPI_ID", "");
    expect(upiLink()).toBeNull();
    expect(upiId()).toBeNull();
  });

  test("builds a UPI deep link with the amount fixed at the diagnostic price", () => {
    vi.stubEnv("NEXT_PUBLIC_UPI_ID", "someone@okhdfcbank");
    vi.stubEnv("NEXT_PUBLIC_UPI_PAYEE_NAME", "Raha");
    const link = upiLink();
    expect(link).toContain("upi://pay?");
    expect(link).toContain("pa=someone%40okhdfcbank");
    expect(link).toContain(`am=${DIAGNOSTIC_PRICE_INR}`);
    expect(link).toContain("cu=INR");
  });

  test("encodes the note so a transaction reference cannot break the link", () => {
    vi.stubEnv("NEXT_PUBLIC_UPI_ID", "someone@okhdfcbank");
    const link = upiLink("Evidence Check — Q2 & FY24");
    expect(link).toContain("tn=Evidence+Check+%E2%80%94+Q2+%26+FY24");
  });

  test("falls back to a payee name when none is set", () => {
    vi.stubEnv("NEXT_PUBLIC_UPI_ID", "someone@okhdfcbank");
    vi.stubEnv("NEXT_PUBLIC_UPI_PAYEE_NAME", "");
    expect(upiLink()).toContain("pn=Raha");
  });

  test("whitespace-only config is treated as unset", () => {
    vi.stubEnv("NEXT_PUBLIC_UPI_ID", "   ");
    expect(upiLink()).toBeNull();
  });
});
