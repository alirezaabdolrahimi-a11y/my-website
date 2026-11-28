#!/usr/bin/env python3
"""Regression checks for NIAZ NET shared core and repaired site data."""
from collections import Counter
from html.parser import HTMLParser
from html import unescape
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import json
import re
import sys
import subprocess
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
        self.pre_rendered = False
        self.images_without_alt = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "html" and d.get("data-prerendered") == "true": self.pre_rendered = True
        if tag == "img" and self.pre_rendered and "alt" not in d:
            self.images_without_alt.append(d.get("src", "(missing src)"))
        if d.get("id"): self.ids.append(d["id"])
        if tag == "script" and d.get("src"): self.scripts.append(d["src"])
        if tag == "link" and "stylesheet" in (d.get("rel") or ""):
            self.styles.append(d.get("href", ""))
            if d.get("href"): self.refs.append(d["href"])
        if d.get("class"): self.classes.extend(d["class"].split())
        for key in ("src","poster","data-src","action"):
            if d.get(key) and not (self.showcase_depth and key == "src"): self.refs.append(d[key])
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
    if parser.pre_rendered:
        check(not parser.images_without_alt, f"Pre-rendered images without alt in {rel}: {parser.images_without_alt}")
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
api_categories = {str(x["name"]).strip().lower(): str(x["category"]).strip() for x in api}
category_set = {x["category"] for x in api}
check(len(category_set)==7,"Canonical API catalogue must contain seven distinct categories")
for name in ("api-supply.html","tr/api-supply.html"):
    source = (ROOT/name).read_text(encoding="utf-8")
    table_rows = re.findall(r'<tr data-name="([^"]+)" data-category="([^"]+)"',source)
    mismatches = [(product,category,api_categories.get(product.lower())) for product,category in table_rows if api_categories.get(product.lower()) != category]
    check(len(table_rows)==239 and not mismatches,f"API filter categories diverge from canonical data in {name}: {mismatches[:8]}")
    options = {unescape(x) for x in re.findall(r'<option value="([^"]+)"',source)} - {"all"}
    check(options==category_set,f"API category filter options do not match canonical categories in {name}")
localized = (ROOT/"assets/js/localized-homepage.js").read_text(encoding="utf-8")
check("const homePath = isFrench ? '/fr/index.html' : '/es/index.html';" in localized and "queryPrefix: isFrench ? '/fr/' : '/es/'" in localized,"ES/FR service query routes do not return to the correct localized homepage")
check("const localizedServiceNames = isFrench ?" in localized and "IMPORTACIÓN / EXPORTACIÓN" in localized and "IMPORTATION / EXPORTATION" in localized,"ES/FR service labels are not fully localized")
check("const additions=[" not in localized and "const data=baseData;" in localized,"ES/FR API page has a second catalogue source")
check(localized.find("filter=document.getElementById('apiCategoryFilter')") < localized.find("filter.innerHTML="),"API filter is used before its DOM binding")

shell = (ROOT/"site-shell.js").read_text(encoding="utf-8")
hero = (ROOT/"hero-slideshow.js").read_text(encoding="utf-8")
api_js = (ROOT/"assets/js/api-catalog.js").read_text(encoding="utf-8")
grid = (ROOT/"assets/js/service-grid.js").read_text(encoding="utf-8")
forms = (ROOT/"assets/js/fcm-cmo-forms.js").read_text(encoding="utf-8")
downloads = (ROOT/"assets/js/fcm-cmo-downloads.js").read_text(encoding="utf-8")
check("if (!localeMatch && queryLang === 'fa') locale = 'fa';" in shell,"site-shell query language overrides a localized route")
check("niazSiteShellInitialized" in shell,"site-shell duplicate initialization guard is missing")
check("document.querySelectorAll('form#newsletterForm')" in shell and "document.querySelectorAll('form').forEach" not in shell,"site-shell must remove only the obsolete newsletter form, not all forms")
check("form[data-mailto-form]" in shell and "form.dataset.mailtoBound = 'true'" in shell,"Shared mailto forms are not protected against duplicate submit binding")
check("nav.classList.toggle('open')" in shell and "toggle.setAttribute('aria-expanded', String(open))" in shell,"Mobile navigation state/ARIA handler is missing")
check("contactObserver.observe(document.body, { childList: true, subtree: true })" in shell,"Dynamic contact-link observer is missing")
check("routeContactLinks(document)" in shell and r"contact\.html|become-our-partner\.html" in shell,"Contact/partner CTA routing is not applied to static and dynamic links")
# Static load-order/dependency audit for all pages that include the shared shell.
shell_pages=[]
for rel, audit in page_data.items():
    shell_refs=[i for i,x in enumerate(audit.scripts) if x.rstrip('/').endswith('site-shell.js')]
    language_refs=[i for i,x in enumerate(audit.scripts) if x.rstrip('/').endswith('language-switcher.js')]
    if shell_refs:
        shell_pages.append(rel)
        check(len(shell_refs)==1,f"site-shell.js must load exactly once in {rel}")
        if language_refs:
            check(len(language_refs)==1 and shell_refs[0]<language_refs[0],f"Shared shell/language-switcher order is invalid in {rel}")
