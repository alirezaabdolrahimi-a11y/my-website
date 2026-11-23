#!/usr/bin/env python3
"""Normalize uploaded NIAZ NET slideshow PNG canvases without cropping or stretching artwork."""
from pathlib import Path
from PIL import Image, ImageOps
import json

ROOT = Path(__file__).resolve().parents[1]
SIZE = (1944, 809)
NAVY = (6, 26, 54)
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
    changed = []
    for key, expected_count in EXPECTED.items():
        paths = manifest[key]
        if len(paths) != expected_count or len(paths) != len(set(paths)):
            raise RuntimeError(f"{key}: expected {expected_count} unique slides, found {len(paths)}")
        for raw in paths:
            if not isinstance(raw, str) or not raw.startswith("/images/"):
                raise RuntimeError(f"{key}: invalid local image path {raw!r}")
            file = ROOT / raw.lstrip("/")
            if not file.is_file():
                raise FileNotFoundError(f"{key}: missing image {raw}")
            try:
                with Image.open(file) as opened:
                    if opened.format != "PNG":
                        raise RuntimeError(f"{raw}: expected PNG, got {opened.format}")
                    original_size = opened.size
                    opened.verify()
                if original_size != SIZE:
                    with Image.open(file) as opened:
                        image = ImageOps.exif_transpose(opened).convert("RGBA")
                        image = ImageOps.contain(image, SIZE, method=Image.Resampling.LANCZOS)
                        canvas = Image.new("RGBA", SIZE, NAVY + (255,))
                        canvas.alpha_composite(image, ((SIZE[0] - image.width) // 2, (SIZE[1] - image.height) // 2))
                        temporary = file.with_name(file.name + ".normalized.tmp")
                        canvas.save(temporary, format="PNG", optimize=True)
                        temporary.replace(file)
                    changed.append((raw, original_size))
                with Image.open(file) as image:
                    if image.format != "PNG" or image.size != SIZE:
                        raise RuntimeError(f"{raw}: normalization did not produce {SIZE}; got {image.format} {image.size}")
                    image.verify()
            except Exception as exc:
                raise RuntimeError(f"Invalid slideshow image {raw}: {exc}") from exc
            total += 1
    if total != 54:
        raise RuntimeError(f"Expected exactly 54 uploaded slides; found {total}")
    print(f"Validated {total} uploaded slideshow PNGs across {len(EXPECTED)} folders; all are {SIZE[0]}x{SIZE[1]}.")
    if changed:
        print(f"Normalized {len(changed)} source canvases without cropping or stretching artwork:")
        for raw, old_size in changed:
            print(f" - {raw}: {old_size[0]}x{old_size[1]} -> {SIZE[0]}x{SIZE[1]}")
    else:
        print("All source image canvases were already canonical; no binary files changed.")

if __name__ == "__main__":
    main()
