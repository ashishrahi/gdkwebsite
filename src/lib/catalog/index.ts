/**
 * Unified product area catalog: navigation groups, data category ids, static SEO, and resolvers.
 * Rich product content stays in `products-data`; routing and nav structure live here.
 */

export type {
  CatalogBreadcrumbCrumb,
  DataCategoryId,
  DataCategoryLabel,
  DataCategoryLabelToId,
  NavigationCategory,
  NavigationSubcategory,
  PageSeoBundle,
} from "./types";

export {
  CATALOG_PAGE_SEO,
  DATA_CATEGORY_ID_TO_LABEL,
  DATA_CATEGORY_LABELS,
  DATA_CATEGORY_LABEL_TO_ID,
  DEFAULT_NAVIGATION_CATEGORY_KEY,
  getCatalogPageMetadata,
  getCatalogPageSeo,
  NAVIGATION_CATEGORIES,
} from "./registry";

export {
  getCategoryProductByLegacyRouteSegment,
  getNavigationCategoryByKey,
  getNavigationProductDetailMatch,
  getNavigationSubcategoryRouteMatch,
  getProductRouteBySlug,
} from "./navigation";

export { getProductsBreadcrumbCrumbs } from "./resolve";
