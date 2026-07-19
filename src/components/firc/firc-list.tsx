"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteFirc } from "@/app/actions/firc";
import { formatInr } from "@/lib/format/inr";

export interface FircView {
  id: string;
  receivedDate: string;
  bank: string;
  referenceNo: string;
  currency: string;
  amountForeign: number;
  amountInr: number;
  remainingInr: number;
}

export function FircList({ fircs }: { fircs: FircView[] }) {
  const [confirmDelete, setConfirmDelete] = useState<FircView | null>(null);
  const [pending, startTransition] = useTransition();

  function handleDelete(firc: FircView) {
    startTransition(async () => {
      const result = await deleteFirc(firc.id);
      if (result.status === "ok") {
        toast.success("FIRC deleted");
        setConfirmDelete(null);
      } else {
        toast.error(result.message);
      }
    });
  }

  if (fircs.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-raha-ink/20 bg-white px-6 py-8 text-center text-sm text-raha-ink/55">
        No FIRCs logged yet. Every foreign payout should eventually have one —
        ask your bank for certificates on past credits.
      </p>
    );
  }

  return (
    <>
      <ul className="divide-y divide-raha-ink/5 rounded-2xl border border-raha-ink/8 bg-white">
        {fircs.map((firc) => (
          <li
            key={firc.id}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
          >
            <div className="text-sm">
              <p className="font-medium text-raha-ink">
                {firc.referenceNo}{" "}
                <span className="font-normal text-raha-ink/50">· {firc.bank}</span>
              </p>
              <p className="text-xs text-raha-ink/50">
                {firc.receivedDate} · {firc.amountForeign.toLocaleString()} {firc.currency} ={" "}
                {formatInr(firc.amountInr)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  firc.remainingInr <= 0
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {firc.remainingInr <= 0
                  ? "Fully allocated"
                  : `${formatInr(firc.remainingInr)} unallocated`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-raha-ink/40 hover:text-raha-red"
                onClick={() => setConfirmDelete(firc)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={confirmDelete !== null} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this FIRC?</DialogTitle>
            <DialogDescription>
              {confirmDelete
                ? `${confirmDelete.referenceNo} (${formatInr(confirmDelete.amountInr)}). Its matches are removed and affected entries go back to at-risk.`
                : ""}
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
              {pending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
