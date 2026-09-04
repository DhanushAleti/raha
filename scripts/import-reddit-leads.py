#!/usr/bin/env python3
"""Score scraped Reddit posts with find-prospects.py's model and load the winners
into research/pipeline.db.

The Reddit JSON search API has been closed to anonymous callers since 2024, which
is why find-prospects.py --search needs a REDDIT_CLIENT_ID nobody has registered.
This reads the same shape of data from a Monid/Apify scrape instead, so the queue
can be extended without the credential.

  python3 scripts/import-reddit-leads.py <scrape.json> [--add] [--min-score 6]

Without --add it prints the ranked list and writes nothing.
"""
from __future__ import annotations
import argparse, json, re, sqlite3, sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB = ROOT / "research" / "pipeline.db"

# Identical to scripts/find-prospects.py -- scores stay comparable across sources.
HIRE = re.compile(r"\b(looking for|need(?:ed)?|recommend|hire|hiring|expert|help with|anyone know)\b", re.I)
CORE = re.compile(r"\b(firc|fira|efirc|efira|lut|letter of undertaking|zero.?rated|export of service)\b", re.I)
RAIL = re.compile(r"\b(wise|transferwise|paypal|stripe|payoneer|skydo|karbon|winvesta|adsense|patreon|upwork|fiverr|substack|gumroad)\b", re.I)
BROKE = re.compile(r"\b(filed .{0,20}wrong|notice|scrutin|penalt|exempt instead|already (?:filed|paid)|demand)\b", re.I)
AMOUNT = re.compile(r"(\d+(?:\.\d+)?)\s*(l(?:akh|akhs|acs)?|cr(?:ore)?)\b", re.I)

# A post can name a rail that already issues a FIRA for free. Pitching those is
# pitching a free feature -- decision.md correction 2.
SOLVED_RAIL = re.compile(r"\b(skydo|karbon|winvesta|payglocal|payoneer)\b", re.I)


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


def _first(d: dict, *keys, default=None):
    for k in keys:
        v = d.get(k)
        if v not in (None, ""):
            return v
    return default


def parse_items(raw) -> list[dict]:
    """Apify emits a flat list of mixed post/comment/community items."""
    if isinstance(raw, dict):
        for k in ("items", "output", "data", "results"):
            if isinstance(raw.get(k), list):
                raw = raw[k]; break
        else:
            raw = [raw]
    out = []
    for it in raw:
        if not isinstance(it, dict):
            continue
        url = _first(it, "url", "link", "postUrl", default="")
        if "/comments/" not in str(url):
            continue                      # posts only
        title = _first(it, "title", "postTitle", default="")
        if not title:
            continue
        out.append({
            "title": title,
            "body": _first(it, "body", "selftext", "text", "description", default="") or "",
            "url": url.split("?")[0],
            "sub": _first(it, "sub", "communityName", "subreddit", "parsedCommunityName", default="") or "",
            "author": _first(it, "username", "author", "userName", default="") or "",
            "comments": int(_first(it, "numberOfComments", "numComments", "commentCount", default=0) or 0),
            "created": _first(it, "createdAt", "created", "date", "postedAt", default=""),
        })
    return out


def age_days(created: str) -> float:
    if not created:
        return 60.0                        # unknown: neither bonus nor stale penalty
    s = str(created).replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(s)
    except ValueError:
        try:
            dt = datetime.fromtimestamp(float(created), tz=timezone.utc)
        except Exception:
            return 60.0
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return (datetime.now(timezone.utc) - dt).total_seconds() / 86400


INDIA = re.compile(r"\b(india|indian|inr|rupee|gst|itr|44ada|firc|fira|lut|rbi|sbi|hdfc|icici|axis)\b", re.I)

# The wedge is foreign-currency income specifically. A post about domestic GST,
# salary tax or an unrelated topic scores on the shared keywords but cannot buy
# an Evidence Check, so require an explicit cross-border signal.
FOREIGN = re.compile(
    r"\b(foreign|export|overseas|abroad|international|inward remittance|usd|dollar|eur|gbp|"
    r"us client|uk client|non.?resident|firc|fira|efirc|efira|lut|zero.?rated|"
    r"wise|transferwise|paypal|stripe|payoneer|skydo|karbon|winvesta|paddle|deel|gusto|"
    r"adsense|patreon|upwork|fiverr|substack|gumroad|mercor)\b", re.I)

