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
    title: "How much do you earn as a creator each year?",
    sub: "Across every platform and brand deal, before tax.",
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
    title: "Where does your money come from?",
    sub: "Pick everything that pays you.",
    options: [
      { value: "youtube", label: "YouTube / AdSense" },
      { value: "patreon", label: "Patreon" },
      { value: "twitch", label: "Twitch" },
      { value: "substack", label: "Substack" },
      { value: "instagram", label: "Instagram" },
      { value: "brand_deals", label: "Brand deals (INR)" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "foreignIncome",
    kind: "single",
    title: "Does any of it arrive in foreign currency?",
    sub: "Dollars from AdSense, euros from Patreon — anything that isn't rupees at the source.",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No, everything is INR" },
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
    title: "Do you collect FIRCs for your foreign payouts?",
    sub: "The bank certificate that proves money came from abroad.",
    options: [
      { value: "always", label: "Every single payout" },
      { value: "sometimes", label: "Some of them" },
      { value: "never", label: "Never" },
      { value: "whats_that", label: "What's a FIRC?" },
    ],
  },
  {
    id: "invoicePractice",
    kind: "single",
    title: "How do you invoice brand deals?",
    options: [
      {
        value: "gst_sequence",
        label: "GST-compliant invoices, numbered in sequence",
      },
      { value: "adhoc", label: "Ad-hoc PDFs when a brand asks" },
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
