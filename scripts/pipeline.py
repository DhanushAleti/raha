#!/usr/bin/env python3
"""Raha outreach pipeline — the tracker the kill criteria are measured from.

Everything in research/decision.md is a number this script prints. If a touch
isn't logged here it didn't happen, and the day-14 / day-21 / day-30 decisions
get made on vibes instead of data — which is how the last 28 emails were read.

    python3 scripts/pipeline.py add --handle u/someone --url ... --tier 1
    python3 scripts/pipeline.py log 3 dm_sent --note "no link, per YC rules"
    python3 scripts/pipeline.py rail 3 aggregator
    python3 scripts/pipeline.py next
    python3 scripts/pipeline.py stats

Stdlib only. No install, no network.
"""

from __future__ import annotations

import argparse
import sqlite3
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "research" / "pipeline.db"

# --- the 30-day window from research/decision.md -----------------------------
START = date(2026, 8, 27)
DAY_14 = START + timedelta(days=14)
DAY_21 = START + timedelta(days=21)
DAY_30 = START + timedelta(days=30)

WEEKLY_ANSWER_FLOOR = 12
WEEKLY_DM_FLOOR = 5

# --- fixed vocabularies ------------------------------------------------------
# Deliberately closed sets. A typo'd event silently breaks a kill criterion.
EVENTS = {
    "answered_public": "substantive public answer, no mention of Raha",
    "dm_sent": "first direct message",
    "followup": "follow-up touch (YC: 3-4 over two weeks)",
    "replied": "they replied at all",
    "conversation": "it went past one message — two-way",
    "asked_2k": "the Rs 2,000 diagnostic was explicitly asked for",
    "paid_2k": "they paid",
    "paid_20k": "they took the annual seat",
    "dead": "closed out — no, wrong fit, or gone quiet after 4 touches",
    "note": "anything else worth remembering",
}

# The qualifier from WEDGE_REALITY_CHECK.md. This decides whether there is
# anything to sell at all, so it is a first-class column, not a note.
RAILS = {
    "bank": "direct bank transfer (AdSense to SBI etc) — manual chase, no automation",
    "aggregator": "Wise / PayPal / Stripe — STRUCTURALLY cannot get a FIRA. Best target.",
    "rail": "Skydo / Karbon / Payoneer / Winvesta — FIRA already free and automatic. Deprioritise.",
    "mixed": "more than one of the above — reconciliation problem, nobody solves this",
    "unknown": "not asked yet",
}

SOURCES = ("reddit_tier1", "reddit_tier2", "reddit_tier3", "reddit_search",
           "warm_intro", "referral", "inbound_audit", "other")

SCHEMA = """
CREATE TABLE IF NOT EXISTS prospects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    handle      TEXT NOT NULL,
    url         TEXT UNIQUE,
    title       TEXT,
    tier        INTEGER,
    source      TEXT NOT NULL DEFAULT 'other',
    rail        TEXT NOT NULL DEFAULT 'unknown',
    income_band TEXT,
    score       INTEGER NOT NULL DEFAULT 0,
    notes       TEXT,
    created_at  TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL REFERENCES prospects(id),
    event       TEXT NOT NULL,
    note        TEXT,
    at          TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_prospect ON events(prospect_id);
CREATE INDEX IF NOT EXISTS idx_events_event ON events(event);
"""


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA)
    return conn


def now() -> str:
    return datetime.now().isoformat(timespec="seconds")


def week_bounds(when: date) -> tuple[date, date]:
    """Weeks run from START, not from Monday — the floor is per plan-week."""
    offset = (when - START).days
    if offset < 0:
        offset = 0
    wk = offset // 7
    begin = START + timedelta(days=wk * 7)
    return begin, begin + timedelta(days=6)


# --- commands ----------------------------------------------------------------

