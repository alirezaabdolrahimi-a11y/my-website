#!/usr/bin/env python3
"""Regression checks for NIAZ NET shared core and repaired site data."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import json
import re
import sys
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []

def check(ok, message):
    if not ok:
        ERRORS.append(message)

class PageAudit(HTMLParser):
    VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.scripts, self.styles = [], [], []
        self.refs, self.fragments, self.classes = [], [], []
        self.slide_sources = []
        self.stack, self.showcase_depth = [], 0
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if d.get("id"): self.ids.append(d["id"])
        if tag == "script" and d.get("src"): self.scripts.append(d["src"])
        if tag == "link" and "stylesheet" in (d.get("rel") or ""):
            self.styles.append(d.get("href", ""))
            if d.get("href"): self.refs.append(d["href"])
        if d.get("class"): self.classes.extend(d["class"].split())
        for key in ("src","poster","data-src","action"):
            if d.get(key): self.refs.append(d[key])
        if tag == "a" and d.get("href"):
            self.refs.append(d["href"])
            if d["href"].startswith("#"): self.fragments.append(d["href"][1:])
        is_showcase = tag in {"div","section"} and "hero-showcase" in (d.get("class") or "").split()
        if is_showcase: self.showcase_depth += 1
        if self.showcase_depth and tag == "img" and d.get("src"): self.slide_sources.append(d["src"])
        if tag not in self.VOID: self.stack.append((tag,is_showcase))
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0] == tag:
                removed = self.stack[i:]
                del self.stack[i:]
                self.showcase_depth -= sum(1 for _,root in removed if root)
                return

def local_target(page, raw):
    raw = raw.strip()
    if not raw or raw.startswith(("#","mailto:","tel:","javascript:","data:","blob:")): return None
    joined = urljoin("https://www.niaznet.net/" + page.relative_to(ROOT).as_posix(), raw)
    parsed = urlsplit(joined)
    if parsed.scheme not in ("http","https") or parsed.netloc not in ("www.niaznet.net","niaznet.net"): return None
    return ROOT / (unquote(parsed.path).lstrip("/") or "index.html")

pages = sorted(ROOT.rglob("*.html"))
check(len(pages) >= 84, f"Expected at least 84 HTML pages; found {len(pages)}")
page_data = {}
for page in pages:
    parser = PageAudit()
    try: parser.feed(page.read_text(encoding="utf-8"))
    except Exception as exc:
        ERRORS.append(f"HTML parse failed: {page.relative_to(ROOT)}: {exc}")
        continue
    rel = page.relative_to(ROOT).as_posix()
    page_data[rel] = parser
    for label, values in (("ID",parser.ids),("script",parser.scripts),("stylesheet",parser.styles)):
        normalized = values
        if label in ("script","stylesheet"):
            normalized = [urljoin("https://www.niaznet.net/"+rel,x) for x in values]
        duplicates = [x for x,n in Counter(normalized).items() if n > 1]
        check(not duplicates, f"Duplicate {label} in {rel}: {duplicates}")
    for raw in parser.refs:
        target = local_target(page,raw)
        if target is not None: check(target.exists(),f"Missing local reference in {rel}: {raw}")
    for fragment in parser.fragments:
        if fragment not in ("contact","home","niaz-contact-hub"):
            check(fragment in parser.ids,f"Broken same-page fragment in {rel}: #{fragment}")

check(not (ROOT/"newsletter.js").exists(),"Obsolete newsletter.js file still exists")
for page in pages:
    check("newsletter.js" not in page.read_text(encoding="utf-8"),f"Obsolete newsletter.js reference in {page.relative_to(ROOT)}")

api = json.loads((ROOT/"api-catalog.json").read_text(encoding="utf-8"))
api_names = {str(x["name"]).strip().lower() for x in api}
check(len(api)==239 and len(api_names)==239,f"Canonical API catalogue must contain 239 unique rows; got {len(api)}")
for name in ("api-supply.html","tr/api-supply.html"):
    source = (ROOT/name).read_text(encoding="utf-8")
    names = {x.lower() for x in re.findall(r'data-name="([^"]+)"',source)}
    check(len(names)==239 and names==api_names,f"API catalogue mismatch in {name}: {len(names)} unique rows")
localized = (ROOT/"assets/js/localized-homepage.js").read_text(encoding="utf-8")
check("const additions=[" not in localized and "const data=baseData;" in localized,"ES/FR API page has a second catalogue source")
check(localized.find("filter=document.getElementById('apiCategoryFilter')") < localized.find("filter.innerHTML="),"API filter is used before its DOM binding")

shell = (ROOT/"site-shell.js").read_text(encoding="utf-8")
hero = (ROOT/"hero-slideshow.js").read_text(encoding="utf-8")
api_js = (ROOT/"assets/js/api-catalog.js").read_text(encoding="utf-8")
grid = (ROOT/"assets/js/service-grid.js").read_text(encoding="utf-8")
forms = (ROOT/"assets/js/fcm-cmo-forms.js").read_text(encoding="utf-8")
downloads = (ROOT/"assets/js/fcm-cmo-downloads.js").read_text(encoding="utf-8")
check("if (!localeMatch && queryLang === 'fa') locale = 'fa';" in shell,"site-shell query language overrides a localized route")
check("whatsappPath) ? 'tr' : (" in shell,"WhatsApp label does not prioritize Turkish route")
check("var isTurkishPath =" in hero and "!isTurkishPath" in hero,"Slideshow locale does not prioritize Turkish route")
check("var language = isTurkishPath ? 'tr' : queryLanguage === 'fa'" in api_js,"API catalogue locale does not prioritize Turkish route")
check("if (!localizedRoute && (params.get('lang') === 'fa'" in grid,"Service links can append Persian query to a localized route")
check("location.pathname.startsWith('/tr/')?'tr':new URLSearchParams(location.search).get('lang')==='fa'?'fa':'en'" in forms,"FCM/CMO form locale precedence mismatch")
check("path.startsWith('/tr/')?'tr':query==='fa'?'fa'" in downloads,"FCM/CMO download locale precedence mismatch")

for page_name,consumer in (("index.html","homepage.js"),("tr/index.html","homepage-tr.js")):
    sources = [Path(urlsplit(urljoin("https://www.niaznet.net/"+page_name,x)).path).name for x in page_data[page_name].scripts]
    check("service-grid.js" in sources and consumer in sources and sources.index("service-grid.js") < sources.index(consumer),f"service-grid.js must load before {consumer} in {page_name}")

cos_en = page_data["cosmoderma.html"].slide_sources
cos_tr = page_data["tr/cosmoderma.html"].slide_sources
check(len(cos_en)==8 and len(cos_tr)==8,f"Cosmoderma must have 8 slides in both locales: EN={len(cos_en)}, TR={len(cos_tr)}")
check(cos_en==cos_tr,"Cosmoderma EN/TR slide order differs")
slide_files = sorted((ROOT/"images/slides").glob("*.png"))
check(len(slide_files)>=26,f"Expected at least 26 normalized slide assets; found {len(slide_files)}")
for file in slide_files:
    try:
        with Image.open(file) as image: check(image.size==(1944,809),f"Non-canonical slide size: {file.relative_to(ROOT)} is {image.size}")
    except Exception as exc: ERRORS.append(f"Cannot read slide image {file.relative_to(ROOT)}: {exc}")

for name in ("sports-nutrition.html","tr/sports-nutrition.html"):
    check(page_data[name].classes.count("sports-brand-placeholder")==4,f"Sports Nutrition must retain four logo placeholders in {name}")
for name in ("infant-formula.html","tr/infant-formula.html"):
    check(page_data[name].classes.count("sports-brand-placeholder")==4,f"Infant Formula must retain four project placeholders in {name}")
infant = (ROOT/"hero-slideshow.js").read_text(encoding="utf-8")
start = infant.find("var infantSlides = [")
end = infant.find("];",start)
check(start >= 0 and end > start and infant[start:end].count("{ src:")==4,"Infant Formula slideshow must contain four image records")

rtfs = sorted((ROOT/"downloads/fcm-cmo").glob("*.rtf"))
check(len(rtfs)==15,f"Expected 15 FCM/CMO RTF files; found {len(rtfs)}")
for file in rtfs:
    data = file.read_text(encoding="latin1",errors="replace")
    check(data.startswith("{") and "rtf1" in data[:10],f"Invalid RTF header: {file.name}")
    check(data.count("{")==data.count("}"),f"Unbalanced RTF braces: {file.name}")
    check("info@niaznet.net" in data,f"Missing enquiry mailbox in {file.name}")

if ERRORS:
    print(f"SITE INTEGRITY FAILED: {len(ERRORS)} issue(s)")
    for error in ERRORS: print(" - "+error)
    sys.exit(1)
print(f"SITE INTEGRITY PASSED: {len(pages)} HTML pages; API=239; Cosmoderma=8/8; normalized slides={len(slide_files)}; FCM/CMO RTF={len(rtfs)}.")
