#!/usr/bin/env python3
"""
Color & Scent — All 8 Product Label Designs
Transparent background PNGs for Printify. Border + text only.
"""
import math
from PIL import Image, ImageDraw, ImageFont

GOLD = (175, 148, 105)
DARK_TEXT = (30, 28, 25)

FONT_SERIF = '/System/Library/Fonts/Supplemental/Georgia.ttf'
FONT_SANS = '/System/Library/Fonts/Helvetica.ttc'

def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def center_text(draw, text, y, font, color, w, letter_spacing=0):
    if letter_spacing > 0:
        total_width = 0
        chars = list(text)
        for char in chars:
            bbox = font.getbbox(char)
            total_width += (bbox[2] - bbox[0]) + letter_spacing
        total_width -= letter_spacing
        x = (w - total_width) / 2
        for char in chars:
            bbox = font.getbbox(char)
            char_w = bbox[2] - bbox[0]
            draw.text((x, y), char, font=font, fill=color)
            x += char_w + letter_spacing
    else:
        bbox = font.getbbox(text)
        text_w = bbox[2] - bbox[0]
        x = (w - text_w) / 2
        draw.text((x, y), text, font=font, fill=color)

def draw_thin_line(draw, x, y, width, color):
    draw.line([(x - width/2, y), (x + width/2, y)], fill=color, width=1)

def draw_border(draw, w, h, color, opacity=0.25):
    bc = (*color, int(255 * opacity))
    m = 30
    draw.line([(m, m), (w - m, m)], fill=bc, width=1)
    draw.line([(m, h - m), (w - m, h - m)], fill=bc, width=1)
    draw.line([(m, m), (m, h - m)], fill=bc, width=1)
    draw.line([(w - m, m), (w - m, h - m)], fill=bc, width=1)
    cl = 16
    for cx, cy, dx, dy in [(m, m, 1, 1), (w-m, m, -1, 1), (m, h-m, 1, -1), (w-m, h-m, -1, -1)]:
        draw.line([(cx, cy), (cx + dx * cl, cy)], fill=bc, width=2)
        draw.line([(cx, cy), (cx, cy + dy * cl)], fill=bc, width=2)

def draw_design(output_path, w, h, candle_name, scent_notes, font_size=78):
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Border
    draw_border(draw, w, h, GOLD, opacity=0.30)

    # Brand name (top)
    brand_font = load_font(FONT_SANS, 11)
    center_text(draw, "COLOR&SCENT", int(h * 0.07), brand_font, (*GOLD, 230), w, letter_spacing=5)

    # Thin line under brand
    draw_thin_line(draw, w/2, int(h * 0.11), 130, (*GOLD, 150))

    # Main title
    title_font = load_font(FONT_SERIF, font_size)
    center_text(draw, candle_name.upper(), int(h * 0.18), title_font, DARK_TEXT, w, letter_spacing=4)

    # Thin line under title
    draw_thin_line(draw, w/2, int(h * 0.35), 240, (*GOLD, 160))

    # Scent description
    scent_font = load_font(FONT_SANS, 14)
    center_text(draw, scent_notes, int(h * 0.39), scent_font, (*GOLD, 240), w, letter_spacing=3)

    # Product details
    detail_font = load_font(FONT_SANS, 11)
    center_text(draw, "SOY WAX · COTTON WICK · HAND-POURED", int(h * 0.46), detail_font, (*DARK_TEXT, 180), w, letter_spacing=3)

    # Thin line
    draw_thin_line(draw, w/2, int(h * 0.52), 180, (*GOLD, 120))

    # Bottom claims
    claims_font = load_font(FONT_SANS, 10)
    center_text(draw, "VEGAN · ECO-FRIENDLY", int(h * 0.56), claims_font, (*GOLD, 220), w, letter_spacing=5)

    # Decorative thin line at bottom
    draw_thin_line(draw, w/2, int(h * 0.61), 100, (*GOLD, 80))

    # Save as transparent RGBA PNG
    final = img.convert('RGBA')
    final.save(output_path, 'PNG')
    print(f"Saved: {output_path}")


if __name__ == '__main__':
    import os
    out_dir = '/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples'
    os.makedirs(out_dir, exist_ok=True)

    # All 8 products with their exact Printify dimensions
    products = [
        ("01-amber-glow", "AMBER GLOW", "WARM AMBER · SANDALWOOD · VANILLA", 900, 600, 78),
        ("02-after-hours", "AFTER HOURS", "LEATHER · LABDANUM · CEDARWOOD", 900, 600, 78),
        ("03-midnight-bloom", "MIDNIGHT BLOOM", "BLACK ROSE · OUD · PATCHOULI", 913, 613, 78),
        ("04-golden-hour", "GOLDEN HOUR", "HONEY · TONKA · AMBER", 900, 600, 78),
        ("05-calm-collected", "CALM & COLLECTED", "LAVENDER · CHAMOMILE · BERGAMOT", 900, 1125, 90),
        ("06-soft-life", "SOFT LIFE", "VANILLA · COCONUT · SANDALWOOD", 1050, 748, 90),
        ("07-fresh-start", "FRESH START", "SEA BREEZE · SALT · DRIFTWOOD", 1425, 375, 60),
        ("08-essentials", "ESSENTIALS COLLECTION", "MIXED SCENTS · 4 PIECE SET", 600, 420, 55),
    ]

    for filename, name, scent, w, h, font_size in products:
        draw_design(f'{out_dir}/{filename}.png', w, h, name, scent, font_size)

    print("\nAll 8 designs generated!")