expected_shell_pages=[rel for rel in page_data if not rel.startswith('downloads/fcm-cmo/')]
check(len(shell_pages)==len(expected_shell_pages),f"Expected every non-download page to load the shared shell once; found {len(shell_pages)} of {len(expected_shell_pages)}")
check("form[data-mailto-form]" in shell and "mailto:info@niaznet.net?subject=" in shell,"Shared mailto form handler or destination is missing")
check("niazContactHubForm" in shell and "niaz-contact-hub" in shell,"Homepage contact hub is missing")
for name in ("contact.html","become-our-partner.html","tr/contact.html","tr/become-our-partner.html"):
    check("data-mailto-form" in (ROOT/name).read_text(encoding="utf-8"),f"Shared enquiry form marker missing in {name}")
check("var whatsappRouteMatch = whatsappPath.match(" in shell and "(tr|es|fr|fa)" in shell and "es:" in shell and "fr:" in shell,"WhatsApp labels do not cover all localized routes")
check("var route = path.match(" in hero and "(tr|es|fr|fa)" in hero and "route ? route[1]" in hero,"Slideshow locale does not prioritize localized routes")
check("var routeLocaleMatch = (window.location.pathname || '/').match(" in api_js and "(tr|es|fr|fa)" in api_js and "var language = routeLocaleMatch ? routeLocaleMatch[1].toLowerCase()" in api_js,"API catalogue locale does not prioritize localized routes")
check("if (!localizedRoute && (params.get('lang') === 'fa'" in grid,"Service links can append Persian query to a localized route")
# Historical regressions retained from the prior audit report.
tr_cos = (ROOT/"tr/cosmoderma.html").read_text(encoding="utf-8")
check('/tr/index.html#home' in tr_cos and '/tr/index.html#services' in tr_cos,"Turkish Cosmoderma navigation routes to the wrong locale")
check('images/service-icons/cbd.png' in (ROOT/"projects.html").read_text(encoding="utf-8"),"English CBD project icon path regression")
check('/images/service-icons/cbd.png' in (ROOT/"tr/projects.html").read_text(encoding="utf-8"),"Turkish CBD project icon path regression")
for name in ("es/index.html","fr/index.html"):
    source=(ROOT/name).read_text(encoding="utf-8")
    check('href="#about"' in source and 'href="#projects"' in source,f"ES/FR homepage navigation leaves its localized page in {name}")
    check('/about.html' not in source and '/projects.html' not in source,f"ES/FR homepage still routes About/Projects to EN-only pages in {name}")
    check('href="/es/index.html#home"' in source if name.startswith('es/') else 'href="/fr/index.html#home"' in source,f"Localized homepage route is missing in {name}")
fa_loader=(ROOT/"fa-translation.js").read_text(encoding="utf-8")
fa_runtime=(ROOT/"fa-translation-runtime.js").read_text(encoding="utf-8")
check("fa-translation-runtime.js" in fa_loader and "data-fa-translation-runtime" in fa_loader,"Persian runtime loader or duplicate-load guard missing")
check("isNonPersianLocalePage" in fa_loader and "!params.has('lang')" in fa_loader,"Persian saved preference must not override explicit query language or TR/ES/FR route")
check("isNonPersianLocalePage" in fa_runtime and "if(isNonPersianLocalePage)return;" in fa_runtime,"Persian runtime must refuse TR/ES/FR locale routes even if loaded directly")
locale_test = subprocess.run(["node", "tools/test-locale-precedence.js"], cwd=ROOT, text=True, capture_output=True)
check(locale_test.returncode == 0, f"Persian locale-precedence runtime test failed: {locale_test.stderr[:300]}")
lang_switcher=(ROOT/"language-switcher.js").read_text(encoding="utf-8")
check("es: 'Idioma'" in lang_switcher and "fr: 'Langue'" in lang_switcher and "['es', 'fr'].indexOf(active)" in lang_switcher,"Legacy ES/FR language menu labels are not preserved")
check("document.readyState==='loading'" in fa_runtime and "else translate()" in fa_runtime,"Persian runtime may miss initialization after DOMContentLoaded")
check("'PARTNERS':'شرکای تجاری'" in fa_runtime and "'Partner':'شریک تجاری'" in fa_runtime and '"Partner": " "' not in fa_runtime,"Persian partner labels are missing or blank")
for title_key in ("NIAZ NET | Strategic Distribution, Trade & Business Development","About NIAZ NET | International Business Development","Projects | NIAZ NET","Contact NIAZ NET | Business & Partnership Enquiries","Pharmaceutical API Sourcing & Supply | NIAZ NET","API Sourcing Coordination","Import & Export Services | International Trade | NIAZ NET","Licensing Strategy & Strategic Partnerships | NIAZ NET","Medical Device & Healthcare Equipment Trade | NIAZ NET","Nutraceuticals, Vitamins & Wellness Products | NIAZ NET","Pet Food & Animal Nutrition Trade | NIAZ NET","Private Label & Own-Brand Product Development | NIAZ NET","Product Registration & Dossier Coordination | NIAZ NET","Regulatory Affairs & Compliance Coordination | NIAZ NET","Supply Chain Coordination & Trade Logistics | NIAZ NET","Project Details | NIAZ NET"):
    check(title_key in fa_runtime,f"Missing Persian title translation key: {title_key}")
