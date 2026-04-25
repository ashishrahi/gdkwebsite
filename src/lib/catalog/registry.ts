import type { Metadata } from "next";

import type {
  DataCategoryId,
  DataCategoryLabel,
  DataCategoryLabelToId,
  NavigationCategory,
  PageSeoBundle,
} from "./types";

/** Single source of truth: data-layer category labels (order matches previous `products-data` export). */
export const DATA_CATEGORY_LABELS: readonly DataCategoryLabel[] = [
  "PP Products",
  "PET Products",
  "Printed Products",
  "Thermoforming",
  "ESD Trays",
] as const;

export const DATA_CATEGORY_LABEL_TO_ID: DataCategoryLabelToId = {
  "PP Products": "pp-products",
  "PET Products": "pet-products",
  "Printed Products": "printed-products",
  Thermoforming: "thermoforming",
  "ESD Trays": "esd-trays",
};

export const DATA_CATEGORY_ID_TO_LABEL: Record<DataCategoryId, DataCategoryLabel> = {
  "pp-products": "PP Products",
  "pet-products": "PET Products",
  "printed-products": "Printed Products",
  thermoforming: "Thermoforming",
  "esd-trays": "ESD Trays",
};

/**
 * Full navigation / mega menu + legacy nested-route matrix.
 * Preserves exact URLs, titles, and `legacyRouteSlugs` from the prior `product-mega-menu` module.
 */
export const NAVIGATION_CATEGORIES: readonly NavigationCategory[] = [
  {
    key: "esd-trays",
    title: "ESD Trays",
    description: "Electrostatic-safe trays engineered for sensitive electronics handling.",
    href: "/products/esd-trays",
    subcategories: [
      {
        title: "ESD Trays",
        description: "Precision anti-static trays for PCB, IC, and electronics component workflows.",
        href: "/products/esd-trays/esd-trays",
        slug: "esd-trays",
        productSlugs: ["pcb-tray", "component-tray", "ic-tray", "stackable-esd-tray"],
      },
    ],
  },
  {
    key: "thermoforming",
    title: "Thermoforming",
    description: "High-precision thermoformed packaging for food and industrial products.",
    href: "/products/thermoforming",
    subcategories: [
      {
        title: "PP Containers",
        description: "Food-grade PP containers for takeaway, meal delivery, and organized serving.",
        href: "/products/thermoforming/pp-containers",
        slug: "pp-containers",
        productSlugs: ["pp-box", "pp-container", "meal-box", "round-container", "pasta-tray"],
      },
      {
        title: "PET Containers",
        description: "High-clarity PET range for fresh food display and retail-ready cold packaging.",
        href: "/products/thermoforming/pet-containers",
        slug: "pet-containers",
        productSlugs: [
          "pet-hinged-box",
          "sauce-container",
          "cookies-tray",
          "salad-bowl",
          "dessert-cup",
        ],
      },
      {
        title: "IML Sweet Box",
        description: "Premium in-mold labeled packaging for festive sweets and dry fruit assortments.",
        href: "/products/thermoforming/iml-sweet-box",
        slug: "iml-sweet-box",
        productSlugs: ["premium-sweet-box", "dry-fruit-box", "mithai-tray"],
      },
    ],
  },
  {
    key: "printed-products",
    title: "Printed Products",
    description: "Premium print-finish packaging solutions for brand-forward applications.",
    href: "/products/printed-products",
    subcategories: [
      {
        title: "Printed Boxes",
        description: "Custom printed corrugated and carton boxes for retail, shipping, and branding.",
        href: "/products/printed-products/printed-boxes",
        slug: "printed-boxes",
        productSlugs: ["corrugated-box", "duplex-box", "mono-carton", "retail-box", "shipping-box"],
      },
    ],
  },
] as const;

export const DEFAULT_NAVIGATION_CATEGORY_KEY = "thermoforming" as const;

type StaticSeoKey = "/products" | "/products/printed-products";

/**
 * Central SEO for listing / static product-area pages (not per-product `ProductData.seo`).
 * Values are copied from existing pages — keep in sync when content intentionally changes.
 */
export const CATALOG_PAGE_SEO: Record<StaticSeoKey, PageSeoBundle> = {
  "/products": {
    title: "PP Products | GDK Packaging",
    description:
      "Discover premium PP food packaging products from GDK Packaging, including PP Box, PP Container, Meal Box, Round Container, and Pasta Tray.",
    keywords: [
      "pp products",
      "food packaging products",
      "meal box manufacturer",
      "pp container supplier",
      "bulk packaging",
    ],
    openGraph: {
      title: "PP Products | GDK Packaging",
      description:
        "Explore scalable PP product solutions with premium design, reliable quality, and bulk supply support.",
      type: "website",
      url: "/products",
    },
  },
  "/products/printed-products": {
    title: "Printed Products | GDK Packaging",
    description:
      "Premium custom printed packaging solutions for dairy, sweets, snacks, retail, and FMCG brands.",
    keywords: [
      "printed products packaging",
      "custom printed cups",
      "biscuit wrappers manufacturer",
      "fmcg printed pouches",
      "retail printed packaging",
    ],
    openGraph: {
      title: "Printed Products | GDK Packaging",
      description:
        "Premium custom printed packaging solutions that elevate shelf presence, brand recall, and customer experience.",
      type: "website",
      url: "/products/printed-products",
      images: [
        {
          url: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=1800&q=80",
          alt: "Premium printed packaging products",
        },
      ],
    },
  },
};

export function getCatalogPageSeo(path: StaticSeoKey): PageSeoBundle {
  return CATALOG_PAGE_SEO[path];
}

/** Next.js `metadata` object for static catalog pages. */
export function getCatalogPageMetadata(path: StaticSeoKey): Metadata {
  return CATALOG_PAGE_SEO[path] as Metadata;
}
