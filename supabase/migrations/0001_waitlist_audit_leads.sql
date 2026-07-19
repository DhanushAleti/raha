-- Stage 1: lead-capture tables. Anonymous visitors may INSERT only; no read access.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 320),
  income_range text not null check (income_range in ('under_20l','20l_50l','50l_1cr','1cr_2cr','over_2cr')),
  platforms text[] not null default '{}'
);

create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

drop policy if exists "waitlist_anon_insert" on public.waitlist;
create policy "waitlist_anon_insert" on public.waitlist
  for insert to anon, authenticated with check (true);
-- No select/update/delete policies: leads are read from the Supabase dashboard only.

create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 320),
  handle text check (char_length(handle) <= 120),
  answers jsonb not null,
  score int not null check (score >= 0),
  verdict text not null check (verdict in ('green','amber','red'))
);

create unique index if not exists audit_leads_email_unique on public.audit_leads (lower(email));

alter table public.audit_leads enable row level security;

drop policy if exists "audit_leads_anon_insert" on public.audit_leads;
create policy "audit_leads_anon_insert" on public.audit_leads
  for insert to anon, authenticated with check (true);
-- Upserts on repeat submissions are handled server-side with the service role
-- via the update path being unavailable to anon: the server action retries as
-- insert-or-ignore and treats duplicates as success.