# Extract the Persian dictionary in Node, then compare it to visible text in each dictionary-backed page.
extractor = r"""
const fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('fa-translation-runtime.js','utf8');
const start=source.indexOf('const common={');
const end=source.indexOf('const file=location',start);
if(start<0||end<0)throw new Error('Persian dictionary boundaries not found');
const code=source.slice(start,end)+'\nglobalThis.result={common:common,pages:pages};';
const sandbox={};vm.runInNewContext(code,sandbox,{timeout:10000});
process.stdout.write(JSON.stringify(sandbox.result));
"""
extracted = subprocess.run(["node","-e",extractor],cwd=ROOT,text=True,capture_output=True)
check(extracted.returncode==0,f"Could not extract Persian dictionary: {extracted.stderr[:300]}")
fa_dictionary=json.loads(extracted.stdout) if extracted.returncode==0 else {"common":{},"pages":{}}
class VisibleText(HTMLParser):
    def __init__(self): super().__init__(); self.skip=0; self.values=[]
    def handle_starttag(self,tag,attrs):
        if tag in ("script","style","noscript","svg"): self.skip+=1
    def handle_endtag(self,tag):
        if tag in ("script","style","noscript","svg") and self.skip: self.skip-=1
    def handle_data(self,data):
        value=re.sub(r"\s+"," ",data).strip()
        if value and not self.skip: self.values.append(value)
translation_gaps=[]
for page_key,page_dictionary in fa_dictionary.get("pages",{}).items():
    page_path=ROOT/page_key
    if not page_path.exists(): continue
    parser=VisibleText(); parser.feed(page_path.read_text(encoding="utf-8",errors="replace"))
    page_map={re.sub(r"\s+"," ",k).strip():v for k,v in page_dictionary.items()}
    dictionary={**{re.sub(r"\s+"," ",k).strip():v for k,v in fa_dictionary.get("common",{}).items()},**page_map}
    for phrase in dict.fromkeys(parser.values):
        if phrase in dictionary: continue
        if len(re.findall(r"[A-Za-z]{2,}",phrase))<2 or re.fullmatch(r"[A-Z0-9 &|,.-]+",phrase): continue
        if page_key=="api-supply.html" and (phrase.lower() in api_names or phrase=="Showing 239 of 239 records"): continue
        if page_key=="sports-nutrition.html" and re.match(r"^(Premium|100%|Whey)",phrase): continue
        if page_key=="cosmoderma.html" and phrase=="Vita Cosmo, Cosmoderma & Aesthetic Medicine": continue
        translation_gaps.append((page_key,phrase))
check(not translation_gaps,f"Meaningful untranslated Persian UI text remains: {translation_gaps[:12]}")
check("if(document.getElementById('fcm-cmo-forms'))return;" in forms,"FCM/CMO form duplicate-insertion guard missing")
check("root.dataset.fcmReady='true';" in downloads,"FCM/CMO download locale-ready guard missing")
workflow=(ROOT/".github/workflows/normalize-slides.yml").read_text(encoding="utf-8")
check("contents: read" in workflow and "persist-credentials: false" in workflow and "git status --porcelain" in workflow,"Slideshow CI lost read-only/no-write safeguards")
check("location.pathname.startsWith('/tr/')?'tr':new URLSearchParams(location.search).get('lang')==='fa'?'fa':'en'" in forms,"FCM/CMO form locale precedence mismatch")
check("path.startsWith('/tr/')?'tr':query==='fa'?'fa'" in downloads,"FCM/CMO download locale precedence mismatch")

