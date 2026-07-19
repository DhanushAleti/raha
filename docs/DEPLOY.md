# Deploy guide — Raha

Everything is built and verified except the two things only you can create: a Supabase project and a Vercel project. ~20 minutes total.

## 1. Supabase (~10 min)

1. [supabase.com/dashboard](https://supabase.com/dashboard) → New project. **Region: Mumbai (ap-south-1)** — keeps financial data in India (data-localization commitment on the landing page).
2. SQL Editor → paste and run each file from `supabase/migrations/` **in order**: `0001…`, `0002…`, `0003…`, `0004…`. All are idempotent (safe to re-run).
3. Authentication → Providers → enable **Google** (needs a Google OAuth client — Supabase docs walk through it) and keep **Email** on. Authentication → URL Configuration → set Site URL to your production URL and add `https://YOUR-DOMAIN/auth/confirm` + `/auth/callback` to redirect URLs.
4. Project Settings → API → copy: Project URL, `anon` key, `service_role` key.

## 2. Local env + seed (~3 min)

```bash
cd raha
cp .env.example .env.local   # paste the three values + your WhatsApp number
npm run seed                 # creates demo@raha-demo.in with realistic data
npm run dev                  # verify the core loop locally
npx playwright install chromium && npx playwright test   # e2e on the core loop
```

## 3. Vercel (~5 min)

1. Push the repo to GitHub (`gh repo create raha --private --source=. --push` or via UI).
2. [vercel.com/new](https://vercel.com/new) → import the repo. Framework auto-detects Next.js.
3. Environment variables (all environments):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` *(server-side only — never referenced by client code)*
   - `NEXT_PUBLIC_SITE_URL` = your production URL
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = e.g. `919876543210`
   - `NEXT_PUBLIC_FOUNDING_SEATS_TAKEN` = `0` (bump as seats sell)
4. Deploy. Then set the Supabase Site URL (step 1.3) to the real domain.

## 4. Post-deploy checklist

- [ ] `/` loads, waitlist form writes a row (check Table Editor → waitlist)
- [ ] `/audit` full flow → row in audit_leads
- [ ] Magic-link sign-in works on the production domain
- [ ] Google sign-in works
- [ ] Core loop: add income → log FIRC → confirm match → invoice PDF → dashboard number
- [ ] Landing URLs pasted into: X-thread drafts ([AUDIT_LINK]), ClickUp tasks, Notion HQ

## Known gaps (accepted, documented)

- **Rate limiting**: public forms have honeypots + Supabase's own auth rate limits, but no per-IP throttle. Recommended when traffic arrives: Vercel Firewall rules (free tier) on `/` and `/audit` POSTs.
- **FX table**: monthly indicative reference rates bundled in `src/lib/fx/convert.ts` — update monthly; every entry stores the rate used and allows manual override.
