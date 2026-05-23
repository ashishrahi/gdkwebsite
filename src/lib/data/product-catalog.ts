export type CatalogProduct = {
  name: string;
  dimension: string | null;
};

export type ProductCategoryGroup = {
  category: string;
  products: CatalogProduct[];
};

export const productCategories: ProductCategoryGroup[] = [
  {
    category: "HINGED BOX (PP)",
    products: [
      { name: "250", dimension: "128X113X34" },
      { name: "375", dimension: "128X113X50" },
      { name: "500", dimension: "128X113X66" },
      { name: "FLAT 500", dimension: "178X128X43.5" },
      { name: "600", dimension: "178X128X43.5" },
      { name: "750", dimension: "178X128X54.5" },
      { name: "1000", dimension: "178X128X72" },
    ],
  },
  {
    category: "COOKIES TRAY",
    products: [
      { name: "300", dimension: "217X113X54" },
      { name: "200", dimension: "164X193X55" },
    ],
  },
  {
    category: "ROUND CONTAINER (PP)",
    products: [
      { name: "500", dimension: "122X61" },
      { name: "350 OCTA", dimension: "122X42" },
      { name: "500 OCTA", dimension: "122X66" },
      { name: "750 OCTA", dimension: "122X94.5" },
      { name: "1000 OCTA", dimension: "122X135" },
      { name: "1000 ROUND", dimension: "122X128" },
    ],
  },
  {
    category: "IML",
    products: [{ name: "WHITE TUB", dimension: "147X147X78" }],
  },
  {
    category: "TRAY",
    products: [{ name: "RASMLAI TRAY", dimension: null }],
  },
];

/** Maps product detail slugs to a single catalog category for filtered size tables. */
export const PRODUCT_SLUG_CATALOG_CATEGORY: Partial<Record<string, string>> = {
  "pp-box": "HINGED BOX (PP)",
  "cookies-tray": "COOKIES TRAY",
  "round-container": "ROUND CONTAINER (PP)",
  "premium-sweet-box": "IML",
};

export function getProductCategoryByName(categoryName: string): ProductCategoryGroup | undefined {
  return productCategories.find((group) => group.category === categoryName);
}

export function getCatalogCategoriesForProductSlug(slug: string): ProductCategoryGroup[] {
  const categoryName = PRODUCT_SLUG_CATALOG_CATEGORY[slug];
  if (!categoryName) {
    return [];
  }

  const group = getProductCategoryByName(categoryName);
  return group ? [group] : [];
}
