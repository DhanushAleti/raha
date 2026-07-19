-- Phase 1 core schema. RLS on every table; all access scoped to auth.uid().

-- ── profiles ──────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_name text not null default '',
  state text not null default '',            -- creator's GST state (drives CGST/SGST vs IGST)
  address text not null default '',
  pan text not null default '',
  gstin text not null default '',
  lut_arn text not null default '',          -- empty = warn on export invoices
  invoice_prefix text not null default 'INV' check (char_length(invoice_prefix) between 1 and 12),
  logo_path text
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Auto-create a profile row for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── documents (referenced by firc_records) ────────────────────────────────
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  category text not null check (category in ('firc','contract','pan','gst_cert','lut','invoice','other')),
  file_name text not null check (char_length(file_name) between 1 and 255),
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760)
);

create index if not exists documents_user_category_idx on public.documents (user_id, category);

alter table public.documents enable row level security;

create policy "documents_all_own" on public.documents
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ── income_entries ────────────────────────────────────────────────────────
create table if not exists public.income_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  entry_date date not null,
  platform text not null check (char_length(platform) between 1 and 60),
  description text not null default '' check (char_length(description) <= 500),
  category text not null check (category in ('ads','memberships','brand_deal','digital_products','other')),
  currency text not null check (currency in ('INR','USD','EUR','GBP')),
  amount_original numeric(14,2) not null check (amount_original > 0),
  rate_used numeric(12,4) not null check (rate_used > 0),
  rate_source text not null check (rate_source in ('rbi_table','manual','native')),
  amount_inr numeric(14,2) not null check (amount_inr > 0),
  tds_inr numeric(14,2) not null default 0 check (tds_inr >= 0),
  source text not null default 'manual' check (source in ('manual','csv'))
);

create index if not exists income_entries_user_date_idx on public.income_entries (user_id, entry_date desc);

alter table public.income_entries enable row level security;

create policy "income_entries_all_own" on public.income_entries
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ── firc_records ──────────────────────────────────────────────────────────
create table if not exists public.firc_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  received_date date not null,
  bank text not null check (char_length(bank) between 1 and 120),
  reference_no text not null check (char_length(reference_no) between 1 and 120),
  currency text not null check (currency in ('USD','EUR','GBP')),
  amount_foreign numeric(14,2) not null check (amount_foreign > 0),
  amount_inr numeric(14,2) not null check (amount_inr > 0),
  document_id uuid references public.documents (id) on delete set null,
  unique (user_id, reference_no)
);

create index if not exists firc_records_user_date_idx on public.firc_records (user_id, received_date desc);

alter table public.firc_records enable row level security;

create policy "firc_records_all_own" on public.firc_records
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ── firc_matches (allocation of a FIRC across income entries) ────────────
create table if not exists public.firc_matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  firc_id uuid not null references public.firc_records (id) on delete cascade,
  income_entry_id uuid not null references public.income_entries (id) on delete cascade,
  allocated_inr numeric(14,2) not null check (allocated_inr > 0),
  unique (firc_id, income_entry_id)
);

create index if not exists firc_matches_user_idx on public.firc_matches (user_id);
create index if not exists firc_matches_entry_idx on public.firc_matches (income_entry_id);

alter table public.firc_matches enable row level security;

create policy "firc_matches_all_own" on public.firc_matches
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ── invoices + invoice_items ──────────────────────────────────────────────
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  finalized_at timestamptz,
  status text not null default 'draft' check (status in ('draft','final')),
  fy text not null check (fy ~ '^\d{4}-\d{2}$'),
  seq int not null check (seq > 0),
  invoice_number text not null,
  issue_date date not null,
  supply_type text not null check (supply_type in ('domestic','export')),
  client_name text not null check (char_length(client_name) between 1 and 200),
  client_gstin text not null default '',
  client_address text not null default '' check (char_length(client_address) <= 500),
  client_state text not null default '',
  subtotal numeric(14,2) not null check (subtotal >= 0),
  cgst numeric(14,2) not null default 0 check (cgst >= 0),
  sgst numeric(14,2) not null default 0 check (sgst >= 0),
  igst numeric(14,2) not null default 0 check (igst >= 0),
  total numeric(14,2) not null check (total >= 0),
  notes text not null default '' check (char_length(notes) <= 1000),
  unique (user_id, fy, seq)
);

create index if not exists invoices_user_idx on public.invoices (user_id, created_at desc);

alter table public.invoices enable row level security;

create policy "invoices_all_own" on public.invoices
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  invoice_id uuid not null references public.invoices (id) on delete cascade,
  description text not null check (char_length(description) between 1 and 300),
  sac_code text not null default '998397' check (sac_code ~ '^\d{4,8}$'),
  qty numeric(10,2) not null default 1 check (qty > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  amount numeric(14,2) not null check (amount >= 0)
);

create index if not exists invoice_items_invoice_idx on public.invoice_items (invoice_id);

alter table public.invoice_items enable row level security;

create policy "invoice_items_all_own" on public.invoice_items
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ── updated_at maintenance ────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
