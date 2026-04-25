import type { Metadata } from "next";

/**
 * Product taxonomy labels used in `ProductData` (`src/lib/products-data.ts`).
 * Stable contract for data-layer category assignment.
 */
export type DataCategoryLabel =
  | "PP Products"
  | "PET Products"
  | "Printed Products"
  | "Thermoforming"
  | "ESD Trays";

/** Stable id for a data category (for future routing / filtering). */
export type DataCategoryId =
  | "pp-products"
  | "pet-products"
  | "printed-products"
  | "thermoforming"
  | "esd-trays";

/**
 * One entry in the site navigation mega menu. Keys match legacy route segments
 * under `/products/[category]/...` where applicable.
 */
export type NavigationCategory = {
  key: string;
  title: string;
  description: string;
  href: string;
  subcategories: NavigationSubcategory[];
};

/**
 * A link target in the mega menu (product page, static category page, or alias).
 * Shape is preserved for `product-mega-menu` consumers.
 */
export type NavigationSubcategory = {
  title: string;
  description?: string;
  href: string;
  slug: string;
  productSlugs: string[];
  legacyProductRouteSlugs?: string[];
};

export type CatalogBreadcrumbCrumb = {
  href: string;
  label: string;
};

/** SEO bundle for a static or listing route (Next metadata). */
export type PageSeoBundle = Pick<Metadata, "title" | "description" | "keywords" | "openGraph">;

/** Maps each data category label to its stable id. */
export type DataCategoryLabelToId = Record<DataCategoryLabel, DataCategoryId>;
