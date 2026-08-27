#!/usr/bin/env python3
"""Find Indians with foreign income who have already said the problem out loud.

Two modes.

  --seed     Load the 15 threads already researched in docs/outreach/ACUTE_PAIN_TARGETS.md
             into research/pipeline.db. Offline. Run this first, today.

  --search   Query Reddit's public JSON search for fresh candidates across the
             subs where this problem gets typed, score them, and (with --add)
             track the ones worth a public answer.

The signal being hunted is *self-declared* pain, not inferred pain. Per
research/decision.md this is the whole channel: people who described the product
before they had heard of it. Per docs/outreach/ACUTE_PAIN_TARGETS.md, answer in
public FIRST and only DM afterwards -- a DM from an empty account reads as spam
and gets reported, which costs the channel permanently.

Stdlib only.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pipeline import connect, now  # noqa: E402

UA = "raha-prospect-finder/1.0 by /u/rahatax"

# Reddit killed anonymous .json search in 2024 -- www.reddit.com returns 403 and
# old.reddit.com redirects to a login wall. Verified 2026-08-27. The only
# supported read path is the official OAuth API, which takes two free minutes:
#
#   1. https://www.reddit.com/prefs/apps -> "create another app..."
#   2. type: script.  redirect uri: http://localhost:8080  (unused, but required)
#   3. export REDDIT_CLIENT_ID=...  REDDIT_CLIENT_SECRET=...
#
# No approval, no cost, no rate-limit tier to apply for. Until those two vars
# exist, --search says so and exits; --seed still works fully offline and holds
# more queue than the first week needs.
TOKEN_URL = "https://www.reddit.com/api/v1/access_token"
API = "https://oauth.reddit.com"

SUBREDDITS = [
    "IndiaTax",          # the primary room
    "developersIndia",   # freelancers with US clients
    "IndianFreelancers",
    "india_tax",
    "IndiaInvestments",
    "IndiaStartups",
    "SaaS",              # Indian founders show up in FIRA threads here
]

QUERIES = [
    "FIRC", "FIRA", "eFIRC", "LUT export", "letter of undertaking GST",
    "foreign inward remittance", "export of services GST",
    "44ADA foreign client", "AdSense GST", "Patreon GST",
    "Wise GST export", "Stripe Atlas India GST", "Payoneer FIRC",
]

# --- scoring -----------------------------------------------------------------
HIRE = re.compile(r"\b(looking for|need(?:ed)?|recommend|hire|hiring|expert|help with|anyone know)\b", re.I)
CORE = re.compile(r"\b(firc|fira|efirc|efira|lut|letter of undertaking|zero.?rated|export of service)\b", re.I)
RAIL = re.compile(r"\b(wise|transferwise|paypal|stripe|payoneer|skydo|karbon|winvesta|adsense|patreon|upwork|fiverr|substack|gumroad)\b", re.I)
BROKE = re.compile(r"\b(filed .{0,20}wrong|notice|scrutin|penalt|exempt instead|already (?:filed|paid)|demand)\b", re.I)
AMOUNT = re.compile(r"(\d+(?:\.\d+)?)\s*(l(?:akh|akhs|acs)?|cr(?:ore)?)\b", re.I)

# The already-researched queue from ACUTE_PAIN_TARGETS.md. Tier 1 = they asked
# to hire someone for exactly this scope, in public.
SEED = [
    (1, "1twhv6x", "looking_for_someone_to_handle_international",
     "Looking for someone to handle international payments via 44ADA - FIRC, LUT, GST", 20,
     "Your exact scope, requested verbatim. 13 comments."),
    (1, "1ucomh7", "looking_for_an_expert_ca_for_llp_providing",
     "Expert CA for LLP with Software Export to US (GST, LUT, Compliance, FEMA)", 19,
     "Export services, needs LUT + compliance. 14 comments."),
    (1, "1tonm18", "looking_for_ca_recommendation_freelancer_usd",
     "CA recommendation: freelancer, USD foreign income, 44ADA", 18,
     "USD income, actively shopping. 32 comments."),
    (1, "1t164c1", "ca_recommendation_needed_freelancer_with_foreign",
     "CA recommendation needed: freelancer with foreign client, 44ADA, first-time filer", 18,
     "First-timer = highest confusion, highest need. 18 comments."),
    (1, "1u4k8hu", "looking_for_expert_guideca",
     "Looking for Expert Guide/CA", 16, "Actively shopping. 16 comments."),
    (2, "1ty8p0p", "freelancer_it_income_from_us_client_40l_is_gst",
     "Freelancer IT income from US client (~Rs 40L) - Is GST mandatory?", 17,
     "Rs 40L foreign income, dead centre of the band, asking the exact question."),
    (2, "1uoxcl2", "any_gst_tax_experts_here_adsense_and_patreon",
     "ANY GST TAX EXPERTS HERE? ADSENSE AND PATREON INCOME", 17,
     "Creator, AdSense + Patreon, SBI, no FIRC, considering quitting. ALREADY COMMENTED."),
    (2, "1u9mj3s", "need_second_opinion_on_44ada_gst_ca_advice",
     "Need Second Opinion on 44ADA, GST & CA Advice", 15,
     "42 comments - their CA's advice is being questioned. The wedge exactly."),
    (2, "1t56ysb", "indian_saas_founders_using_dodo_payments_or_other",
     "Indian SaaS Founders using Dodo Payments - Are you getting FIRAs for 0% GST?", 16,
     "Whole thread of SaaS founders on the FIRA question."),
    (2, "1tpstcl", "best_bankcurrent_account_setup_for_receiving",
     "Best bank/current account for foreign consulting income under GST + LUT?", 14,
     "22 comments, all people with foreign income."),
    (3, "1q0dtxv", "why_does_requesting_firc_from_bank_feel_like",
     "Why does requesting FIRC from bank feel like pulling teeth", 12,
     "Evergreen. Lead the answer with the 2016/FIRA correction."),
    (3, "1no95yu", "struggling_to_get_firc_issued",
     "Struggling to get FIRC issued", 12, "Evergreen process complaint."),
    (3, "1nv02c6", "which_is_the_best_bank_to_get_foreign_paymentsfirc",
     "Which is the best bank to get foreign payments/FIRC", 12, "32 comments."),
    (3, "1upv98q", "how_can_i_get_efirafirc_for_payments_received",
     "How can I get eFIRA/FIRC for payments received since 2022", 14,
     "BACKFILL - the case no rail solves by definition."),
    (3, "1o0hvit", "i_filed_gst_as_exempt_instead_of_export_for",
     "I filed GST as Exempt instead of Export - what now?", 15,
     "Already made the mistake Raha prevents. Highest-empathy answer available."),
]


def score(title: str, selftext: str, num_comments: int, age_days: float) -> tuple[int, list[str]]:
    text = f"{title}\n{selftext}"
    pts, why = 0, []
    if HIRE.search(title):
        pts += 4; why.append("asking to hire")
    if CORE.search(text):
        pts += 4; why.append("FIRC/FIRA/LUT named")
    if RAIL.search(text):
        pts += 2; why.append("names a rail")
    if BROKE.search(text):
        pts += 3; why.append("already went wrong")
    m = AMOUNT.search(text)
    if m:
        val = float(m.group(1)) * (100 if m.group(2).lower().startswith("cr") else 1)
        if val >= 20:
            pts += 3; why.append(f"~Rs {m.group(0)} stated")
    pts += min(num_comments // 10, 3)
    if age_days > 180:
        pts -= 3; why.append("stale (>6mo)")
    elif age_days < 14:
        pts += 2; why.append("live (<2wk)")
    return pts, why


def _ssl_context() -> ssl.SSLContext:
    """python.org builds on macOS ship with no root certificates until you run
    Install Certificates.command, so a plain urlopen dies with
    CERTIFICATE_VERIFY_FAILED. Fall through certifi, then the system bundle,
    then the default -- never disable verification."""
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        pass
    for bundle in ("/etc/ssl/cert.pem", "/usr/local/etc/openssl/cert.pem"):
        if Path(bundle).exists():
            try:
                return ssl.create_default_context(cafile=bundle)
            except Exception:
                continue
    return ssl.create_default_context()


_SSL = _ssl_context()


def get_token() -> str | None:
    """App-only OAuth. Reddit's documented client_credentials grant for scripts."""
    cid = os.environ.get("REDDIT_CLIENT_ID")
    secret = os.environ.get("REDDIT_CLIENT_SECRET")
    if not (cid and secret):
        return None
    basic = base64.b64encode(f"{cid}:{secret}".encode()).decode()
    req = urllib.request.Request(
        TOKEN_URL,
        data=urllib.parse.urlencode({"grant_type": "client_credentials"}).encode(),
        headers={"Authorization": f"Basic {basic}", "User-Agent": UA},
        method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20, context=_SSL) as r:
            return json.loads(r.read().decode()).get("access_token")
    except urllib.error.HTTPError as e:
        print(f"  token request failed: HTTP {e.code}", file=sys.stderr)
        print("  Check REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET, and that the app type", file=sys.stderr)
        print("  at reddit.com/prefs/apps is 'script'.", file=sys.stderr)
        return None
    except Exception as e:  # noqa: BLE001 - never let auth kill the seeded path
        print(f"  token request failed: {type(e).__name__}: {e}", file=sys.stderr)
        return None


