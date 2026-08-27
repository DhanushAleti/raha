import type { AuditAnswers } from "@/lib/audit/scoring";

export type QuestionId = keyof AuditAnswers;

interface BaseQuestion {
  id: QuestionId;
  title: string;
  sub?: string;
}

export interface SingleQuestion extends BaseQuestion {
  kind: "single";
  options: { value: string; label: string; hint?: string }[];
}

export interface MultiQuestion extends BaseQuestion {
  kind: "multi";
  options: { value: string; label: string }[];
}

export type Question = SingleQuestion | MultiQuestion;

export const QUESTIONS: Question[] = [
  {
    id: "incomeRange",
    kind: "single",
    title: "How much do you earn from abroad each year?",
    sub: "Across every client, platform and payment route, before tax.",
    options: [
      { value: "under_20l", label: "Under ₹20 lakh" },
      { value: "20l_50l", label: "₹20–50 lakh" },
      { value: "50l_1cr", label: "₹50 lakh – ₹1 crore" },
      { value: "1cr_2cr", label: "₹1–2 crore" },
      { value: "over_2cr", label: "Over ₹2 crore" },
    ],
  },
  {
    id: "platforms",
    kind: "multi",
    title: "What pays you?",
    sub: "Pick everything that applies — clients, platforms, your own products.",
    options: [
      // Layer-2 first: these are the people the outreach actually targets, and
      // until 2026-08-27 every one of them had to answer "Other".
      { value: "freelance_clients", label: "Freelance, consulting or agency clients abroad" },
      { value: "own_product", label: "My own product, SaaS or app subscriptions" },
      { value: "marketplace", label: "Upwork, Fiverr, Toptal or similar" },
      { value: "youtube", label: "YouTube / AdSense" },
      { value: "patreon", label: "Patreon" },
      { value: "substack", label: "Substack" },
      { value: "twitch", label: "Twitch" },
      { value: "instagram", label: "Instagram" },
      { value: "brand_deals", label: "Indian brand deals (INR)" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "foreignIncome",
    kind: "single",
    title: "Does any of it arrive in foreign currency?",
    sub: "Dollars from a US client, euros from Stripe, anything from AdSense — anything that isn't rupees at the source.",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No, everything is INR" },
    ],
  },
  {
    id: "paymentRail",
    kind: "single",
    title: "How does the money actually reach you?",
    sub: "This changes the answer more than anything else here — whether a FIRA can be issued at all depends on the route.",
    options: [
      {
        value: "bank",
        label: "Straight into my bank account",
        hint: "AdSense into SBI, a client wiring you directly",
      },
      {
        value: "aggregator",
        label: "Wise, PayPal or Stripe",
        hint: "Converted abroad, then paid into your account",
      },
      {
        value: "rail",
        label: "Skydo, Karbon, Payoneer or Winvesta",
        hint: "A platform built for export payments",
      },
      { value: "not_sure", label: "Honestly, not sure" },
    ],
  },
  {
    id: "gstRegistered",
    kind: "single",
    title: "Are you GST registered?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Honestly, not sure" },
    ],
  },
  {
    id: "lutFiled",
    kind: "single",
    title: "Have you filed an LUT for this financial year?",
    sub: "A Letter of Undertaking lets you export services without paying IGST upfront.",
    options: [
      { value: "yes", label: "Yes, it's filed" },
      { value: "no", label: "No" },
      { value: "whats_that", label: "What's an LUT?" },
    ],
  },
  {
    id: "fircCollection",
    kind: "single",
    title: "Do you collect a FIRA for your foreign payouts?",
    sub: "The bank advice that proves the money came from abroad. Banks stopped issuing physical FIRCs for exports in 2016 — a FIRA (or e-FIRC/FIRS) is what replaced it.",
    options: [
      { value: "always", label: "Every single payout" },
      { value: "sometimes", label: "Some of them" },
      { value: "never", label: "Never" },
      { value: "whats_that", label: "What's a FIRA?" },
    ],
  },
  {
    id: "invoicePractice",
    kind: "single",
    title: "How do you invoice your clients?",
    options: [
      {
        value: "gst_sequence",
        label: "GST-compliant invoices, numbered in sequence",
      },
      { value: "adhoc", label: "Ad-hoc PDFs when someone asks" },
      { value: "none", label: "I don't send invoices" },
    ],
  },
  {
    id: "setAsideAwareness",
    kind: "single",
    title: "Do you know how much to set aside for tax right now?",
    options: [
      { value: "exact", label: "Yes — I track an exact number" },
      { value: "rough", label: "A rough guess" },
      { value: "no", label: "No idea, and it stresses me out" },
    ],
  },
];
