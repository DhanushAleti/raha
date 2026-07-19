# CAPABILITIES.md — connector status (verified 2026-07-19)

| Connector | Status | Notes |
|---|---|---|
| Gmail | ✅ live | drafts-only policy for this project; never auto-send |
| Google Calendar | ✅ live | primary `aletidhanush9999@gmail.com`, TZ Asia/Kolkata |
| Google Drive | ✅ live | read/write; handoff folder in Stage 4 |
| Notion | ✅ live | personal workspace, no teamspaces — Raha HQ goes to private pages |
| ClickUp | ✅ live | workspace `90161706212`, space "Team Space" `90167492475` |
| Slack | ⚠️ connected, empty | no channels found; skipped per mission (no stage benefits) |
| Canva | ✅ live | no brand kits; skipped unless a stage benefits |
| Figma | ✅ live | starter plan, **View seat** — cannot edit designs; skipped |

Fallback rule: if any connector dies mid-session, fall back to local files under `docs/` silently and note it here.

**Fallbacks used:**
- Drive handoff: repo **zip upload skipped** (340KB binary exceeds what the connector call can sensibly carry). Uploaded START-HERE, FINAL, DEPLOY, creator-guide, outreach-kit instead; durable code copy = `git push` to GitHub (step 3.1 of DEPLOY.md). Zip also at the session scratchpad if needed.
- Stage 3 review agents: code/security/database reviewer subagents died on a session limit; reviews were done inline instead (findings + fixes logged in DECISIONS.md #13).