def cmd_add(conn: sqlite3.Connection, a: argparse.Namespace) -> int:
    if a.source not in SOURCES:
        print(f"unknown source {a.source!r}; pick one of {', '.join(SOURCES)}", file=sys.stderr)
        return 2
    if a.rail not in RAILS:
        print(f"unknown rail {a.rail!r}; pick one of {', '.join(RAILS)}", file=sys.stderr)
        return 2
    try:
        cur = conn.execute(
            "INSERT INTO prospects (handle,url,title,tier,source,rail,income_band,score,notes,created_at)"
            " VALUES (?,?,?,?,?,?,?,?,?,?)",
            (a.handle, a.url, a.title, a.tier, a.source, a.rail,
             a.income, a.score, a.note, now()),
        )
    except sqlite3.IntegrityError:
        row = conn.execute("SELECT id,handle FROM prospects WHERE url=?", (a.url,)).fetchone()
        print(f"already tracked as #{row['id']} ({row['handle']}) — not adding a duplicate")
        return 0
    conn.commit()
    print(f"#{cur.lastrowid}  {a.handle}  tier {a.tier}  {a.source}")
    return 0


def cmd_log(conn: sqlite3.Connection, a: argparse.Namespace) -> int:
    if a.event not in EVENTS:
        print("unknown event. one of:", file=sys.stderr)
        for k, v in EVENTS.items():
            print(f"  {k:16} {v}", file=sys.stderr)
        return 2
    row = conn.execute("SELECT handle FROM prospects WHERE id=?", (a.prospect_id,)).fetchone()
    if row is None:
        print(f"no prospect #{a.prospect_id}", file=sys.stderr)
        return 2
    conn.execute("INSERT INTO events (prospect_id,event,note,at) VALUES (?,?,?,?)",
                 (a.prospect_id, a.event, a.note, now()))
    conn.commit()
    print(f"#{a.prospect_id} {row['handle']}: {a.event}")
    if a.event == "replied":
        print("  -> if it goes past one message, log `conversation` too. Day 14 counts conversations.")
    if a.event == "conversation":
        print("  -> now ask for the Rs 2,000. Log `asked_2k` when you actually ask.")
    return 0


def cmd_rail(conn: sqlite3.Connection, a: argparse.Namespace) -> int:
    if a.value not in RAILS:
        print("unknown rail. one of:", file=sys.stderr)
        for k, v in RAILS.items():
            print(f"  {k:12} {v}", file=sys.stderr)
        return 2
    conn.execute("UPDATE prospects SET rail=? WHERE id=?", (a.value, a.prospect_id))
    conn.commit()
    print(f"#{a.prospect_id} rail = {a.value}  ({RAILS[a.value]})")
    return 0


def _last_events(conn: sqlite3.Connection) -> dict[int, set[str]]:
    seen: dict[int, set[str]] = {}
    for r in conn.execute("SELECT prospect_id, event FROM events"):
        seen.setdefault(r["prospect_id"], set()).add(r["event"])
    return seen


def cmd_list(conn: sqlite3.Connection, a: argparse.Namespace) -> int:
    q = "SELECT * FROM prospects"
    params: list = []
    if a.tier:
        q += " WHERE tier=?"
        params.append(a.tier)
    q += " ORDER BY tier IS NULL, tier, score DESC, id"
    rows = conn.execute(q, params).fetchall()
    seen = _last_events(conn)
    shown = 0
    for r in rows:
        ev = seen.get(r["id"], set())
        if a.open and ("dead" in ev or "paid_2k" in ev):
            continue
        shown += 1
        state = ",".join(sorted(ev)) or "-"
        print(f"#{r['id']:<4} t{r['tier'] or '-'} {r['rail']:<10} {r['handle'][:24]:<24} {state}")
        if r["title"]:
            print(f"      {r['title'][:92]}")
    print(f"\n{shown} shown")
    return 0


