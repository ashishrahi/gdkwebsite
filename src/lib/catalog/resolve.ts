import { getProductBySlug } from "@/lib/products-data";

import {
  getNavigationCategoryByKey,
  getNavigationProductDetailMatch,
  getNavigationSubcategoryRouteMatch,
} from "./navigation";
import type { CatalogBreadcrumbCrumb } from "./types";

const toLabel = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

/**
 * Breadcrumb trail for `/products/...` paths. Labels for catalog products with detail pages
 * still resolve from `ProductData` via `getProductBySlug` to avoid duplicating display titles.
 */
export function getProductsBreadcrumbCrumbs(pathname: string): CatalogBreadcrumbCrumb[] {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length || parts[0] !== "products") {
    return [];
  }

  const crumbs: CatalogBreadcrumbCrumb[] = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  if (parts[1]) {
    const categoryMatch = getNavigationCategoryByKey(parts[1]);
    const productMatch = getProductBySlug(parts[1]);
    crumbs.push({
      href: `/products/${parts[1]}`,
      label: categoryMatch?.title ?? productMatch?.title ?? toLabel(parts[1]),
    });
  }

  const segment1 = parts[1];
  const segment2 = parts[2];
  if (segment1 && segment2) {
    const nestedSubcategory = getNavigationSubcategoryRouteMatch(segment1, segment2);
    crumbs.push({
      href: `/products/${segment1}/${segment2}`,
      label: nestedSubcategory?.title ?? toLabel(segment2),
    });
  }

  const segment3 = parts[3];
  if (segment1 && segment2 && segment3) {
    const detailMatch = getNavigationProductDetailMatch(segment1, segment2, segment3);
    const product = getProductBySlug(detailMatch?.productSlug ?? segment3);
    crumbs.push({
      href: `/products/${segment1}/${segment2}/${segment3}`,
      label: product?.title ?? toLabel(segment3),
    });
  }

  return crumbs;
}
