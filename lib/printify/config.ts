// ============================================================
// PRINTIFY PRODUCT CONFIGURATION
// ============================================================
// Blueprint 706: Unisex Garment-Dyed T-shirt
// Provider 99: Printify Choice
// Colors: 17 enabled Printify colors
// Sizes: mixed availability by color (S-4XL where enabled)
// ============================================================

export interface PrintifyProductConfig {
  slug: string
  printifyProductId: string
  blueprintId: number
  printProviderId: number
  variantMapping: Record<string, number>
  printAreas: {
    front: {
      src: string
      scale: number
      x: number
      y: number
    }
  }
}

// Shared variant mapping — same for all products (same blueprint + provider)
const SHARED_VARIANT_MAPPING: Record<string, number> = {
  // Black
  "Black / S": 73196,
  "Black / M": 73200,
  "Black / L": 73204,
  "Black / XL": 73208,
  "Black / 2XL": 73212,
  "Black / 3XL": 79114,
  "Black / 4XL": 101423,
  // Blossom
  "Blossom / S": 78886,
  "Blossom / M": 78887,
  "Blossom / L": 78888,
  "Blossom / XL": 78889,
  "Blossom / 2XL": 78890,
  "Blossom / 3XL": 79115,
  "Blossom / 4XL": 101424,
  // Blue Spruce
  "Blue Spruce / S": 78896,
  "Blue Spruce / M": 78897,
  "Blue Spruce / L": 78898,
  "Blue Spruce / XL": 78899,
  "Blue Spruce / 2XL": 78900,
  "Blue Spruce / 3XL": 79117,
  "Blue Spruce / 4XL": 101426,
  // Chili
  "Chili / S": 78926,
  "Chili / M": 78927,
  "Chili / L": 78928,
  "Chili / XL": 78929,
  "Chili / 2XL": 78930,
  "Chili / 3XL": 79125,
  "Chili / 4XL": 101434,
  // Espresso
  "Espresso / S": 102352,
  "Espresso / M": 102353,
  "Espresso / L": 102354,
  "Espresso / XL": 102355,
  "Espresso / 2XL": 102356,
  // Grape
  "Grape / S": 78956,
  "Grape / M": 78957,
  "Grape / L": 78958,
  "Grape / XL": 78959,
  "Grape / 2XL": 78960,
  "Grape / 3XL": 79134,
  "Grape / 4XL": 101442,
  // Hemp
  "Hemp / S": 78981,
  "Hemp / M": 78982,
  "Hemp / L": 78983,
  "Hemp / XL": 78984,
  "Hemp / 2XL": 78985,
  "Hemp / 3XL": 79139,
  "Hemp / 4XL": 101447,
  // Khaki
  "Khaki / S": 78996,
  "Khaki / M": 78997,
  "Khaki / L": 78998,
  "Khaki / XL": 78999,
  "Khaki / 2XL": 79000,
  "Khaki / 3XL": 79143,
  "Khaki / 4XL": 101451,
  // Moss
  "Moss / S": 79021,
  "Moss / M": 79022,
  "Moss / L": 79023,
  "Moss / XL": 79024,
  "Moss / 2XL": 79025,
  "Moss / 3XL": 79149,
  "Moss / 4XL": 101457,
  // Mustard
  "Mustard / S": 79026,
  "Mustard / M": 79027,
  "Mustard / L": 79028,
  "Mustard / XL": 79029,
  "Mustard / 2XL": 79030,
  "Mustard / 3XL": 79150,
  // Navy
  "Navy / S": 73197,
  "Navy / M": 73201,
  "Navy / L": 73205,
  "Navy / XL": 73209,
  "Navy / 2XL": 73213,
  "Navy / 3XL": 79152,
  "Navy / 4XL": 101460,
  // Seafoam
  "Seafoam / S": 78951,
  "Seafoam / M": 78952,
  "Seafoam / L": 78953,
  "Seafoam / XL": 78954,
  "Seafoam / 2XL": 78955,
  // Topaz Blue
  "Topaz Blue / 4XL": 101470,
  // True Navy
  "True Navy / S": 79081,
  "True Navy / M": 79082,
  "True Navy / L": 79083,
  "True Navy / XL": 79084,
  "True Navy / 2XL": 79085,
  "True Navy / 3XL": 79164,
  "True Navy / 4XL": 101471,
  // Washed Denim
  "Washed Denim / S": 79096,
  "Washed Denim / M": 79097,
  "Washed Denim / L": 79098,
  "Washed Denim / XL": 79099,
  "Washed Denim / 2XL": 79100,
  "Washed Denim / 3XL": 79167,
  "Washed Denim / 4XL": 101474,
  // White
  "White / S": 73199,
  "White / M": 73203,
  "White / L": 73207,
  "White / XL": 73211,
  "White / 2XL": 73215,
  "White / 3XL": 79169,
  "White / 4XL": 101476,
  // Yam
  "Yam / S": 79106,
  "Yam / M": 79107,
  "Yam / L": 79108,
  "Yam / XL": 79109,
  "Yam / 2XL": 79110,
}

export const PRINTIFY_PRODUCT_MAP: PrintifyProductConfig[] = [
  {
    slug: "the-ramen-connoisseur",
    printifyProductId: "69c225452cba662fc405f349",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "black-cat-ramen",
    printifyProductId: "69c225542ca6824bb9045213",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "warriors-feast",
    printifyProductId: "69c225672e38f3660f002027",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "city-sized-hunger",
    printifyProductId: "69c2257c2e38f3660f00202a",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "dragon-noodle-spirit",
    printifyProductId: "69c2258e65f2255f8f0faf2b",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "capybara-ramen",
    printifyProductId: "69c2259e65f2255f8f0faf2e",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "fox-husky-ramen",
    printifyProductId: "69c225a865f2255f8f0faf3c",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "ramen-frog",
    printifyProductId: "69c225b82ca6824bb9045237",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "samurai-cat-retro",
    printifyProductId: "69c225cb7fb825d7240251e7",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
]