def cmd_next(conn: sqlite3.Connection, a: argparse.Namespace) -> int:
    """What to work on, in the order research/decision.md says to work it."""
    seen = _last_events(conn)
    rows = conn.execute(
        "SELECT * FROM prospects ORDER BY tier IS NULL, tier, score DESC, id").fetchall()

    def bucket(r):
        ev = seen.get(r["id"], set())
        if "dead" in ev or "paid_2k" in ev:
            return None
        if "conversation" in ev and "asked_2k" not in ev:
            return "ASK for the Rs 2,000 — this is the day-21 criterion"
        if "replied" in ev and "conversation" not in ev:
            return "reply within 2 hours; ask the rail question"
        if "dm_sent" in ev and "replied" not in ev:
            return "follow up (YC: 3-4 touches over two weeks)"
        if "answered_public" in ev and "dm_sent" not in ev:
            return "DM — public answer exists, so the profile backs it up"
        return "answer their thread in public first — no Raha, no link"

    order = [
        "ASK for the Rs 2,000 — this is the day-21 criterion",
        "reply within 2 hours; ask the rail question",
        "DM — public answer exists, so the profile backs it up",
        "answer their thread in public first — no Raha, no link",
        "follow up (YC: 3-4 touches over two weeks)",
    ]
    groups: dict[str, list] = {k: [] for k in order}
    for r in rows:
        b = bucket(r)
        if b:
            groups[b].append(r)

    for k in order:
        items = groups[k]
        if not items:
            continue
        print(f"\n== {k} ({len(items)})")
        for r in items[: a.limit]:
            rail = "" if r["rail"] == "unknown" else f"  [{r['rail']}]"
            print(f"  #{r['id']:<4} t{r['tier'] or '-'} {r['handle'][:22]:<22}{rail}")
            if r["url"]:
                print(f"       {r['url']}")
    print()
    return 0


