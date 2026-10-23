"""Paint variants of the app's car render, for the showroom on /dashboard/.

    python3 src/car-paints.py

Reads assets/images/v4/car-side.webp (white car, transparent background) and
writes assets/images/v4/car-<slug>.webp, one per paint. The paint is
multiplied into the body, so the render's own shading and windows survive.
Keep PAINTS in step with the showroom list in src/pages/20-dashboard.mjs.
"""
import os
from PIL import Image, ImageChops

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIR = os.path.join(ROOT, 'assets', 'images', 'v4')

# slug: tint used for the multiply (a touch lighter than the swatch for dark paints)
PAINTS = {
    'pearl-white': '#f4f3ee', 'silver': '#b9bec6', 'graphite': '#5c626b', 'obsidian-black': '#2a2c31',
    'deep-blue': '#22468f', 'racing-red': '#c40d28', 'british-green': '#1f5038', 'sunset-orange': '#ef6a2b',
    'champagne': '#d8c3a0', 'violet': '#7244ab',
}


def hex2rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def main():
    car = Image.open(os.path.join(DIR, 'car-side.webp')).convert('RGBA')
    rgb, alpha = car.convert('RGB'), car.getchannel('A')
    for slug, tint in PAINTS.items():
        painted = ImageChops.multiply(rgb, Image.new('RGB', car.size, hex2rgb(tint)))
        # a little of the original highlight back, so dark paints keep their shape
        painted = Image.blend(painted, ImageChops.screen(painted, ImageChops.multiply(rgb, rgb)), 0.05)
        out = painted.convert('RGBA')
        out.putalpha(alpha)
        out.save(os.path.join(DIR, f'car-{slug}.webp'), quality=90, method=6)
        print('car', slug)


if __name__ == '__main__':
    main()