def fetch(url: str, token: str) -> dict | None:
    req = urllib.request.Request(url, headers={
        "User-Agent": UA, "Accept": "application/json",
        "Authorization": f"bearer {token}"})
    try:
        with urllib.request.urlopen(req, timeout=20, context=_SSL) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code} on {url.split('?')[0]}", file=sys.stderr)
        if e.code == 429:
            print("  Rate-limited. Raise --delay and re-run.", file=sys.stderr)
        elif e.code in (401, 403):
            print("  Token rejected or expired. Re-run; tokens last an hour.", file=sys.stderr)
        return None
    except urllib.error.URLError as e:
        print(f"  URLError: {e}", file=sys.stderr)
        if "CERTIFICATE_VERIFY_FAILED" in str(e):
            print("  No root certificates. Run once:", file=sys.stderr)
            print("    /Applications/Python\\ 3.13/Install\\ Certificates.command", file=sys.stderr)
            print("  or:  python3 -m pip install --user certifi", file=sys.stderr)
        return None
    except (TimeoutError, json.JSONDecodeError) as e:
        print(f"  {type(e).__name__}: {e}", file=sys.stderr)
        return None


def cmd_seed(conn) -> int:
    added = skipped = 0
    for tier, tid, slug, title, sc, note in SEED:
        url = f"https://www.reddit.com/r/IndiaTax/comments/{tid}/{slug}/"
        if conn.execute("SELECT 1 FROM prospects WHERE url=?", (url,)).fetchone():
            skipped += 1
            continue
        conn.execute(
            "INSERT INTO prospects (handle,url,title,tier,source,rail,score,notes,created_at)"
            " VALUES (?,?,?,?,?,?,?,?,?)",
            (f"OP:{tid}", url, title, tier, f"reddit_tier{tier}", "unknown", sc, note, now()))
        added += 1
    conn.commit()
    print(f"seeded {added} threads ({skipped} already tracked)")
    print("\nThe rules, from ACUTE_PAIN_TARGETS.md — breaking them costs the channel:")
    print("  1. Comment publicly on tier 2 and 3 first. Genuine answers. No mention of Raha.")
    print("  2. Only DM tier 1 once your profile has real answers on it.")
    print("  3. Tier 1 threads are 1-3 months old. Some are solved. Ask anyway — 'no, I found")
    print("     someone' tells you who you are losing to, which is worth the message on its own.")
    print("\nNext:  python3 scripts/pipeline.py next")
    return 0


