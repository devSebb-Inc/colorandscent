#!/usr/bin/env python3
"""
Upload all 8 designs to Printify and create products.
Fixed upload method: base64 encode image data.
"""
import json
import os
import subprocess
import base64

TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImZjMDE1MjdhZmIwN2M3YTI3OWRlZWM3ZWQzM2U3NmFmZmM5YjYwYzkxYWU5NDE3NzFiZjAxNDE1ZWQ2NTFkY2UzZDUzZTc4ODNhYTU1ODhkIiwiaWF0IjoxNzg1ODcwODM5LjY4MzIxNCwibmJmIjoxNzg1ODcwODM5LjY4MzIxNiwiZXhwIjoxODE3NDA2ODM5LjY3Njk5Mywic3ViIjoiMjY1NzI0MDMiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.SsXRxW8MalJms_en0bOUhpl0YfmZJCa9VhqlbQJKdD6yc5DU_fOZbGmaggrQyMKik1585jT7k35n4Gzo7DHZP3xY9jo88-7fqabKI1gdLLK_GaI98KjEqSJdeqRr2K8MX5buCzZqLqo1dGwZCoNFdndbtHs_chi2_1BWFxOrFRh1q9KIgHhCfHyuEpETUw5Z7mcUYwcsjlzef-hKRbzQMuGRfP7ugvlmlFTfYXxCsBjUnFFS8503irEwT661ELzMfzHxK_QptAjvV1JeV-quJnAc05RdZj-DzCDZO3b7fIMOk-KarmrQ5ZsCXY89N_zBYnY6yTxB_nZyEvJd0MoI8MR8rJ6D6RLtLBLZJ-z5MMPhkvpViFHdYsY04PN0ZXIg8QYXzl2vm6bOYE9jr8L0Z6pMt0RscEwgClGI5pisXWHbUzj4roLbgt6WmIvu37dWYsU3Un7f9ft7C56b0W6hPoNJqEtN5PP3px-obcnBxrtvrogw8OIYT8i-qY1WCbNQ8f5YAcqbqBhdJR9U1o-ZjZnyqGoxYLxtJve9dUVKfqqjHpnSDa2ezJJNyggZXVNvjDeRLZgeXLnIvsKUUhIGSI9UvhAc5pcbkHgPK2uME5pFHFfmglVC_xV9YGJQXSekOe8_BOrs232Ov3sUrzpndBne2FdPyIb4LLECknTaK3M"
SHOP_ID = 28475121
API_URL = "https://api.printify.com/v1"

# Product definitions
PRODUCTS = [
    {
        "name": "Amber Glow",
        "scent": "Warm Amber · Sandalwood · Vanilla",
        "description": "Hand-poured soy candle with warm amber, sandalwood, and vanilla notes.",
        "blueprint_id": 1468,
        "provider_id": 219,
        "variant_id": 105857,
        "width": 900,
        "height": 600,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/01-amber-glow.png",
    },
    {
        "name": "After Hours",
        "scent": "Leather · Labdanum · Cedarwood",
        "description": "Hand-poured soy candle with leather, labdanum, and cedarwood notes.",
        "blueprint_id": 1468,
        "provider_id": 219,
        "variant_id": 105857,
        "width": 900,
        "height": 600,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/02-after-hours.png",
    },
    {
        "name": "Midnight Bloom",
        "scent": "Black Rose · Oud · Patchouli",
        "description": "Hand-poured soy candle with black rose, oud, and patchouli notes.",
        "blueprint_id": 2665,
        "provider_id": 80,
        "variant_id": 147774,
        "width": 913,
        "height": 613,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/03-midnight-bloom.png",
    },
    {
        "name": "Golden Hour",
        "scent": "Honey · Tonka · Amber",
        "description": "Hand-poured soy candle with honey, tonka, and amber notes.",
        "blueprint_id": 755,
        "provider_id": 91,
        "variant_id": 74407,
        "width": 900,
        "height": 600,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/04-golden-hour.png",
    },
    {
        "name": "Calm & Collected",
        "scent": "Lavender · Chamomile · Bergamot",
        "description": "Hand-poured soy candle with lavender, chamomile, and bergamot notes.",
        "blueprint_id": 805,
        "provider_id": 91,
        "variant_id": 76262,
        "width": 900,
        "height": 1125,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/05-calm-collected.png",
    },
    {
        "name": "Soft Life",
        "scent": "Vanilla · Coconut · Sandalwood",
        "description": "Hand-poured soy candle with vanilla, coconut, and sandalwood notes.",
        "blueprint_id": 1657,
        "provider_id": 70,
        "variant_id": 114648,
        "width": 1050,
        "height": 748,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/06-soft-life.png",
    },
    {
        "name": "Fresh Start",
        "scent": "Sea Breeze · Salt · Driftwood",
        "description": "Hand-poured soy candle with sea breeze, salt, and driftwood notes.",
        "blueprint_id": 1379,
        "provider_id": 70,
        "variant_id": 103124,
        "width": 1425,
        "height": 375,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/07-fresh-start.png",
    },
    {
        "name": "Essentials Collection",
        "scent": "Mixed Scents · 4 Piece Set",
        "description": "A curated collection of 4 premium candles in mixed scents.",
        "blueprint_id": 10670,
        "provider_id": 219,
        "variant_id": 397004,
        "width": 600,
        "height": 420,
        "image": "/Users/jessica/.openclaw/workspace/projects/colorandscent/labels/samples/08-essentials.png",
    },
]