for page_name,consumer in (("index.html","homepage.js"),("tr/index.html","homepage-tr.js"),("es/index.html","localized-homepage.js"),("fr/index.html","localized-homepage.js")):
    sources = [Path(urlsplit(urljoin("https://www.niaznet.net/"+page_name,x)).path).name for x in page_data[page_name].scripts]
    check("service-grid.js" in sources and consumer in sources and sources.index("service-grid.js") < sources.index(consumer),f"service-grid.js must load before {consumer} in {page_name}")
    other_consumers = {"homepage.js","homepage-tr.js","localized-homepage.js"} - {consumer}
    check(not (other_consumers & set(sources)),f"Conflicting homepage renderer loaded in {page_name}")

manifest_path = ROOT/"images/slideshow-manifest.json"
try:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
except Exception as exc:
    manifest = {}
    ERRORS.append(f"Cannot read slideshow manifest: {exc}")
expected_slides = {"home":19,"about":6,"sport":3,"api":2,"infant":4,"cbd":2,"all":2,"cosmo":11,"pet":2,"brand":3}
check(set(manifest)==set(expected_slides),f"Slideshow manifest keys mismatch: {sorted(manifest)}")
for key,count in expected_slides.items():
    paths=manifest.get(key,[])
    check(len(paths)==count,f"Slideshow {key} expected {count} images, found {len(paths)}")
    check(len(paths)==len(set(paths)),f"Slideshow {key} contains duplicate image paths")
    for raw in paths:
        target=ROOT/unquote(urlsplit(raw).path).lstrip("/")
        check(raw.startswith("/images/") and target.is_file(),f"Missing or invalid slideshow asset for {key}: {raw}")
        if target.is_file():
            try:
                with Image.open(target) as image: check(image.format=="PNG" and image.size==(1944,809),f"Slideshow image must be 1944x809 PNG: {raw} is {image.format} {image.size}")
            except Exception as exc: ERRORS.append(f"Cannot read slideshow image {raw}: {exc}")
check(sum(len(manifest.get(k,[])) for k in expected_slides)==54,"The ten uploaded folders must map exactly 54 slides")
check("fetch('/images/slideshow-manifest.json'" in hero,"Shared slideshow controller does not load the folder manifest")
check("object-fit:contain!important;" in (ROOT/"assets/css/site-shell-enhancements.css").read_text(encoding="utf-8"),"Shared slideshow must preserve complete artwork without cropping")
check(".showcase-arrow{display:none!important;" in (ROOT/"assets/css/site-shell-enhancements.css").read_text(encoding="utf-8"),"Left/right slideshow arrows must be hidden globally")
page_map = {
    "home":["index.html","tr/index.html","es/index.html","fr/index.html"],
    "about":["about.html","fa/about.html","tr/about.html"],
    "brand":["brand-registration.html","tr/brand-registration.html"],
    "sport":["sports-nutrition.html","tr/sports-nutrition.html"],
    "infant":["infant-formula.html","tr/infant-formula.html"],
    "cbd":["cbd-products.html","tr/cbd-products.html"],
    "api":["api-supply.html","tr/api-supply.html"],
    "cosmo":["cosmoderma.html","tr/cosmoderma.html"],
    "pet":["pet-food.html","tr/pet-food.html"],
    "all":["business-development.html","tr/business-development.html"],
}
for key,names in page_map.items():
    for name in names:
        source=ROOT/name
        check(source.is_file(),f"Missing page for slideshow {key}: {name}")
        if source.is_file():
            content=source.read_text(encoding="utf-8")
            check("hero-showcase" in content and "hero-slideshow.js" in content,f"{name} does not load the shared slideshow root/controller")

for name in ("sports-nutrition.html","tr/sports-nutrition.html"):
    check(page_data[name].classes.count("sports-brand-placeholder")==4,f"Sports Nutrition must retain four logo placeholders in {name}")
for name in ("infant-formula.html","tr/infant-formula.html"):
    check(page_data[name].classes.count("sports-brand-placeholder")==4,f"Infant Formula must retain four project placeholders in {name}")
check(len(manifest.get("infant",[]))==4,"Infant Formula slideshow must contain exactly four manifest images")

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
slide_count = sum(len(manifest.get(key, [])) for key in expected_slides)
print(f"SITE INTEGRITY PASSED: {len(pages)} HTML pages; API=239; uploaded slides={slide_count}/54 at 1944x809; FCM/CMO RTF={len(rtfs)}.")
