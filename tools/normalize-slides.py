#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit
import re
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SIZE = (1944, 809)
NAVY = (6, 26, 54)
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

class ShowcaseParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.active_roots, self.sources = [], 0, []
        self.root_count = 0
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        is_root = tag in {"div", "section"} and "hero-showcase" in (values.get("class") or "").split()
        if is_root:
            self.active_roots += 1
            self.root_count += 1
        if self.active_roots and tag == "img" and values.get("src"):
            self.sources.append(values["src"])
        if tag not in VOID:
            self.stack.append((tag, is_root))
    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                removed = self.stack[index:]
                del self.stack[index:]
                self.active_roots -= sum(1 for _, root in removed if root)
                return

def local_path(raw):
    parsed = urlsplit(raw.strip())
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path).lstrip("/")
    return path if path.startswith("images/") and not path.startswith("images/slides/") else None

def collect_sources():
    found = set()
    for page in ROOT.rglob("*.html"):
        if ".git" in page.parts:
            continue
        parser = ShowcaseParser()
        parser.feed(page.read_text(encoding="utf-8"))
        found.update(path for raw in parser.sources if (path := local_path(raw)))
    js = (ROOT / "hero-slideshow.js").read_text(encoding="utf-8")
    for raw in re.findall(r"""(?:src\s*:\s*|\.src\s*=\s*)['"]([^'"]+)['"]""", js):
        path = local_path(raw)
        if path:
            found.add(path)
    return sorted(found)

