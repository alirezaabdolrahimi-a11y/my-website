#!/usr/bin/env python3
"""Create visual-quality-gated WebP candidates for the 19 homepage slides.
Original PNG files are read-only and never overwritten.
"""
import json, math, os
from pathlib import Path
from PIL import Image, ImageChops, ImageStat

ROOT = Path(".")
MANIFEST = ROOT / "images/slideshow-manifest.json"
OUT = ROOT / "images/optimized-slides"
OUT.mkdir(parents=True, exist_ok=True)
data = json.loads(MANIFEST.read_text(encoding="utf-8"))

def collect(value):
    found = []
    if isinstance(value, str) and value.lower().endswith(".png"):
        if value.startswith("/"):
            found.append(value.lstrip("/"))
    elif isinstance(value, list):
        for item in value: found.extend(collect(item))
    elif isinstance(value, dict):
        for item in value.values(): found.extend(collect(item))
    return found

paths = list(dict.fromkeys(collect(data)))
# This run is specifically scoped to the 19 homepage hero slides.
paths = [p for p in paths if p.startswith("images/Home page/")]
if len(paths) != 19:
    raise SystemExit(f"Expected exactly 19 homepage PNGs, found {len(paths)}")

rows=[]
for rel in paths:
    src=ROOT/rel
    if not src.is_file(): raise SystemExit(f"Missing original: {rel}")
    with Image.open(src) as im:
        original=im.convert("RGBA")
        candidates=[]
        for quality in (94,96,98,100):
            tmp=OUT/(src.stem+f".q{quality}.webp")
            original.save(tmp, "WEBP", quality=quality, method=6, exact=True)
            with Image.open(tmp) as enc:
                test=enc.convert("RGBA")
                diff=ImageChops.difference(original,test)
                stat=ImageStat.Stat(diff)
                mse=sum(v*v for v in stat.mean)/4
                psnr=99.0 if mse==0 else 10*math.log10((255*255)/mse)
                mae=sum(stat.mean)/4
            candidates.append((tmp.stat().st_size,psnr,mae,tmp,quality))
        # Also evaluate lossless WebP; choose smallest candidate meeting strict visual threshold.
        lossless=OUT/(src.stem+".lossless.webp")
        original.save(lossless,"WEBP",lossless=True,method=6,exact=True)
        with Image.open(lossless) as enc:
            diff=ImageChops.difference(original,enc.convert("RGBA"))
            stat=ImageStat.Stat(diff)
            mse=sum(v*v for v in stat.mean)/4
            psnr=99.0 if mse==0 else 10*math.log10((255*255)/mse)
            mae=sum(stat.mean)/4
        candidates.append((lossless.stat().st_size,psnr,mae,lossless,"lossless"))
        acceptable=[x for x in candidates if x[1]>=45.0 and x[2]<=1.0]
        if not acceptable:
            raise SystemExit(f"No candidate met strict quality gate for {rel}")
        size,psnr,mae,tmp,mode=min(acceptable,key=lambda x:x[0])
        final=OUT/(src.stem+".webp")
        if final.exists(): final.unlink()
        tmp.replace(final)
        for x in candidates:
            if x[3] != final and x[3].exists(): x[3].unlink()
        rows.append({
            "source":rel,"output":str(final),"width":original.width,"height":original.height,
            "source_bytes":src.stat().st_size,"output_bytes":size,
            "saving_percent":round((1-size/src.stat().st_size)*100,2),
            "psnr_db":round(psnr,2),"mean_absolute_error":round(mae,4),"mode":mode
        })

report={"count":len(rows),"source_total_bytes":sum(x["source_bytes"] for x in rows),
        "output_total_bytes":sum(x["output_bytes"] for x in rows),
        "saving_percent":round((1-sum(x["output_bytes"] for x in rows)/sum(x["source_bytes"] for x in rows))*100,2),
        "quality_gate":"PSNR >= 45 dB and mean absolute channel error <= 1.0",
        "originals_modified":False,"images":rows}
(OUT/"optimization-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({k:v for k,v in report.items() if k!="images"},ensure_ascii=False))
for row in rows: print(f'{row["source"]}: {row["source_bytes"]} -> {row["output_bytes"]} bytes ({row["saving_percent"]}%), PSNR {row["psnr_db"]} dB, {row["mode"]}')
