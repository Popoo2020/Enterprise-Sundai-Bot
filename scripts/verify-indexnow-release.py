"""Wait for the exact public release before notifying IndexNow.

HTTP availability and protocol acceptance do not prove crawling or indexing.
No credentials are required: the IndexNow verification key is public by design.
"""
import concurrent.futures
import json
from pathlib import Path
import time
import urllib.parse
import urllib.request

ORIGIN = "https://sundaibot.com"
expected = json.loads(Path("site/discovery.json").read_text())
payload = json.loads(Path("/tmp/indexnow.json").read_text())
deadline = time.monotonic() + 360


def read_public(url):
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != "https" or parsed.netloc != "sundaibot.com":
        raise ValueError("Unexpected public release origin")
    request = urllib.request.Request(url, headers={"Cache-Control": "no-cache", "User-Agent": "SundAI-IndexNow-release-check"})
    with urllib.request.urlopen(request, timeout=12) as response:
        if response.status != 200:
            raise RuntimeError("Public release resource unavailable")
        return response.read().decode("utf-8")


def verify_page(url):
    if not url.startswith(ORIGIN + "/"):
        raise ValueError("Unexpected page origin")
    html = read_public(url + "?release=" + expected["contentDigest"])
    if 'content="seo-2026-10-13"' not in html or 'rel="canonical" href="' + url + '"' not in html:
        raise RuntimeError("Page is not the expected canonical release")


while time.monotonic() < deadline:
    try:
        current = json.loads(read_public(ORIGIN + "/discovery.json?release=" + expected["contentDigest"]))
        if current.get("contentDigest") != expected["contentDigest"]:
            raise RuntimeError("Waiting for current service and Q&A content")
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            list(pool.map(verify_page, expected["questionsAndAnswers"].values()))
        if read_public(payload["keyLocation"]).strip() != payload["key"]:
            raise RuntimeError("Public IndexNow key does not match")
        print("Public content digest, three canonical Q&A pages and IndexNow key verified. Notification may proceed.")
        break
    except (OSError, ValueError, RuntimeError) as error:
        print("Publication not yet verified:", type(error).__name__, flush=True)
        time.sleep(10)
else:
    raise SystemExit("Publication verification timed out. No IndexNow notification was sent.")
