from pathlib import Path
from PIL import Image

IMAGES_DIR = Path("images")

TARGETS = {
    "19-680.webp": 62,
    "raft2-680.webp": 62,
    "quad-680.webp": 66,
    "vtt-680.webp": 68,
    "21-768.webp": 70,
    "camping-1-680.webp": 66,
    "bab2-680.webp": 68,
}

for filename, quality in TARGETS.items():
    path = IMAGES_DIR / filename

    if not path.exists():
        print(f"Not found: {path}")
        continue

    with Image.open(path) as image:
        image.save(
            path,
            "WEBP",
            quality=quality,
            method=6,
            optimize=True
        )

    size_kb = path.stat().st_size / 1024
    print(f"{filename}: {size_kb:.1f} KB")python compress_webp.py