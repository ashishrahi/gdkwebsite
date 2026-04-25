import { NAVIGATION_CATEGORIES } from "./registry";
import type { NavigationSubcategory } from "./types";

export function getNavigationCategoryByKey(key: string) {
  return NAVIGATION_CATEGORIES.find((c) => c.key === key);
}

export function getNavigationSubcategoryRouteMatch(
  categoryKey: string,
  subcategorySegment: string,
): NavigationSubcategory | undefined {
  const category = getNavigationCategoryByKey(categoryKey);
  if (!category) {
    return undefined;
  }
  return category.subcategories.find((subcategory) => subcategory.slug === subcategorySegment);
}

export function getProductRouteBySlug(productSlug: string) {
  for (const category of NAVIGATION_CATEGORIES) {
    for (const subcategory of category.subcategories) {
      if (subcategory.productSlugs.includes(productSlug)) {
        return `/products/${category.key}/${subcategory.slug}/${productSlug}`;
      }
    }
  }

  return undefined;
}

export function getCategoryProductByLegacyRouteSegment(categoryKey: string, segment: string) {
  const category = getNavigationCategoryByKey(categoryKey);
  if (!category) {
    return undefined;
  }

  for (const subcategory of category.subcategories) {
    if (subcategory.productSlugs.includes(segment)) {
      return {
        category,
        subcategory,
        productSlug: segment,
      };
    }

    const legacyProductSlug = subcategory.legacyProductRouteSlugs?.find((slug) => slug === segment);
    if (legacyProductSlug) {
      return {
        category,
        subcategory,
        productSlug: legacyProductSlug,
      };
    }
  }

  return undefined;
}

export function getNavigationProductDetailMatch(
  categoryKey: string,
  subcategorySlug: string,
  productSlug: string,
) {
  const category = getNavigationCategoryByKey(categoryKey);
  if (!category) {
    return undefined;
  }

  const subcategory = category.subcategories.find((item) => item.slug === subcategorySlug);
  if (!subcategory) {
    return undefined;
  }

  if (!subcategory.productSlugs.includes(productSlug)) {
    return undefined;
  }

  return {
    category,
    subcategory,
    productSlug,
  };
}
