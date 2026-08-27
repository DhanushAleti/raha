# Deploy guide — Raha

Everything is built and verified except the two things only you can create: a Supabase project and a Vercel project. ~20 minutes total.

## 1. Supabase (~10 min)

1. [supabase.com/dashboard](https://supabase.com/dashboard) → New project. **Region: Mumbai (ap-south-1)** — keeps financial data in India (data-localization commitment on the landing page).
2. SQL Editor → paste and run each file from `supabase/migrations/` **in order**: `0001…`, `0002…`, `0003…`, `0004…`. All are idempotent (safe to re-run).
3. Authentication → Providers → enable **Google** (needs a Google OAuth client — Supabase docs walk through it) and keep **Email** on. Authentication → URL Configuration → set Site URL to your production URL and add `https://YOUR-DOMAIN/auth/confirm` + `/auth/callback` to redirect URLs.
4. Project Settings → API → copy: Project URL, `anon` key, `service_role` key.
5. **Authentication → Email Templates → Magic Link.** The token must sit in the URL *fragment*, not the query string. The link line has to read:

   ```
   <a href="{{ .SiteURL }}/auth/confirm#token_hash={{ .TokenHash }}&type=email">Sign in</a>
   ```

   The only character that matters is `#` where a `?` would normally go.

   **Why:** Gmail and corporate mail filters pre-fetch links to scan them for malware. Magic-link tokens are single-use, so that automated fetch consumes the token and the real recipient lands on "link expired or was already used" — every time. Everything after `#` is never sent to a server, so a scanner physically cannot see or burn the token; only JavaScript in a real browser can read it. `/auth/confirm` is a client page that verifies it there.

   Do the same for the **Confirm signup** template if you use it.

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
   - `NEXT_PUBLIC_UPI_ID` = the VPA that collects the ₹2,000 diagnostic, e.g.
     `yourname@okhdfcbank`. **Unset means nobody can pay** — every pay button
     silently falls back to WhatsApp, which is the state the site was in until
     2026-08-27. Set this before sending any outreach.
   - `NEXT_PUBLIC_UPI_PAYEE_NAME` = name shown in the payer's UPI app (default `Raha`)
   - ~~`NEXT_PUBLIC_FOUNDING_SEATS_TAKEN`~~ — no longer read. The ₹20,000 founding
     seat and its counter were removed from the landing page (`docs/PAINKILLER_AUDIT.md`);
     the variable is inert and can be deleted from Vercel.
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
