"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addIncomeEntry } from "@/app/actions/income";
import { defaultCategoryFor } from "@/lib/income/categorize";
import { convertToInr, getRateForDate, type Currency } from "@/lib/fx/convert";
import { formatInr } from "@/lib/format/inr";

const CATEGORIES = [
  { value: "ads", label: "Ads (AdSense etc.)" },
  { value: "memberships", label: "Memberships" },
  { value: "brand_deal", label: "Brand deal" },
  { value: "digital_products", label: "Digital products" },
  { value: "other", label: "Other" },
] as const;

const CURRENCIES = ["INR", "USD", "EUR", "GBP"] as const;

export function AddEntryDialog() {
  const [open, setOpen] = useState(false);
  const [entryDate, setEntryDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [rateTouched, setRateTouched] = useState(false);
  const [tds, setTds] = useState("");
  const [pending, startTransition] = useTransition();

  // Reference rate for the picked date; user can override.
  const tableRate = useMemo(() => {
    if (currency === "INR" || !entryDate) return null;
    try {
      return getRateForDate(currency, entryDate).rate;
    } catch {
      return null;
    }
  }, [currency, entryDate]);

  const effectiveRate = rateTouched && rate ? Number(rate) : tableRate;
  const preview =
    currency !== "INR" && amount && effectiveRate && Number(amount) > 0
      ? convertToInr(Number(amount), effectiveRate)
      : null;

  function handlePlatformChange(value: string) {
    setPlatform(value);
    if (!category && value.trim()) setCategory(defaultCategoryFor(value));
  }

  function reset() {
    setEntryDate("");
    setPlatform("");
    setDescription("");
    setCategory("");
    setCurrency("INR");
    setAmount("");
    setRate("");
    setRateTouched(false);
    setTds("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await addIncomeEntry({
        entryDate,
        platform,
        description,
        category: category || defaultCategoryFor(platform),
        currency,
        amount,
        rate: currency === "INR" ? undefined : (effectiveRate ?? undefined),
        tdsInr: tds || 0,
      });
      if (result.status === "ok") {
        toast.success("Income entry added");
        reset();
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add income</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add income</DialogTitle>
          <DialogDescription>
            One payout or deal. Foreign amounts convert at the reference rate
            for the date — editable if your bank applied a different one.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inc-date">Date received</Label>
              <Input
                id="inc-date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inc-currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(v) => {
                  setCurrency(v as Currency);
                  setRateTouched(false);
                  setRate("");
                }}
              >
                <SelectTrigger id="inc-currency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inc-platform">Platform / source</Label>
            <Input
              id="inc-platform"
              value={platform}
              onChange={(e) => handlePlatformChange(e.target.value)}
              placeholder="YouTube / AdSense, Patreon, Brand deal…"
              required
              maxLength={60}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inc-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="inc-category" className="w-full">
                <SelectValue placeholder="Auto-detected from platform" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inc-amount">Amount ({currency})</Label>
              <Input
                id="inc-amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            {currency !== "INR" ? (
              <div className="space-y-2">
                <Label htmlFor="inc-rate">₹ per {currency}</Label>
                <Input
                  id="inc-rate"
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  value={rateTouched ? rate : (tableRate ?? "")}
                  onChange={(e) => {
                    setRateTouched(true);
                    setRate(e.target.value);
                  }}
                  required
                />
                <p className="text-xs text-raha-ink/50">
                  {tableRate && !rateTouched
                    ? "Reference rate — edit if your bank differed"
                    : "Manual rate"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="inc-tds">TDS deducted (₹, optional)</Label>
                <Input
                  id="inc-tds"
                  type="number"
                  step="0.01"
                  min="0"
                  value={tds}
                  onChange={(e) => setTds(e.target.value)}
                />
              </div>
            )}
          </div>
          {preview !== null ? (
            <p className="rounded-lg bg-raha-cream px-4 py-2.5 text-sm text-raha-ink/75">
              ≈ <strong>{formatInr(preview, { decimals: true })}</strong> at
              the applied rate
            </p>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="inc-desc">
              Note <span className="text-raha-ink/40">(optional)</span>
            </Label>
            <Input
              id="inc-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="April payout, Nimbus sponsorship…"
              maxLength={500}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={pending || !entryDate || !platform || !amount}
          >
            {pending ? "Saving…" : "Save entry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
