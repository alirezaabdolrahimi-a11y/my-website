#!/usr/bin/env python3
"""Validate the uploaded folder-based NIAZ NET slideshow assets."""
from pathlib import Path
from PIL import Image
import json

ROOT = Path(__file__).resolve().parents[1]
SIZE = (1944, 809)
EXPECTED = {
    "home": 19, "about": 6, "sport": 3, "api": 2, "infant": 4,
    "cbd": 2, "all": 2, "cosmo": 11, "pet": 2, "brand": 3,
}

def main():
    manifest_path = ROOT / "images" / "slideshow-manifest.json"
    if not manifest_path.is_file():
        raise FileNotFoundError("images/slideshow-manifest.json is missing")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if set(manifest) != set(EXPECTED):
        raise RuntimeError(f"Unexpected slideshow manifest keys: {sorted(manifest)}")
    total = 0
    for key, expected_count in EXPECTED.items():
        paths = manifest[key]
        if len(paths) != expected_count:
            raise RuntimeError(f"{key}: expected {expected_count} slides, found {len(paths)}")
        if len(paths) != len(set(paths)):
            raise RuntimeError(f"{key}: duplicate slide path in manifest")
        for raw in paths:
            if not isinstance(raw, str) or not raw.startswith("/images/"):
                raise RuntimeError(f"{key}: invalid local image path {raw!r}")
            file = ROOT / raw.lstrip("/")
            if not file.is_file():
                raise FileNotFoundError(f"{key}: missing image {raw}")
            try:
                with Image.open(file) as image:
                    if image.format != "PNG" or image.size != SIZE:
                        raise RuntimeError(f"{raw}: expected PNG {SIZE[0]}x{SIZE[1]}, got {image.format} {image.size}")
                    image.verify()
            except Exception as exc:
                raise RuntimeError(f"Invalid slideshow image {raw}: {exc}") from exc
            total += 1
    if total != 54:
        raise RuntimeError(f"Expected exactly 54 uploaded slides; found {total}")
    css = (ROOT / "assets/css/site-shell-enhancements.css").read_text(encoding="utf-8")
    if "html body .hero-showcase .showcase-arrow{display:none!important;}" not in css:
        raise RuntimeError("Global no-arrow slideshow rule is missing")
    print(f"Validated {total} uploaded slideshow PNGs across {len(EXPECTED)} folders; all are {SIZE[0]}x{SIZE[1]}.")
if __name__ == "__main__":
    main()