def upload_image(image_path):
    """Upload an image to Printify using base64 encoding."""
    with open(image_path, "rb") as f:
        file_data = f.read()
    b64_data = base64.b64encode(file_data).decode("utf-8")
    file_name = os.path.basename(image_path)

    payload = json.dumps({
        "file_name": file_name,
        "contents": b64_data,
    })

    cmd = [
        "curl", "-s", "-X", "POST",
        f"{API_URL}/uploads/images.json",
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", payload,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        data = json.loads(result.stdout)
        if "id" in data:
            print(f"  Uploaded: {data['id']} ({data.get('width', '?')}x{data.get('height', '?')})")
            return data["id"]
        else:
            print(f"  Upload error: {result.stdout[:200]}")
            return None
    except:
        print(f"  Upload error: {result.stdout[:200]}")
        return None


def create_product(product, image_id):
    """Create a product on Printify."""
    product_data = {
        "title": product["name"],
        "description": product["description"],
        "blueprint_id": product["blueprint_id"],
        "print_provider_id": product["provider_id"],
        "variants": [
            {
                "id": product["variant_id"],
                "price": 2499,
                "is_enabled": True,
            }
        ],
        "print_areas": [
            {
                "variant_ids": [product["variant_id"]],
                "placeholders": [
                    {
                        "position": "front",
                        "images": [
                            {
                                "id": image_id,
                                "x": 0.5,
                                "y": 0.5,
                                "scale": 1,
                                "angle": 0,
                            }
                        ],
                    }
                ],
            }
        ],
    }

    cmd = [
        "curl", "-s", "-X", "POST",
        f"{API_URL}/shops/{SHOP_ID}/products.json",
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps(product_data),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        data = json.loads(result.stdout)
        if "id" in data:
            print(f"  Created product: {data['id']} - {data.get('title', '?')}")
            return data["id"]
        else:
            print(f"  Create error: {result.stdout[:300]}")
            return None
    except:
        print(f"  Create error: {result.stdout[:300]}")
        return None


def publish_product(product_id):
    """Publish a product to the store."""
    cmd = [
        "curl", "-s", "-X", "POST",
        f"{API_URL}/shops/{SHOP_ID}/products/{product_id}/publish.json",
        "-H", f"Authorization: Bearer {TOKEN}",
        "-H", "Content-Type: application/json",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        data = json.loads(result.stdout)
        if "status" in data or "success" in str(data).lower():
            print(f"  Published: {product_id}")
            return True
        else:
            print(f"  Publish error: {result.stdout[:300]}")
            return False
    except:
        print(f"  Publish error: {result.stdout[:300]}")
        return False


if __name__ == "__main__":
    print("Starting Printify upload and product creation...")
    print(f"Shop ID: {SHOP_ID}")
    print()

    results = []
    for i, product in enumerate(PRODUCTS, 1):
        print(f"[{i}/8] {product['name']}")
        print(f"  Uploading image: {product['image']}")

        # Upload image
        image_id = upload_image(product["image"])
        if not image_id:
            print(f"  FAILED to upload image for {product['name']}")
            results.append({"name": product["name"], "status": "upload_failed"})
            continue

        # Create product
        print(f"  Creating product...")
        product_id = create_product(product, image_id)
        if not product_id:
            print(f"  FAILED to create product for {product['name']}")
            results.append({"name": product["name"], "status": "create_failed"})
            continue

        # Publish product
        print(f"  Publishing product...")
        published = publish_product(product_id)
        results.append({
            "name": product["name"],
            "status": "published" if published else "publish_failed",
            "product_id": product_id,
            "image_id": image_id,
        })

        print()

    # Summary
    print("=" * 50)
    print("SUMMARY")
    print("=" * 50)
    for r in results:
        print(f"  {r['name']}: {r['status']}")
