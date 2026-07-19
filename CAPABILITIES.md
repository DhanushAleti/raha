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
