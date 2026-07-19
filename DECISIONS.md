# DECISIONS.md — Raha build log

Running log of autonomous decisions. Format: date · decision · rationale.

## 2026-07-19

1. **Repo location: `~/Desktop/obsedian/raha` as its own git repo.**
   The session cwd is the Obsidian vault. A standalone nested repo matches the existing pattern (`obsedian/ecc` is already a nested repo) and keeps vault history clean.

2. **PRD copied verbatim to `docs/raha_prd.md`; treated as ground truth.**
   Where later reviews conflict with the PRD, the PRD wins; disagreements get noted, scope is not relitigated.

3. **Stage order followed as given:** Stage 0 setup/planning → Stage 1 revenue assets → Stage 2 MVP → Stage 3 quality gates → Stage 4 ship. No approval waits between phases; stops only for API secrets / deploy credentials / payments.

4. **Tax-figure policy (global):** every computed number rendered in any UI or doc carries "estimate — verify with your CA before filing." No automated-filing claims anywhere. (PRD §10.)

5. **Planning skills run in auto-decide mode.** /office-hours, /autoplan, /spec, /plan-prd are interactive (AskUserQuestion stops at every phase); session is autonomous by operator order, so their frameworks were applied with auto-decisions and the deliverables written directly: `docs/PLAN.md`, `docs/SPEC.md`, `docs/TASKS.md`. /project-init: ECC already globally installed + repo pre-scaffold → minimal manual onboarding (project `CLAUDE.md`).

6. **FX rates:** bundled RBI reference-rate table (USD/EUR/GBP, FY26-27) + editable manual override; `rate_used` + `rate_source` stored per row. No external FX API dependency.

7. **FIRC matching is suggest-then-confirm** (±2% amount, +45/−7d window), never auto-confirmed. Partial allocation via `firc_matches` join table — one table beyond the mission's list, required for one-FIRC-covers-many-entries.

8. **Advance tax = new-regime slabs only**, annualized YTD, minus recorded TDS; 44ADA presumptive flagged as "ask your CA," not computed. Conservative by design.

9. **No payments in-product.** Founding-seat conversion routes to WhatsApp/email (Phase 0 concierge; payments are a hard stop per operating rules).

10. **Slack/Canva/Figma skipped** (Slack workspace empty; Figma seat is view-only; no stage benefits). See CAPABILITIES.md.
