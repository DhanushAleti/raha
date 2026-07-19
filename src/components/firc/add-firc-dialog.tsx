"use client";

import { useState, useTransition } from "react";
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
import { addFirc } from "@/app/actions/firc";

export function AddFircDialog() {
  const [open, setOpen] = useState(false);
  const [receivedDate, setReceivedDate] = useState("");
  const [bank, setBank] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [amountForeign, setAmountForeign] = useState("");
  const [amountInr, setAmountInr] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await addFirc({
        receivedDate,
        bank,
        referenceNo,
        currency,
        amountForeign,
        amountInr,
      });
      if (result.status === "ok") {
        toast.success("FIRC logged");
        setReceivedDate("");
        setBank("");
        setReferenceNo("");
        setAmountForeign("");
        setAmountInr("");
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Log FIRC</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log a FIRC</DialogTitle>
          <DialogDescription>
            Copy the details from the certificate (or IRM advice) your bank
            issued for the foreign credit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firc-date">Credit date</Label>
              <Input
                id="firc-date"
                type="date"
                value={receivedDate}
                onChange={(e) => setReceivedDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firc-currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="firc-currency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["USD", "EUR", "GBP"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firc-bank">Bank</Label>
            <Input
              id="firc-bank"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="HDFC Bank"
              required
              maxLength={120}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firc-ref">FIRC / IRM reference no.</Label>
            <Input
              id="firc-ref"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder="FIRC-2026-0001"
              required
              maxLength={120}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firc-foreign">Amount ({currency})</Label>
              <Input
                id="firc-foreign"
                type="number"
                step="0.01"
                min="0.01"
                value={amountForeign}
                onChange={(e) => setAmountForeign(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firc-inr">INR credited</Label>
              <Input
                id="firc-inr"
                type="number"
                step="0.01"
                min="0.01"
                value={amountInr}
                onChange={(e) => setAmountInr(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={pending || !receivedDate || !bank || !referenceNo || !amountForeign || !amountInr}
          >
            {pending ? "Saving…" : "Save FIRC"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
