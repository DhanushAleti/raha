"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type ActionResult =
  | { status: "ok" }
  | { status: "error"; message: string };

const CATEGORIES = ["firc", "contract", "pan", "gst_cert", "lut", "invoice", "other"] as const;
const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"] as const;
const MAX_BYTES = 10 * 1024 * 1024;

export async function uploadDocument(formData: FormData): Promise<ActionResult> {
  const file = formData.get("file");
  const category = formData.get("category");

  const categoryParsed = z.enum(CATEGORIES).safeParse(category);
  if (!categoryParsed.success) return { status: "error", message: "Pick a category." };

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Pick a file to upload." };
  }
  if (file.size > MAX_BYTES) {
    return { status: "error", message: "File is too large (10 MB max)." };
  }
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    return { status: "error", message: "Only PDF, PNG and JPG files are allowed." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not signed in." };

  const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 180) || "document";
  const storagePath = `${user.id}/${categoryParsed.data}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(storagePath, file, { contentType: file.type, upsert: false });
  if (uploadError) {
    console.error("document upload failed", uploadError.message);
    return { status: "error", message: "Upload failed — try again." };
  }

  const { error: rowError } = await supabase.from("documents").insert({
    user_id: user.id,
    category: categoryParsed.data,
    file_name: file.name.slice(0, 255),
    storage_path: storagePath,
    mime_type: file.type,
    size_bytes: file.size,
  });
  if (rowError) {
    // Keep storage consistent with the table.
    await supabase.storage.from("documents").remove([storagePath]);
    console.error("document row insert failed", { code: rowError.code, message: rowError.message });
    return { status: "error", message: "Upload failed — try again." };
  }

  revalidatePath("/app/vault");
  return { status: "ok" };
}

export type SignedUrlResult =
  | { status: "ok"; url: string }
  | { status: "error"; message: string };

export async function getDocumentUrl(id: string): Promise<SignedUrlResult> {
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { status: "error", message: "Invalid document." };

  const supabase = await createClient();
  const { data: doc } = await supabase
    .from("documents")
    .select("storage_path")
    .eq("id", parsed.data)
    .single();
  if (!doc) return { status: "error", message: "Document not found." };

  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(doc.storage_path, 60);
  if (error || !data?.signedUrl) {
    console.error("signed url failed", error?.message);
    return { status: "error", message: "Couldn't open the document — try again." };
  }
  return { status: "ok", url: data.signedUrl };
}

export async function deleteDocument(id: string): Promise<ActionResult> {
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { status: "error", message: "Invalid document." };

  const supabase = await createClient();
  const { data: doc } = await supabase
    .from("documents")
    .select("storage_path")
    .eq("id", parsed.data)
    .single();
  if (!doc) return { status: "error", message: "Document not found." };

  const { error: storageError } = await supabase.storage
    .from("documents")
    .remove([doc.storage_path]);
  if (storageError) {
    console.error("storage delete failed", storageError.message);
    return { status: "error", message: "Couldn't delete the file — try again." };
  }

  const { error } = await supabase.from("documents").delete().eq("id", parsed.data);
  if (error) {
    console.error("document row delete failed", { code: error.code, message: error.message });
    return { status: "error", message: "File removed but the record lingered — refresh." };
  }

  revalidatePath("/app/vault");
  return { status: "ok" };
}