def cmd_search(conn, a) -> int:
    token = get_token()
    if not token:
        print("\n--search needs Reddit API credentials. Anonymous .json search has been", file=sys.stderr)
        print("blocked since 2024 (403 from www, login wall on old). Two free minutes:", file=sys.stderr)
        print("\n  1. https://www.reddit.com/prefs/apps  ->  create another app...", file=sys.stderr)
        print("  2. type: script    redirect uri: http://localhost:8080", file=sys.stderr)
        print("  3. export REDDIT_CLIENT_ID=xxx REDDIT_CLIENT_SECRET=yyy", file=sys.stderr)
        print("\nDay 1 is not blocked by this. --seed loaded 15 researched threads, which is", file=sys.stderr)
        print("more queue than week 1 needs. The manual fallback costs the same 20 minutes:", file=sys.stderr)
        print("search these terms in the Reddit UI while logged in, then `pipeline.py add`", file=sys.stderr)
        print("anything with real intent:\n", file=sys.stderr)
        for q in QUERIES:
            print(f"  https://www.reddit.com/r/IndiaTax/search/?q={urllib.parse.quote(q)}"
                  f"&restrict_sr=1&sort=new", file=sys.stderr)
        return 1

    seen_urls = {r[0] for r in conn.execute("SELECT url FROM prospects WHERE url IS NOT NULL")}
    found: dict[str, dict] = {}
    blocked = False

    for sub in (a.subs or SUBREDDITS):
        for q in (a.queries or QUERIES):
            url = (f"https://www.reddit.com/r/{sub}/search.json?"
                   + urllib.parse.urlencode({"q": q, "restrict_sr": 1, "sort": "new",
                                             "limit": 50, "t": a.window}))
            data = fetch(url.replace("https://www.reddit.com", API), token)
            time.sleep(a.delay)
            if data is None:
                blocked = True
                continue
            for child in data.get("data", {}).get("children", []):
                d = child.get("data", {})
                permalink = "https://www.reddit.com" + d.get("permalink", "")
                if not d.get("permalink") or permalink in seen_urls or permalink in found:
                    continue
                age = (datetime.now(timezone.utc)
                       - datetime.fromtimestamp(d.get("created_utc", 0), timezone.utc)).days
                pts, why = score(d.get("title", ""), d.get("selftext", "") or "",
                                 d.get("num_comments", 0), age)
                if pts < a.min_score:
                    continue
                found[permalink] = {
                    "url": permalink, "title": d.get("title", "")[:160],
                    "handle": "u/" + (d.get("author") or "[deleted]"),
                    "score": pts, "why": why, "age": age,
                    "comments": d.get("num_comments", 0), "sub": sub,
                }

    if not found:
        if blocked:
            print("\nNo results — every request was blocked. Use the seeded queue today.")
            return 1
        print("\nNo new threads above the score threshold. Lower it with --min-score, widen")
        print("--window, or add subs with --subs. If this stays empty across a whole week the")
        print("room is thin — that is assumption 1 in research/decision.md failing on day 1.")
        return 0

    ranked = sorted(found.values(), key=lambda x: -x["score"])
    print(f"\n{len(ranked)} new candidate threads\n")
    for f in ranked[: a.limit]:
        tier = 1 if f["score"] >= 12 else (2 if f["score"] >= 8 else 3)
        print(f"[{f['score']:>2}] t{tier}  r/{f['sub']}  {f['handle']}  {f['age']}d  {f['comments']}c")
        print(f"      {f['title']}")
        print(f"      {', '.join(f['why']) or 'keyword match only'}")
        print(f"      {f['url']}")
        if a.add:
            conn.execute(
                "INSERT OR IGNORE INTO prospects"
                " (handle,url,title,tier,source,rail,score,notes,created_at)"
                " VALUES (?,?,?,?,?,?,?,?,?)",
                (f["handle"], f["url"], f["title"], tier, "reddit_search", "unknown",
                 f["score"], ", ".join(f["why"]), now()))
        print()
    if a.add:
        conn.commit()
        print(f"tracked {min(len(ranked), a.limit)} — run: python3 scripts/pipeline.py next")
    else:
        print("Nothing tracked. Re-run with --add to load these into the pipeline.")

    fresh = sum(1 for f in ranked if f["age"] <= 90)
    print(f"\nASSUMPTION 1 CHECK: {fresh} distinct threads from the last 90 days.")
    if fresh < 40:
        print("  Under 40. Widen before day 3 — add subs (--subs) and try Indie Hackers,")
        print("  r/juststart, and the Indian freelancer Discords. Do not wait until day 14")
        print("  to find out the room is too small.")
    else:
        print("  Over 40. The room sustains the weekly floor. Proceed.")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--seed", action="store_true", help="load the 15 researched threads (offline)")
    p.add_argument("--search", action="store_true", help="query Reddit for fresh candidates")
    p.add_argument("--add", action="store_true", help="track what --search finds")
    p.add_argument("--min-score", type=int, default=6)
    p.add_argument("--limit", type=int, default=30)
    p.add_argument("--window", default="year", choices=["day", "week", "month", "year", "all"])
    p.add_argument("--delay", type=float, default=2.0, help="seconds between requests")
    p.add_argument("--subs", nargs="*")
    p.add_argument("--queries", nargs="*")
    a = p.parse_args()

    if not (a.seed or a.search):
        p.error("pick --seed and/or --search")

    with connect() as conn:
        rc = 0
        if a.seed:
            rc |= cmd_seed(conn)
        if a.search:
            rc |= cmd_search(conn, a)
    return rc


if __name__ == "__main__":
    sys.exit(main())
