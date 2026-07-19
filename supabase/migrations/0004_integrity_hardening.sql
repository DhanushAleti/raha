-- Hardening from security/database review.

-- 1. Same-owner integrity on firc_matches: a user must not be able to create
--    a match row referencing another user's FIRC or income entry (even via
--    direct PostgREST calls with guessed UUIDs). Composite FKs enforce that
--    the referenced rows belong to the same user_id as the match row.
create unique index if not exists firc_records_id_user_unique
  on public.firc_records (id, user_id);
create unique index if not exists income_entries_id_user_unique
  on public.income_entries (id, user_id);

alter table public.firc_matches
  drop constraint if exists firc_matches_firc_same_owner,
  add constraint firc_matches_firc_same_owner
    foreign key (firc_id, user_id)
    references public.firc_records (id, user_id) on delete cascade;

alter table public.firc_matches
  drop constraint if exists firc_matches_entry_same_owner,
  add constraint firc_matches_entry_same_owner
    foreign key (income_entry_id, user_id)
    references public.income_entries (id, user_id) on delete cascade;

-- 2. Index for allocation lookups by FIRC (remaining-amount computations).
create index if not exists firc_matches_firc_idx on public.firc_matches (firc_id);

-- 3. Index for invoice_items RLS/user scans.
create index if not exists invoice_items_user_idx on public.invoice_items (user_id);
