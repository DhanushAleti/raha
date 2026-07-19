import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY service-role client. Bypasses RLS — use strictly for narrow,
 * validated writes (audit-lead upserts, seeding). Never import from any file
 * reachable by the client bundle ("use client" components or their imports).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
