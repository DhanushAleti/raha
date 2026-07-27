-- Anonymous funnel measurement for the audit.
--
-- The audit report is shown before the email ask, so a visitor can complete the
-- whole thing and leave without ever appearing in audit_leads. That made the top
-- of the funnel invisible: no way to tell whether five people ran the audit or
-- five hundred. This table records the completion itself, with no PII, so
-- completions and email conversion can both be measured.
--
-- Deliberately contains no name, email, handle, or IP — only the answers given
-- and the verdict produced.

create table if not exists public.audit_completions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  answers jsonb not null,
  score int not null check (score >= 0),
  verdict text not null check (verdict in ('green','amber','red'))
);

create index if not exists audit_completions_created_at_idx
  on public.audit_completions (created_at desc);

alter table public.audit_completions enable row level security;

drop policy if exists "audit_completions_anon_insert" on public.audit_completions;
create policy "audit_completions_anon_insert" on public.audit_completions
  for insert to anon, authenticated with check (true);
-- No select/update/delete policies: read from the Supabase dashboard only.
