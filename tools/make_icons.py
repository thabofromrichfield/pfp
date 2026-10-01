"""Build the favicon / app-icon set from the client's logo (assets/pfp-logo.png).

The logo artwork is NOT redrawn or recoloured - it is only scaled (one LANCZOS step,
premultiplied alpha, so no halos) and centred on a cream square, because search engines and
phones need square icons.

Usage (from the repo root):  python3 tools/make_icons.py
Outputs: favicon.ico, assets/favicon-96.png, assets/icon-192.png, assets/icon-512.png,
         assets/apple-touch-icon.png
"""
from PIL import Image

SRC = "assets/pfp-logo.png"
CREAM = (255, 251, 247, 255)  # --cream in style.css


def tile(size, fill):
    """Logo centred on a cream square; `fill` = share of the tile height the logo occupies."""
    logo = Image.open(SRC).convert("RGBA")
    h = round(size * fill)
    w = round(logo.width * h / logo.height)
    scaled = logo.convert("RGBa").resize((w, h), Image.LANCZOS).convert("RGBA")
    canvas = Image.new("RGBA", (size, size), CREAM)
    canvas.alpha_composite(scaled, ((size - w) // 2, (size - h) // 2))
    return canvas.convert("RGB")


# PNG icons (a little padding so round / rounded-square crops never clip the monogram)
tile(96, 0.80).save("assets/favicon-96.png", optimize=True)
tile(192, 0.74).save("assets/icon-192.png", optimize=True)
tile(512, 0.72).save("assets/icon-512.png", optimize=True)
tile(180, 0.74).save("assets/apple-touch-icon.png", optimize=True)

# favicon.ico with 16 / 32 / 48 px frames, each rendered separately (sharper than auto-downscaling)
frames = [tile(48, 0.86), tile(32, 0.86), tile(16, 0.88)]
frames[0].save("favicon.ico", format="ICO", sizes=[(48, 48), (32, 32), (16, 16)], append_images=frames[1:])
print("icons written")
