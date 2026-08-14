#!/usr/bin/env python3
"""
Color & Scent — collection-level transparent PNG label drafts.
Creates one representative source-artwork PNG per collection with actual wording.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path('/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/collections')
OUT.mkdir(parents=True, exist_ok=True)

FONT_SERIF_CANDIDATES = [
    '/System/Library/Fonts/Supplemental/Georgia.ttf',
    '/System/Library/Fonts/Supplemental/Times New Roman.ttf',
]
FONT_ITALIC_CANDIDATES = [
    '/System/Library/Fonts/Supplemental/Georgia Italic.ttf',
    '/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf',
]
FONT_SANS_CANDIDATES = [
    '/System/Library/Fonts/Helvetica.ttc',
    '/System/Library/Fonts/Supplemental/Arial.ttf',
]

def font(candidates, size):
    for p in candidates:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def bbox(draw, text, f):
    return draw.textbbox((0, 0), text, font=f)

def text_w(draw, text, f):
    b = bbox(draw, text, f)
    return b[2] - b[0]

def center(draw, xy, text, f, fill, spacing=0):
    x, y = xy
    if spacing <= 0:
        draw.text((x - text_w(draw, text, f)/2, y), text, font=f, fill=fill)
        return
    chars = list(text)
    total = sum(text_w(draw, c, f) for c in chars) + spacing * (len(chars)-1)
    cx = x - total/2
    for c in chars:
        draw.text((cx, y), c, font=f, fill=fill)
        cx += text_w(draw, c, f) + spacing

def draw_line(draw, x1, y1, x2, y2, fill, width=2):
    draw.line((x1, y1, x2, y2), fill=fill, width=width)

def draw_flower(draw, x, y, scale, color, accent):
    # simple human-feeling line art sprig
    draw_line(draw, x, y, x + 8*scale, y - 42*scale, color, max(1, int(scale)))
    for i, off in enumerate([0, 1, 2]):
        yy = y - (15 + i*12) * scale
        draw.arc((x - (12+i*2)*scale, yy - 8*scale, x + 8*scale, yy + 8*scale), 200, 340, fill=color, width=max(1, int(scale)))
        draw.ellipse((x + (5+i*4)*scale, yy - 10*scale, x + (17+i*4)*scale, yy + 2*scale), outline=accent, width=max(1, int(scale)))

def draw_deco_fan(draw, x, y, r, color):
    for i in range(6):
        angle = -70 + i * 28
        import math
        x2 = x + math.cos(math.radians(angle)) * r
        y2 = y + math.sin(math.radians(angle)) * r
        draw.line((x, y, x2, y2), fill=color, width=max(1, r//45))
    draw.arc((x-r, y-r, x+r, y+r), 200, 340, fill=color, width=max(1, r//35))

def rounded_rect(draw, xy, radius, outline, width):
    draw.rounded_rectangle(xy, radius=radius, outline=outline, width=width)

def write_label(cfg):
    w, h = cfg['size']
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    gold = cfg.get('gold', (175, 148, 105, 230))
    ink = cfg.get('ink', (30, 28, 25, 255))
    accent = cfg.get('accent', (180, 120, 90, 210))

    margin = max(22, int(min(w, h) * 0.065))
    rule = max(2, int(min(w, h) * 0.0045))
    radius = int(min(w, h) * 0.055)

    # Border / outline language
    if cfg['style'] == 'arch':
        # lower rectangle + arch top feel
        draw.arc((margin, margin, w-margin, h*1.25), 180, 360, fill=gold, width=rule)
        draw_line(draw, margin, int(h*0.38), margin, h-margin, gold, rule)
        draw_line(draw, w-margin, int(h*0.38), w-margin, h-margin, gold, rule)
        draw_line(draw, margin, h-margin, w-margin, h-margin, gold, rule)
        draw_deco_fan(draw, margin+int(w*.10), margin+int(h*.15), int(min(w,h)*.09), gold)
        draw_deco_fan(draw, w-margin-int(w*.10), margin+int(h*.15), int(min(w,h)*.09), gold)
    elif cfg['style'] == 'gift':
        # gift-tag outline with clipped top corners
        pts = [(margin+30, margin), (w-margin-30, margin), (w-margin, margin+30), (w-margin, h-margin), (margin, h-margin), (margin, margin+30)]
        draw.line(pts + [pts[0]], fill=gold, width=rule, joint='curve')
        draw.ellipse((w/2-8, margin+12, w/2+8, margin+28), outline=gold, width=rule)
        draw_line(draw, w/2, margin+28, w/2, margin+62, gold, rule)
    else:
        rounded_rect(draw, (margin, margin, w-margin, h-margin), radius, gold, rule)

    # inner hairline
    inset = int(margin * 0.62)
    if cfg['style'] != 'arch':
        rounded_rect(draw, (margin+inset, margin+inset, w-margin-inset, h-margin-inset), max(10, radius//2), (*gold[:3], 120), 1)

    # motifs
    if cfg['motif'] == 'botanical':
        s = max(1.6, min(w, h)/330)
        draw_flower(draw, margin+int(w*.08), h-margin-int(h*.10), s, gold, accent)
        draw_flower(draw, w-margin-int(w*.11), h-margin-int(h*.10), s, gold, accent)
    elif cfg['motif'] == 'quiet':
        draw_line(draw, margin+inset, int(h*.30), w-margin-inset, int(h*.30), (*accent[:3], 140), 1)
        draw_line(draw, margin+inset, int(h*.72), w-margin-inset, int(h*.72), (*accent[:3], 140), 1)
    elif cfg['motif'] == 'gift':
        # bow linework
        cx, cy = w/2, margin+int(h*.14)
        draw.arc((cx-70, cy-32, cx, cy+32), 205, 40, fill=accent, width=2)
        draw.arc((cx, cy-32, cx+70, cy+32), 140, -25, fill=accent, width=2)

    # Type sizing
    brand_f = font(FONT_SANS_CANDIDATES, max(10, int(h * 0.028)))
    collection_f = font(FONT_SANS_CANDIDATES, max(10, int(h * 0.025)))
    title_size = cfg.get('title_size') or max(32, int(min(w, h) * 0.115))
    title_f = font(FONT_SERIF_CANDIDATES, title_size)
    italic_f = font(FONT_ITALIC_CANDIDATES, max(16, int(h * 0.055)))
    note_f = font(FONT_SANS_CANDIDATES, max(12, int(h * 0.035)))
    micro_f = font(FONT_SANS_CANDIDATES, max(10, int(h * 0.026)))

    center(draw, (w/2, int(h*.105)), 'COLOR & SCENT', brand_f, gold, spacing=max(2, int(w*.006)))
    center(draw, (w/2, int(h*.165)), cfg['collection'].upper(), collection_f, (*ink[:3], 160), spacing=max(1, int(w*.003)))
    draw_line(draw, int(w*.36), int(h*.235), int(w*.64), int(h*.235), (*gold[:3], 150), 1)

    # Wrap title if needed
    title = cfg['title'].upper()
    if text_w(draw, title, title_f) > w - 2*(margin+inset+10):
        words = title.split()
        if len(words) > 1:
            line1 = ' '.join(words[:len(words)//2])
            line2 = ' '.join(words[len(words)//2:])
            center(draw, (w/2, int(h*.285)), line1, title_f, ink, spacing=max(1, int(w*.003)))
            center(draw, (w/2, int(h*.285)+title_size*1.03), line2, title_f, ink, spacing=max(1, int(w*.003)))
        else:
            center(draw, (w/2, int(h*.34)), title, title_f, ink, spacing=1)
    else:
        center(draw, (w/2, int(h*.34)), title, title_f, ink, spacing=max(1, int(w*.004)))

    center(draw, (w/2, int(h*.545)), cfg['scent'].upper(), note_f, gold, spacing=max(1, int(w*.0025)))
    center(draw, (w/2, int(h*.635)), cfg['line'], italic_f, (*ink[:3], 210))
    draw_line(draw, int(w*.40), int(h*.735), int(w*.60), int(h*.735), (*gold[:3], 130), 1)
    center(draw, (w/2, int(h*.785)), cfg['detail'].upper(), micro_f, (*ink[:3], 170), spacing=max(1, int(w*.002)))
    center(draw, (w/2, int(h*.855)), 'NATURAL SOY WAX · COTTON WICK · UNPUBLISHED DRAFT ARTWORK', micro_f, (*gold[:3], 190), spacing=max(1, int(w*.0015)))

    out = OUT / cfg['filename']
    img.save(out, 'PNG')
    return out

configs = [
    dict(filename='core-everyday-amber-glow-900x600.png', size=(900,600), collection='Core / Everyday', title='Amber Glow', scent='vanilla bean · amber · cinnamon', line='A candle for rooms that need a little amber.', detail='9 oz · warm daily ritual', style='rounded', motif='botanical', accent=(184,121,93,210), title_size=74),
    dict(filename='after-dark-after-hours-900x600.png', size=(900,600), collection='After Dark / Moody', title='After Hours', scent='blackberry · jasmine · musk', line='For the hour when the lamps come on.', detail='9 oz · late-night atmosphere', style='arch', motif='deco', ink=(35,25,44,255), gold=(175,148,105,235), accent=(139,92,246,210), title_size=78),
    dict(filename='soft-life-calm-soft-life-1050x748.png', size=(1050,748), collection='Soft Life / Calm', title='Soft Life', scent='coconut milk · fig · warm linen', line='Choose softness. Light slowly.', detail='11 oz · quiet room ritual', style='rounded', motif='quiet', ink=(39,54,45,255), gold=(126,161,138,230), accent=(34,211,238,180), title_size=92),
    dict(filename='giftable-occasion-essentials-600x420.png', size=(600,420), collection='Giftable / Occasion', title='Essentials Collection', scent='amber glow · golden hour · fresh start', line='A little light, beautifully wrapped.', detail='3 mini candles · gift-ready set', style='gift', motif='gift', ink=(46,35,29,255), gold=(175,148,105,235), accent=(184,121,93,210), title_size=46),
]

if __name__ == '__main__':
    for cfg in configs:
        path = write_label(cfg)
        print(path)
    print(f'Created {len(configs)} collection label PNG drafts in {OUT}')