# Subreddits that share vocabulary but not the buyer.
OFF_TOPIC_SUB = re.compile(
    r"^(dentalschoolindia|UpdateINDIA|SmallBusinessCanada|IndianStockMarket|"
    r"stocks|CanadaFinance|AusFinance|UKPersonalFinance)$", re.I)

# Guides, explainers and news digests: the author is not the buyer.
NOT_A_BUYER = re.compile(
    r"\b(comprehensive guide|complete guide|ultimate guide|here.s what|daybook|"
    r"how and why you need|megathread|weekly thread|AMA\b|i spent \d+ years)\b", re.I)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("scrape", type=Path)
    ap.add_argument("--add", action="store_true")
    ap.add_argument("--min-score", type=int, default=6)
    ap.add_argument("--limit", type=int, default=50)
    a = ap.parse_args()

    raw = json.loads(a.scrape.read_text())
    items = parse_items(raw)

    con = sqlite3.connect(DB)
    known_urls = {u for (u,) in con.execute("select url from prospects where url is not null")}
    known_ids = {u.rstrip("/").split("/comments/")[1].split("/")[0]
                 for u in known_urls if "/comments/" in u}

    seen, ranked = set(), []
    for it in items:
        pid = it["url"].rstrip("/").split("/comments/")[1].split("/")[0] if "/comments/" in it["url"] else it["url"]
        if pid in seen:
            continue
        seen.add(pid)
        blob = f"{it['title']}\n{it['body']}\n{it['sub']}"
        if not INDIA.search(blob):
            continue                       # the wedge is India-resident only
        if not FOREIGN.search(blob):
            continue                       # ...earning foreign currency, specifically
        if OFF_TOPIC_SUB.match(it["sub"] or ""):
            continue
        if NOT_A_BUYER.search(it["title"]):
            continue
        pts, why = score(it["title"], it["body"], it["comments"], age_days(it["created"]))
        if SOLVED_RAIL.search(blob) and not BROKE.search(blob):
            pts -= 4; why.append("already on a FIRA-issuing rail")
        if pid in known_ids:
            why.append("ALREADY IN PIPELINE")
        it.update(pid=pid, score=pts, why=why, dupe=pid in known_ids)
        if pts >= a.min_score:
            ranked.append(it)

    ranked.sort(key=lambda x: -x["score"])
    ranked = ranked[: a.limit]

    print(f"{len(items)} posts scraped -> {len(seen)} unique -> {len(ranked)} scored >= {a.min_score}\n")
    for i, f in enumerate(ranked, 1):
        tier = 1 if f["score"] >= 12 else (2 if f["score"] >= 8 else 3)
        flag = "  [DUPE]" if f["dupe"] else ""
        print(f"{i:>3}. [{f['score']:>2}] t{tier} r/{f['sub']} u/{f['author']} {f['comments']}c{flag}")
        print(f"     {f['title'][:110]}")
        print(f"     {f['url']}")
        print(f"     why: {', '.join(f['why'])}\n")

    if a.add:
        now = datetime.now(timezone.utc).isoformat(timespec="seconds")
        added = 0
        for f in ranked:
            if f["dupe"]:
                continue
            tier = 1 if f["score"] >= 12 else (2 if f["score"] >= 8 else 3)
            try:
                con.execute(
                    "INSERT INTO prospects (handle,url,title,tier,source,rail,score,notes,created_at)"
                    " VALUES (?,?,?,?,?,?,?,?,?)",
                    (f"OP:{f['pid']}", f["url"], f["title"][:200], tier,
                     f"reddit_scrape_t{tier}", "unknown", f["score"],
                     ", ".join(f["why"])[:300], now))
                added += 1
            except sqlite3.IntegrityError:
                pass
        con.commit()
        print(f"added {added} new prospects to {DB}")
    else:
        print("dry run -- pass --add to write to pipeline.db")
    return 0


if __name__ == "__main__":
    sys.exit(main())