def cmd_stats(conn: sqlite3.Connection, a: argparse.Namespace) -> int:
    today = date.today()
    counts = {e: 0 for e in EVENTS}
    per_week: dict[int, dict[str, int]] = {}
    for r in conn.execute("SELECT event, at FROM events"):
        counts[r["event"]] = counts.get(r["event"], 0) + 1
        d = datetime.fromisoformat(r["at"]).date()
        wk = max(0, (d - START).days) // 7
        per_week.setdefault(wk, {}).setdefault(r["event"], 0)
        per_week[wk][r["event"]] += 1

    uniq = lambda ev: conn.execute(
        "SELECT COUNT(DISTINCT prospect_id) n FROM events WHERE event=?", (ev,)).fetchone()["n"]

    total = conn.execute("SELECT COUNT(*) n FROM prospects").fetchone()["n"]
    day = (today - START).days

    print(f"\nRaha pipeline — day {day} of 30   ({START} -> {DAY_30})")
    print(f"{total} prospects tracked\n")

    # --- weekly floor --------------------------------------------------------
    wk = max(0, day) // 7
    begin, end = week_bounds(today)
    w = per_week.get(wk, {})
    ans, dms = w.get("answered_public", 0), w.get("dm_sent", 0)
    print(f"WEEKLY FLOOR  week {wk + 1}  ({begin} -> {end})")
    print(f"  public answers  {ans:>3} / {WEEKLY_ANSWER_FLOOR}   {'PASS' if ans >= WEEKLY_ANSWER_FLOOR else 'BEHIND'}")
    print(f"  DMs sent        {dms:>3} / {WEEKLY_DM_FLOOR}   {'PASS' if dms >= WEEKLY_DM_FLOOR else 'BEHIND'}")
    print("  (missing the floor two weeks running is not a channel failure — it is a")
    print("   plan that was never run. Do not switch channel; cut scope elsewhere.)\n")

    # --- the three dated criteria -------------------------------------------
    a14, d14, c14 = counts["answered_public"], counts["dm_sent"], uniq("conversation")
    ok14 = a14 >= 24 and d14 >= 10 and c14 >= 3
    due14 = today >= DAY_14
    print(f"DAY 14  {DAY_14}   {'DUE' if due14 else f'in {(DAY_14 - today).days}d'}")
    print(f"  answers {a14}/24   DMs {d14}/10   two-way conversations {c14}/3   -> "
          f"{'PASS' if ok14 else 'FAIL'}")
    if due14 and not ok14:
        print("  ACTION: channel is wrong. Switch primary to the warm network for days 15-30.")

    asked = uniq("asked_2k")
    ok21 = asked >= 3
    due21 = today >= DAY_21
    print(f"\nDAY 21  {DAY_21}   {'DUE' if due21 else f'in {(DAY_21 - today).days}d'}")
    print(f"  people explicitly asked for Rs 2,000: {asked}/3   -> {'PASS' if ok21 else 'FAIL'}")
    if due21 and not ok21:
        print("  ACTION: the ask is missing, not the channel. DO NOT SWITCH.")
        print("          Ask on the next 5 conversations, no exceptions.")

    paid = uniq("paid_2k")
    ok30 = asked >= 5 and paid >= 1
    due30 = today >= DAY_30
    print(f"\nDAY 30  {DAY_30}   {'DUE' if due30 else f'in {(DAY_30 - today).days}d'}")
    print(f"  asks {asked}/5   paid {paid}/1   -> {'PASS' if ok30 else 'FAIL'}")
    if paid >= 1:
        print("  CHANNEL VALIDATED. Keep running it. Do not re-plan, do not write another")
        print("  strategy doc, do not rebuild the product. Go get the second one, and ask")
        print("  every conversation: 'who else do you know dealing with this?'")
    elif due30:
        print("  ACTION: price and offer are wrong, not the channel. The Rs 20,000 seat is dead.")
        print("          That is the pivot signal — and it is an answer, which is more than")
        print("          the previous 30 days produced.")

    # --- the qualifier -------------------------------------------------------
    print("\nRAIL MIX  (assumption 4 — checked at day 10, needs 10+ answers)")
    rails = conn.execute(
        "SELECT rail, COUNT(*) n FROM prospects GROUP BY rail ORDER BY n DESC").fetchall()
    known = sum(r["n"] for r in rails if r["rail"] != "unknown")
    for r in rails:
        print(f"  {r['rail']:<10} {r['n']:>3}   {RAILS[r['rail']]}")
    if known >= 10:
        already = next((r["n"] for r in rails if r["rail"] == "rail"), 0)
        if already / known > 0.5:
            print("\n  WARNING: most qualified prospects are already on a FIRA-issuing rail.")
            print("  The forward wedge is commoditised for this audience. Shift the target to")
            print("  backfill — 2+ years of history, which no rail solves by definition.")
    else:
        print(f"  ({known}/10 qualified — keep asking the rail question in every first reply)")

    print("\nFUNNEL (unique people)")
    for ev in ("answered_public", "dm_sent", "replied", "conversation", "asked_2k", "paid_2k", "paid_20k", "dead"):
        print(f"  {ev:<16} {uniq(ev):>3}")
    print()
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("add", help="track a prospect")
    s.add_argument("--handle", required=True, help="u/username, a name, or the thread OP")
    s.add_argument("--url")
    s.add_argument("--title")
    s.add_argument("--tier", type=int, choices=[1, 2, 3])
    s.add_argument("--source", default="other", help=" | ".join(SOURCES))
    s.add_argument("--rail", default="unknown", help=" | ".join(RAILS))
    s.add_argument("--income", help="e.g. 20L-50L")
    s.add_argument("--score", type=int, default=0)
    s.add_argument("--note")
    s.set_defaults(fn=cmd_add)

    s = sub.add_parser("log", help="log a touch")
    s.add_argument("prospect_id", type=int)
    s.add_argument("event", help=" | ".join(EVENTS))
    s.add_argument("--note")
    s.set_defaults(fn=cmd_log)

    s = sub.add_parser("rail", help="record how their money arrives — the qualifier")
    s.add_argument("prospect_id", type=int)
    s.add_argument("value", help=" | ".join(RAILS))
    s.set_defaults(fn=cmd_rail)

    s = sub.add_parser("list", help="list prospects")
    s.add_argument("--tier", type=int, choices=[1, 2, 3])
    s.add_argument("--open", action="store_true", help="hide dead and won")
    s.set_defaults(fn=cmd_list)

    s = sub.add_parser("next", help="what to work on now")
    s.add_argument("--limit", type=int, default=8)
    s.set_defaults(fn=cmd_next)

    s = sub.add_parser("stats", help="the kill criteria, with PASS/FAIL")
    s.set_defaults(fn=cmd_stats)

    a = p.parse_args()
    with connect() as conn:
        return a.fn(conn, a)


if __name__ == "__main__":
    sys.exit(main())
