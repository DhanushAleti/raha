import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { UploadDialog } from "@/components/vault/upload-dialog";
import { DocumentList, type DocumentView } from "@/components/vault/document-list";

export const metadata: Metadata = { title: "Document vault — Raha" };

export default async function VaultPage() {
  const supabase = await createClient();
  const { data: documents, error } = await supabase
    .from("documents")
    .select("id, category, file_name, size_bytes, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl text-raha-ink">Document vault</h1>
        <p className="mt-2 text-sm text-red-700">
          Couldn&apos;t load your documents. Refresh to try again.
        </p>
      </div>
    );
  }

  const views: DocumentView[] = (documents ?? []).map((doc) => ({
    id: doc.id as string,
    category: doc.category as string,
    fileName: doc.file_name as string,
    sizeBytes: Number(doc.size_bytes),
    createdAt: doc.created_at as string,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-raha-ink">Document vault</h1>
          <p className="text-sm text-raha-ink/55">
            FIRCs, contracts, PAN, GST certs — encrypted, in one place, only
            yours.
          </p>
        </div>
        <UploadDialog />
      </div>

      {views.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-raha-ink/20 bg-white p-10 text-center">
          <p className="font-display text-xl text-raha-ink">Vault is empty</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-raha-ink/55">
            Start with your GST certificate and the FIRCs your bank has issued
            — they&apos;re the documents a notice asks for first.
          </p>
          <div className="mt-5 flex justify-center">
            <UploadDialog />
          </div>
        </div>
      ) : (
        <DocumentList documents={views} />
      )}
    </div>
  );
}