def normalize(source_rel):
    source = ROOT / source_rel
    if not source.is_file():
        raise FileNotFoundError(f"Missing slideshow image: {source_rel}")
    output_rel = Path("images/slides") / (source.stem + ".png")
    output = ROOT / output_rel
    output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGBA")
        image = ImageOps.contain(image, SIZE, method=Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", SIZE, NAVY + (255,))
        canvas.alpha_composite(image, ((SIZE[0] - image.width) // 2, (SIZE[1] - image.height) // 2))
        canvas.convert("RGB").save(output, "PNG", optimize=True)
    return output_rel.as_posix()

def update_refs(source_rel, output_rel, files):
    enc_out = quote(output_rel, safe="/")
    encoded_variants = {
        quote(source_rel, safe="/"),
        quote(source_rel, safe="/()"),
        quote(source_rel, safe="/(),"),
        quote(source_rel, safe="/()[],:@&=+$!*'~"),
    }
    variants = {source_rel, "/" + source_rel, "./" + source_rel}
    for enc_src in encoded_variants:
        variants.update({enc_src, "/" + enc_src, "./" + enc_src})
    for file in files:
        before = file.read_text(encoding="utf-8")
        after = before
        for variant in sorted(variants, key=len, reverse=True):
            after = after.replace(variant, "/" + enc_out)
        if after != before:
            file.write_text(after, encoding="utf-8")


def canonical_path(raw):
    parsed = urlsplit(raw.strip())
    if parsed.scheme or parsed.netloc:
        return None
    return unquote(parsed.path).lstrip("/")

def validate_site():
    shared_shell = (ROOT / "site-shell.js").read_text(encoding="utf-8")
    shared_stylesheet_path = ROOT / "assets" / "css" / "site-shell-enhancements.css"
    if "site-shell-enhancements.css" not in shared_shell or not shared_stylesheet_path.is_file():
        raise RuntimeError("Shared site-shell stylesheet is missing or not referenced by site-shell.js")
    shared_shell += "\n" + shared_stylesheet_path.read_text(encoding="utf-8")
    required_frame_rules = (
        "html body .hero-showcase.hero-showcase.hero-showcase",
        "aspect-ratio:1944 / 809!important",
        "height:auto!important",
        "object-fit:contain!important",
    )
    for rule in required_frame_rules:
        if rule not in shared_shell:
            raise RuntimeError(f"Shared slideshow frame is missing its mandatory override: {rule}")
    pages = list(ROOT.rglob("*.html"))
    slideshow_pages = 0
    for page in pages:
        content = page.read_text(encoding="utf-8")
        parser = ShowcaseParser()
        parser.feed(content)
        if not parser.root_count:
            continue
        slideshow_pages += 1
        if parser.root_count != 1:
            raise RuntimeError(f"{page.relative_to(ROOT)} has {parser.root_count} slideshow roots; expected exactly one.")
        if "hero-slideshow.js" not in content or "site-shell.js" not in content:
            raise RuntimeError(f"{page.relative_to(ROOT)} does not load both shared slideshow and site-shell controllers.")
        for raw in parser.sources:
            path = canonical_path(raw)
            if not path or not path.startswith("images/slides/"):
                raise RuntimeError(f"{page.relative_to(ROOT)} still references a non-normalized slideshow image: {raw}")
            image_path = ROOT / path
            if not image_path.is_file():
                raise FileNotFoundError(f"{page.relative_to(ROOT)} references missing slide asset {path}")
    js = (ROOT / "hero-slideshow.js").read_text(encoding="utf-8")
    dynamic = []
    for raw in re.findall(r"""(?:src\s*:\s*|\.src\s*=\s*)['"]([^'"]+)['"]""", js):
        path = canonical_path(raw)
        if path and path.startswith("images/"):
            if not path.startswith("images/slides/"):
                raise RuntimeError(f"Shared controller still references a non-normalized slide: {raw}")
            if not (ROOT / path).is_file():
                raise FileNotFoundError(f"Shared controller references missing slide asset {path}")
            dynamic.append(path)
    slide_files = sorted((ROOT / "images/slides").glob("*.png"))
    if not slide_files:
        raise RuntimeError("No normalized slideshow images exist.")
    for image_path in slide_files:
        with Image.open(image_path) as image:
            if image.size != SIZE:
                raise RuntimeError(f"Non-canonical slide size: {image_path.relative_to(ROOT)} is {image.size}")
    pairs = [
        ("index.html", "tr/index.html"), ("index.html", "es/index.html"),
        ("index.html", "fr/index.html"), ("about.html", "fa/about.html"),
        ("about.html", "tr/about.html"),
        ("api-supply.html", "tr/api-supply.html"),
        ("brand-registration.html", "tr/brand-registration.html"),
        ("business-development.html", "tr/business-development.html"),
        ("chamber-of-commerce.html", "tr/chamber-of-commerce.html"),
        ("contract-manufacturing.html", "tr/contract-manufacturing.html"),
        ("cosmoderma.html", "tr/cosmoderma.html"),
        ("cbd-products.html", "tr/cbd-products.html"),
        ("cote-divoire-market.html", "tr/cote-divoire-market.html"),
        ("exclusive-agency.html", "tr/exclusive-agency.html"),
        ("import-export.html", "tr/import-export.html"),
        ("licensing-partnerships.html", "tr/licensing-partnerships.html"),
        ("market-entry.html", "tr/market-entry.html"),
        ("medical-devices.html", "tr/medical-devices.html"),
        ("nutraceuticals.html", "tr/nutraceuticals.html"),
        ("pet-food.html", "tr/pet-food.html"),
        ("pharmaceutical-products.html", "tr/pharmaceutical-products.html"),
        ("private-label.html", "tr/private-label.html"),
        ("product-registration.html", "tr/product-registration.html"),
        ("regulatory-affairs.html", "tr/regulatory-affairs.html"),
        ("south-africa-market.html", "tr/south-africa-market.html"),
        ("supply-chain-solutions.html", "tr/supply-chain-solutions.html"),
        ("technology-transfer.html", "tr/technology-transfer.html"),
        ("international-business-development.html", "tr/international-business-development.html"),
        ("kenya-market.html", "tr/kenya-market.html"),
        ("infant-formula.html", "tr/infant-formula.html"),
        ("sports-nutrition.html", "tr/sports-nutrition.html"),
    ]
    for left, right in pairs:
        def page_sources(path):
            parser = ShowcaseParser()
            parser.feed((ROOT / path).read_text(encoding="utf-8"))
            return [canonical_path(src) for src in parser.sources]
        if page_sources(left) != page_sources(right):
            raise RuntimeError(f"Slideshow artwork/order differs between {left} and {right}.")
    print(f"Validated {slideshow_pages} slideshow pages, {len(slide_files)} exact-size slide assets, and {len(pairs)} locale pairs.")

def main():
    sources = collect_sources()
    if not sources:
        existing = sorted((ROOT / "images/slides").glob("*.png"))
        if existing:
            for image_path in existing:
                with Image.open(image_path) as image:
                    if image.size != SIZE:
                        raise RuntimeError(f"Non-canonical slide size: {image_path} is {image.size}")
            print(f"Already normalized: verified {len(existing)} slide images at {SIZE[0]}x{SIZE[1]}.")
            validate_site()
            return
        raise RuntimeError("No slideshow images detected.")
    files = list(ROOT.rglob("*.html")) + [ROOT / "hero-slideshow.js"]
    for source in sources:
        target = normalize(source)
        update_refs(source, target, files)
    print(f"Normalized {len(sources)} images to {SIZE[0]}x{SIZE[1]}.")
    validate_site()

if __name__ == "__main__":
    main()
