"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInvoice } from "@/app/actions/invoice";
import { computeInvoiceTotals, EXPORT_LUT_NOTE } from "@/lib/gst/calc";
import { formatInr } from "@/lib/format/inr";

interface ItemDraft {
  description: string;
  sacCode: string;
  qty: string;
  unitPrice: string;
}

const EMPTY_ITEM: ItemDraft = { description: "", sacCode: "998397", qty: "1", unitPrice: "" };

export function InvoiceForm({
  creatorState,
  lutArn,
}: {
  creatorState: string;
  lutArn: string;
}) {
  const router = useRouter();
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [supplyType, setSupplyType] = useState<"domestic" | "export">("domestic");
  const [clientName, setClientName] = useState("");
  const [clientGstin, setClientGstin] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientState, setClientState] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<ItemDraft[]>([{ ...EMPTY_ITEM }]);
  const [pending, startTransition] = useTransition();

  const preview = useMemo(() => {
    const parsed = items
      .map((i) => ({ qty: Number(i.qty), unitPrice: Number(i.unitPrice) }))
      .filter((i) => i.qty > 0 && i.unitPrice > 0);
    if (parsed.length === 0) return null;
    try {
      return computeInvoiceTotals(parsed, supplyType, creatorState, clientState);
    } catch {
      return null;
    }
  }, [items, supplyType, creatorState, clientState]);

  function setItem(index: number, patch: Partial<ItemDraft>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await createInvoice({
        issueDate,
        supplyType,
        clientName,
        clientGstin,
        clientAddress,
        clientState,
        notes,
        items: items.map((i) => ({
          description: i.description,
          sacCode: i.sacCode,
          qty: i.qty,
          unitPrice: i.unitPrice,
        })),
      });
      if (result.status === "ok") {
        toast.success("Invoice created as draft");
        router.push("/app/invoices");
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="inv-date">Issue date</Label>
          <Input
            id="inv-date"
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="inv-supply">Supply type</Label>
          <Select
            value={supplyType}
            onValueChange={(v) => setSupplyType(v as "domestic" | "export")}
          >
            <SelectTrigger id="inv-supply" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="domestic">Domestic — 18% GST</SelectItem>
              <SelectItem value="export">Export — zero-rated under LUT</SelectItem>
            </SelectContent>
          </Select>
          {supplyType === "export" ? (
            <p
              className={`text-xs ${lutArn ? "text-raha-ink/50" : "text-amber-700"}`}
            >
              {lutArn
                ? `Invoice will carry: "${EXPORT_LUT_NOTE}" (LUT ${lutArn})`
                : "No LUT ARN on your profile — add it in Settings before finalising export invoices."}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset className="space-y-4 rounded-2xl border border-raha-ink/8 bg-white p-5">
        <legend className="px-1 text-sm font-semibold text-raha-ink">Client</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cl-name">Name</Label>
            <Input
              id="cl-name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              maxLength={200}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cl-gstin">
              GSTIN <span className="text-raha-ink/40">(optional)</span>
            </Label>
            <Input
              id="cl-gstin"
              value={clientGstin}
              onChange={(e) => setClientGstin(e.target.value.toUpperCase())}
              maxLength={15}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cl-address">Address</Label>
          <Textarea
            id="cl-address"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            rows={2}
            maxLength={500}
          />
        </div>
        {supplyType === "domestic" ? (
          <div className="space-y-2">
            <Label htmlFor="cl-state">Client state</Label>
            <Input
              id="cl-state"
              value={clientState}
              onChange={(e) => setClientState(e.target.value)}
              placeholder="Karnataka"
              maxLength={60}
            />
            <p className="text-xs text-raha-ink/50">
              Same state as yours ({creatorState || "not set"}) → CGST+SGST;
              different or blank → IGST.
            </p>
          </div>
        ) : null}
      </fieldset>

      <fieldset className="space-y-3 rounded-2xl border border-raha-ink/8 bg-white p-5">
        <legend className="px-1 text-sm font-semibold text-raha-ink">Line items</legend>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 items-end gap-2">
            <div className="col-span-12 space-y-1 sm:col-span-5">
              <Label htmlFor={`it-desc-${index}`} className="text-xs">
                Description
              </Label>
              <Input
                id={`it-desc-${index}`}
                value={item.description}
                onChange={(e) => setItem(index, { description: e.target.value })}
                placeholder="Dedicated integration video"
                maxLength={300}
              />
            </div>
            <div className="col-span-4 space-y-1 sm:col-span-2">
              <Label htmlFor={`it-sac-${index}`} className="text-xs">
                SAC
              </Label>
              <Input
                id={`it-sac-${index}`}
                value={item.sacCode}
                onChange={(e) => setItem(index, { sacCode: e.target.value })}
                maxLength={8}
              />
            </div>
            <div className="col-span-3 space-y-1 sm:col-span-1">
              <Label htmlFor={`it-qty-${index}`} className="text-xs">
                Qty
              </Label>
              <Input
                id={`it-qty-${index}`}
                type="number"
                step="0.01"
                min="0.01"
                value={item.qty}
                onChange={(e) => setItem(index, { qty: e.target.value })}
              />
            </div>
            <div className="col-span-5 space-y-1 sm:col-span-3">
              <Label htmlFor={`it-price-${index}`} className="text-xs">
                Unit price (₹)
              </Label>
              <Input
                id={`it-price-${index}`}
                type="number"
                step="0.01"
                min="0.01"
                value={item.unitPrice}
                onChange={(e) => setItem(index, { unitPrice: e.target.value })}
              />
            </div>
            <div className="col-span-12 sm:col-span-1">
              {items.length > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove item ${index + 1}`}
                  className="text-raha-ink/40 hover:text-raha-red"
                  onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                >
                  ✕
                </Button>
              ) : null}
            </div>
          </div>
        ))}
        {items.length < 20 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setItems((prev) => [...prev, { ...EMPTY_ITEM }])}
          >
            + Add item
          </Button>
        ) : null}
      </fieldset>

      {preview ? (
        <div className="rounded-2xl bg-raha-cream p-5 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-raha-ink/60">Subtotal</span>
            <span className="font-medium">{formatInr(preview.subtotal, { decimals: true })}</span>
          </div>
          {preview.cgst > 0 ? (
            <>
              <div className="flex justify-between py-1">
                <span className="text-raha-ink/60">CGST 9%</span>
                <span>{formatInr(preview.cgst, { decimals: true })}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-raha-ink/60">SGST 9%</span>
                <span>{formatInr(preview.sgst, { decimals: true })}</span>
              </div>
            </>
          ) : null}
          {preview.igst > 0 ? (
            <div className="flex justify-between py-1">
              <span className="text-raha-ink/60">IGST 18%</span>
              <span>{formatInr(preview.igst, { decimals: true })}</span>
            </div>
          ) : null}
          {supplyType === "export" ? (
            <div className="flex justify-between py-1">
              <span className="text-raha-ink/60">GST</span>
              <span>Zero-rated (export under LUT)</span>
            </div>
          ) : null}
          <div className="mt-2 flex justify-between border-t border-raha-ink/10 pt-2 text-base">
            <span className="font-semibold">Total</span>
            <span className="font-display">{formatInr(preview.total, { decimals: true })}</span>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="inv-notes">
          Notes <span className="text-raha-ink/40">(optional, printed on invoice)</span>
        </Label>
        <Textarea
          id="inv-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          maxLength={1000}
        />
      </div>

      <Button type="submit" size="lg" disabled={pending || !clientName}>
        {pending ? "Creating…" : "Create draft invoice"}
      </Button>
    </form>
  );
}
