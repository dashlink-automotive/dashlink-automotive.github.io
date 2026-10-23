"""Share images (Open Graph, 1200x630) for every generated page.

    python3 src/og.py

Writes assets/images/og/<page key>.jpg. Needs Pillow and macOS system fonts.
Edit PAGES below when you add a page or want new wording; replace any image
with a designed one of the same name and size.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
IMG = os.path.join(ROOT, 'assets', 'images')
OUT = os.path.join(IMG, 'og')
F = '/System/Library/Fonts/Supplemental/'
W, H = 1200, 630
BLUE, RED = (47, 157, 255), (255, 43, 58)

# key: (headline lines, subline, screenshot under assets/images or None, racing?)
PAGES = {
    'home': (['Add Android Auto to', 'your head unit.'], 'Try DashLink free', 'v3/cabin-night.webp', False),
    'android-auto': (['Android Auto on the', 'screen in your car.'], 'USB · Wireless · Self mode', 'v2/home.webp', False),
    'dashboard': (['Your car’s dashboard,', 'redrawn.'], '7 layouts · 6 speedometers', 'v4/dock-cockpit.webp', False),
    'trips-fuel-maintenance': (['Know every trip.', 'Miss no service.'], 'Trips · Fuel estimates · Reminders', 'v2/fuel-costs.webp', False),
    'racing': (['LAP TIMING ON THE', 'SCREEN IN YOUR CAR.'], 'Track day · Rally · Performance', None, True),
    'racing-track-day': (['FIND THE TIME', 'YOU’RE LEAVING OUT.'], 'Lap timer · Delta · Ghost car', None, True),
    'racing-rally': (['DRIVE THE RECCE.', 'HEAR THE NOTES.'], 'Stage timer · Pace notes · TSD', None, True),
    'racing-performance': (['0–100. ¼ MILE.', 'ROAD DYNO.'], 'Closed courses only', None, True),
    'wireless-app': (['Your car,', 'in your pocket.'], 'DashLink Wireless · free phone app', None, False),
    'plans': (['Try everything free.', 'Keep what you love.'], 'Free · Drive · Pro', 'v2/home-quick-settings.webp', False),
    'support': (['Here to help.'], 'Compatibility · Troubleshooting · Contact', None, False),
    'terms': (['Terms of use'], 'DashLink · Free · Drive · Pro', None, False),
}

TRACK = [(70, 205), (40, 164), (88, 72), (142, 62), (176, 100), (212, 99), (250, 46), (302, 46), (362, 140), (342, 190), (232, 206), (200, 226), (159, 238), (120, 216), (70, 205)]


def glow(base, color, cx, cy, r, a):
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color + (a,))
    return Image.alpha_composite(base, layer.filter(ImageFilter.GaussianBlur(r * .45)))


def make(key, lines, sub, shot, racing):
    acc = RED if racing else BLUE
    im = Image.new('RGBA', (W, H), (7, 3, 4, 255) if racing else (5, 5, 6, 255))
    im = glow(im, acc, 980, 120, 360, 70)
    im = glow(im, acc, 120, 640, 300, 40)
    if racing:  # faint diagonal stripes, blended on their own layer
        st = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        sd = ImageDraw.Draw(st)
        for x in range(-600, W + 600, 46):
            sd.line([(x, H), (x + 330, 0)], fill=(255, 43, 58, 22), width=2)
        im = Image.alpha_composite(im, st)
    d = ImageDraw.Draw(im)

    head = ImageFont.truetype(F + ('Arial Bold Italic.ttf' if racing else 'Arial Rounded Bold.ttf'), 64 if racing else 66)
    small = ImageFont.truetype(F + 'Arial Bold.ttf', 26)
    brand = ImageFont.truetype(F + 'Arial Rounded Bold.ttf', 40)

    # brand
    d.text((70, 62), 'DashLink', font=brand, fill=(255, 255, 255))
    bw = d.textlength('DashLink', font=brand)
    d.text((70 + bw, 62), '.', font=brand, fill=(255, 90, 98) if racing else acc)
    if racing:
        x = 70 + bw + 34
        d.line([(x, 66), (x, 104)], fill=(255, 255, 255, 90), width=2)
        for i, (h0, h1) in enumerate([(12, 0), (24, 0), (38, 0)]):
            bx = x + 20 + i * 14
            d.polygon([(bx, 104), (bx + 8, 104 - h0), (bx + 14, 104 - h0), (bx + 6, 104)], fill=(230 - (2 - i) * 50, 57 + i * 30, 70 + i * 30))
        d.text((x + 70, 70), 'R A C I N G', font=ImageFont.truetype(F + 'Arial.ttf' if os.path.exists(F + 'Arial.ttf') else F + 'Arial Bold.ttf', 30), fill=(255, 170, 160))

    text_w = 500 if shot else 640 if (racing or key == 'wireless-app') else 1060
    y = 210 if len(lines) == 2 else 250
    for ln in lines:
        size = 66
        f = head
        while d.textlength(ln, font=f) > text_w and size > 40:
            size -= 2
            f = ImageFont.truetype(F + ('Arial Bold Italic.ttf' if racing else 'Arial Rounded Bold.ttf'), size)
        d.text((70, y), ln, font=f, fill=(255, 255, 255))
        y += size + 14
    d.rounded_rectangle((70, y + 26, 70 + d.textlength(sub, font=small) + 36, y + 76), radius=25, fill=acc + (40,), outline=acc + (150,))
    d.text((88, y + 37), sub, font=small, fill=(235, 240, 250))

    if shot:
        s = Image.open(os.path.join(IMG, shot)).convert('RGBA')
        tw = 520
        s = s.resize((tw, int(s.height * tw / s.width)))
        frame = Image.new('RGBA', (s.width + 24, s.height + 24), (24, 27, 34, 255))
        mask = Image.new('L', frame.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0) + frame.size, radius=22, fill=255)
        smask = Image.new('L', s.size, 0)
        ImageDraw.Draw(smask).rounded_rectangle((0, 0) + s.size, radius=12, fill=255)
        frame.paste(s, (12, 12), smask)
        fx, fy = W - frame.width - 50, (H - frame.height) // 2 + 20
        im.paste(frame, (fx, fy), mask)
    elif racing:
        pts = [(760 + x * 1.05, 150 + y * 1.25) for x, y in TRACK]
        d.line(pts, fill=(40, 42, 50), width=26, joint='curve')
        n = len(pts) - 1
        cols = [(178, 107, 255), (58, 210, 159), (255, 204, 51)]
        for i in range(n):
            d.line([pts[i], pts[i + 1]], fill=cols[min(2, i * 3 // n)], width=7, joint='curve')
        d.rectangle((pts[0][0] - 4, pts[0][1] - 16, pts[0][0] + 4, pts[0][1] + 16), fill=(255, 255, 255))
        cx, cy = pts[6]
        d.ellipse((cx - 11, cy - 11, cx + 11, cy + 11), fill=RED)
    elif key == 'wireless-app':
        d.rounded_rectangle((850, 70, 1110, 600), radius=44, fill=(28, 30, 37), outline=(70, 74, 84), width=2)
        d.rounded_rectangle((864, 84, 1096, 586), radius=34, fill=(11, 12, 16))
        d.text((888, 120), 'Library', font=ImageFont.truetype(F + 'Arial Rounded Bold.ttf', 30), fill=(255, 255, 255))
        d.rounded_rectangle((884, 170, 1076, 280), radius=18, fill=(25, 60, 100))
        d.line([(900, 260), (940, 250), (980, 245), (1020, 225), (1060, 200)], fill=(255, 255, 255), width=4)
        for i in range(4):
            d.rounded_rectangle((884, 300 + i * 66, 1076, 352 + i * 66), radius=14, fill=(24, 26, 32))

    os.makedirs(OUT, exist_ok=True)
    im.convert('RGB').save(os.path.join(OUT, key + '.jpg'), quality=86, optimize=True, progressive=True)


if __name__ == '__main__':
    for k, v in PAGES.items():
        make(k, *v)
        print('og', k)
