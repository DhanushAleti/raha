"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { joinWaitlist } from "@/app/actions/waitlist";

const INCOME_OPTIONS = [
  { value: "under_20l", label: "Under ₹20 lakh" },
  { value: "20l_50l", label: "₹20–50 lakh" },
  { value: "50l_1cr", label: "₹50 lakh – ₹1 crore" },
  { value: "1cr_2cr", label: "₹1–2 crore" },
  { value: "over_2cr", label: "Over ₹2 crore" },
] as const;

const PLATFORM_OPTIONS = [
  "Direct bank transfer",
  "Wise",
  "PayPal",
  "Payoneer",
  "Stripe",
  "AdSense / other platform",
] as const;

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function togglePlatform(platform: string, checked: boolean) {
    setPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform),
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get("company");
    startTransition(async () => {
      const result = await joinWaitlist({
        name,
        email,
        incomeRange,
        platforms,
        company: typeof honeypot === "string" ? honeypot : undefined,
      });
      if (result.status === "ok") {
        setSubmitted(true);
        toast.success(
          result.alreadyJoined
            ? "You're already on the list — we'll be in touch soon."
            : "You're on the list. We'll reach out within a day.",
        );
      } else {
        toast.error(result.message);
      }
    });
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-raha-green/25 bg-raha-green-soft p-8 text-center">
        <p className="font-display text-2xl text-raha-green">You&apos;re in.</p>
        <p className="mt-2 text-raha-ink/70">
          We reach out to everyone personally — expect a message within a
          day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, catches naive bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="wl-name">Name</Label>
          <Input
            id="wl-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            maxLength={120}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wl-email">Email</Label>
          <Input
            id="wl-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            maxLength={320}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="wl-income">Annual foreign income</Label>
        <Select value={incomeRange} onValueChange={setIncomeRange}>
          <SelectTrigger id="wl-income" className="w-full">
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent>
            {INCOME_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">How are you paid?</legend>
        <div className="grid grid-cols-2 gap-3">
          {PLATFORM_OPTIONS.map((platform) => (
            <label
              key={platform}
              className="flex items-center gap-2 text-sm text-raha-ink/75"
            >
              <Checkbox
                checked={platforms.includes(platform)}
                onCheckedChange={(checked) =>
                  togglePlatform(platform, checked === true)
                }
              />
              {platform}
            </label>
          ))}
        </div>
      </fieldset>
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full text-base"
        disabled={pending || !name || !email || !incomeRange}
      >
        {pending ? "Joining…" : "Join the waitlist"}
      </Button>
      <p className="text-center text-xs text-raha-ink/45">
        No spam, ever. We only reach out about your seat.
      </p>
    </form>
  );
}
