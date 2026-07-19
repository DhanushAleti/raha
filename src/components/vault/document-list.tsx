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
import { deleteDocument, getDocumentUrl } from "@/app/actions/documents";
import { CATEGORY_LABELS } from "./categories";

export interface DocumentView {
  id: string;
  category: string;
  fileName: string;
  sizeBytes: number;
  createdAt: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentList({ documents }: { documents: DocumentView[] }) {
  const [confirmDelete, setConfirmDelete] = useState<DocumentView | null>(null);
  const [pending, startTransition] = useTransition();

  function handleOpen(doc: DocumentView) {
    startTransition(async () => {
      const result = await getDocumentUrl(doc.id);
      if (result.status === "ok") {
        window.open(result.url, "_blank", "noopener");
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDelete(doc: DocumentView) {
    startTransition(async () => {
      const result = await deleteDocument(doc.id);
      if (result.status === "ok") {
        toast.success("Document deleted");
        setConfirmDelete(null);
      } else {
        toast.error(result.message);
      }
    });
  }

  const grouped = documents.reduce<Record<string, DocumentView[]>>((acc, doc) => {
    (acc[doc.category] ??= []).push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, docs]) => (
        <section key={category} aria-label={CATEGORY_LABELS[category] ?? category}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-raha-ink/50">
            {CATEGORY_LABELS[category] ?? category} ({docs.length})
          </h2>
          <ul className="mt-3 divide-y divide-raha-ink/5 rounded-2xl border border-raha-ink/8 bg-white">
            {docs.map((doc) => (
              <li
                key={doc.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-raha-ink">{doc.fileName}</p>
                  <p className="text-xs text-raha-ink/50">
                    {doc.createdAt.slice(0, 10)} · {formatSize(doc.sizeBytes)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pending}
                    onClick={() => handleOpen(doc)}
                  >
                    Open
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-raha-ink/40 hover:text-raha-red"
                    disabled={pending}
                    onClick={() => setConfirmDelete(doc)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <Dialog open={confirmDelete !== null} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this document?</DialogTitle>
            <DialogDescription>
              {confirmDelete
                ? `"${confirmDelete.fileName}" will be permanently removed from your vault.`
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
    </div>
  );
}
