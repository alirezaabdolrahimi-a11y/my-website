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
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        is_root = tag in {"div", "section"} and "hero-showcase" in (values.get("class") or "").split()
        if is_root:
            self.active_roots += 1
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
    enc_src, enc_out = quote(source_rel, safe="/"), quote(output_rel, safe="/")
    variants = {source_rel, "/" + source_rel, "./" + source_rel, enc_src, "/" + enc_src, "./" + enc_src}
    for file in files:
        before = file.read_text(encoding="utf-8")
        after = before
        for variant in sorted(variants, key=len, reverse=True):
            after = after.replace(variant, "/" + enc_out)
        if after != before:
            file.write_text(after, encoding="utf-8")

def main():
    sources = collect_sources()
    if not sources:
        raise RuntimeError("No slideshow images detected.")
    files = list(ROOT.rglob("*.html")) + [ROOT / "hero-slideshow.js"]
    for source in sources:
        target = normalize(source)
        update_refs(source, target, files)
    print(f"Normalized {len(sources)} images to {SIZE[0]}x{SIZE[1]}.")

if __name__ == "__main__":
    main()
