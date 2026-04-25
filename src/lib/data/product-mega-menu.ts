import {
  DEFAULT_NAVIGATION_CATEGORY_KEY,
  getNavigationCategoryByKey,
  getNavigationSubcategoryRouteMatch,
  NAVIGATION_CATEGORIES,
  type NavigationCategory,
  type NavigationSubcategory,
} from "@/lib/catalog";

/** @deprecated Use `NavigationSubcategory` from `@/lib/catalog` in new code. */
export type MegaMenuProduct = NavigationSubcategory;

/** @deprecated Use `NavigationCategory` from `@/lib/catalog` in new code. */
export type MegaMenuCategory = NavigationCategory;

export const PRODUCT_MEGA_MENU_CATEGORIES: readonly NavigationCategory[] = NAVIGATION_CATEGORIES;

export const DEFAULT_PRODUCT_MEGA_MENU_CATEGORY_KEY = DEFAULT_NAVIGATION_CATEGORY_KEY;

export function getMegaMenuCategoryByKey(key: string) {
  return getNavigationCategoryByKey(key);
}

export function getMegaMenuProductRouteMapping(category: string, product: string) {
  return getNavigationSubcategoryRouteMatch(category, product);
}
