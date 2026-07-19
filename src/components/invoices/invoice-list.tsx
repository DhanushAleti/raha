"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteDraftInvoice, finalizeInvoice } from "@/app/actions/invoice";
import { formatInr } from "@/lib/format/inr";

export interface InvoiceView {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  clientName: string;
  supplyType: string;
  status: string;
  total: number;
}

export function InvoiceList({ invoices }: { invoices: InvoiceView[] }) {
  const [confirmFinalize, setConfirmFinalize] = useState<InvoiceView | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<InvoiceView | null>(null);
  const [pending, startTransition] = useTransition();

  function handleFinalize(inv: InvoiceView) {
    startTransition(async () => {
      const result = await finalizeInvoice(inv.id);
      if (result.status === "ok") {
        toast.success(`${inv.invoiceNumber} finalised`);
        setConfirmFinalize(null);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDelete(inv: InvoiceView) {
    startTransition(async () => {
      const result = await deleteDraftInvoice(inv.id);
      if (result.status === "ok") {
        toast.success("Draft deleted");
        setConfirmDelete(null);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <ul className="divide-y divide-raha-ink/5 rounded-2xl border border-raha-ink/8 bg-white">
        {invoices.map((inv) => (
          <li
            key={inv.id}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
          >
            <div>
              <p className="font-medium text-raha-ink">
                {inv.invoiceNumber}
                <Badge
                  variant="secondary"
                  className={`ml-2 ${
                    inv.status === "final"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {inv.status}
                </Badge>
              </p>
              <p className="text-xs text-raha-ink/50">
                {inv.issueDate} · {inv.clientName} ·{" "}
                {inv.supplyType === "export" ? "Export (zero-rated)" : "Domestic 18%"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg text-raha-ink">
                {formatInr(inv.total, { decimals: true })}
              </span>
              <Button asChild variant="outline" size="sm">
                <a href={`/app/invoices/${inv.id}/pdf`} target="_blank" rel="noopener">
                  PDF
                </a>
              </Button>
              {inv.status === "draft" ? (
                <>
                  <Button size="sm" disabled={pending} onClick={() => setConfirmFinalize(inv)}>
                    Finalise
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-raha-ink/40 hover:text-raha-red"
                    disabled={pending}
                    onClick={() => setConfirmDelete(inv)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={confirmFinalize !== null} onOpenChange={(o) => !o && setConfirmFinalize(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Finalise {confirmFinalize?.invoiceNumber}?</DialogTitle>
            <DialogDescription>
              Final invoices lock their number and contents permanently — they
              can&apos;t be edited or deleted (GST numbering must stay
              unbroken).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmFinalize(null)}>
              Cancel
            </Button>
            <Button
              disabled={pending}
              onClick={() => confirmFinalize && handleFinalize(confirmFinalize)}
            >
              {pending ? "Finalising…" : "Finalise"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDelete !== null} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete draft {confirmDelete?.invoiceNumber}?</DialogTitle>
            <DialogDescription>
              Drafts can be deleted freely — the number is reused by the next
              invoice.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={() => confirmDelete && handleDelete(confirmDelete)}
            >
              {pending ? "Deleting…" : "Delete draft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
