"""Remove the white background from the client's PFP logo JPEG - nothing else.

Every pixel that is fully ink keeps its exact original colour. Only the white background is
made transparent; anti-aliased edge pixels (ink blended with white by the JPEG) get a partial
alpha with the white un-blended, so the logo composes cleanly on any background colour.
"""
from PIL import Image
import numpy as np
import sys

SRC = sys.argv[1]
DST = sys.argv[2]
PAD = 6  # transparent padding kept around the artwork after trimming the empty white margins

im = Image.open(SRC).convert("RGB")
P = np.asarray(im).astype(np.float64)
R, G, B = P[..., 0], P[..., 1], P[..., 2]
minC = P.min(axis=2)

# Ink measured from the file itself: black ink min-channel < 30, gold ink min-channel ~78-115.
# Anything at least that dark is solid ink and is left completely untouched; only lighter pixels
# (ink blended with the white background along the edges) get a partial alpha.
SOLID_BLACK, SOLID_GOLD = 40.0, 120.0
warm = (R - B) > 15.0                      # gold-ish pixel (gold blended with white stays warm)
k = np.where(warm, SOLID_GOLD, SOLID_BLACK)

alpha = (255.0 - minC) / (255.0 - k)       # 1 = solid ink, 0 = white background
alpha = np.clip(alpha, 0.0, 1.0)
alpha[minC >= 245] = 0.0                   # pure background incl. JPEG noise
alpha[alpha < 0.05] = 0.0

# Un-blend the white from partially covered edge pixels; solid pixels are returned unchanged.
a3 = alpha[..., None]
with np.errstate(divide="ignore", invalid="ignore"):
    F = np.where(a3 > 0, (P - 255.0 * (1.0 - a3)) / np.where(a3 > 0, a3, 1.0), 0.0)
F = np.clip(F, 0, 255)
solid = alpha >= 0.999
F[solid] = P[solid]                        # exact original pixels for all solid ink

rgba = np.dstack([F, alpha * 255.0]).round().astype(np.uint8)
out = Image.fromarray(rgba, "RGBA")

# Trim the empty white margins (background only) and keep a small even transparent padding
ys, xs = np.where(alpha > 0)
x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
x0, y0 = max(0, x0 - PAD), max(0, y0 - PAD)
x1, y1 = min(out.width, x1 + PAD), min(out.height, y1 + PAD)
out = out.crop((x0, y0, x1, y1))
out.save(DST, optimize=True)

print("source:", im.size, "-> output:", out.size, "| solid ink pixels unchanged:", int(solid.sum()),
      "| edge pixels softened:", int(((alpha > 0) & ~solid).sum()))
