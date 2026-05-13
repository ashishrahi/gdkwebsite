"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { House, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CatalogBreadcrumbCrumb } from "@/lib/catalog";
import { getProductsBreadcrumbCrumbs } from "@/lib/catalog";

function iconForCrumbIndex(index: number): LucideIcon | null {
  if (index === 0) {
    return House;
  }
  if (index === 1) {
    return Package;
  }
  return null;
}

type GlobalBreadcrumbProps = {
  crumbs?: CatalogBreadcrumbCrumb[];
  className?: string;
  contained?: boolean;
};

export function GlobalBreadcrumb({
  crumbs: providedCrumbs,
  className,
  contained = true,
}: GlobalBreadcrumbProps = {}) {
  const pathname = usePathname();
  const segmentCrumbs = providedCrumbs ?? getProductsBreadcrumbCrumbs(pathname);

  if (!segmentCrumbs.length) {
    return null;
  }

  const crumbs = segmentCrumbs.map((crumb, index) => ({
    ...crumb,
    icon: iconForCrumbIndex(index),
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(contained ? "ds-container pt-6 pb-0 lg:pt-8" : "w-full", className)}
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ds-text-muted">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="inline-flex items-center gap-1.5 font-medium text-(--primary)">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="inline-flex items-center gap-1.5 hover:text-(--primary)">
                  {crumb.icon ? <crumb.icon size={14} strokeWidth={2} className="shrink-0" aria-hidden="true" /> : null}
                  {crumb.label}
                </Link>
              )}
              {!isLast ? <span className="text-[color-mix(in_srgb,var(--brand-blue-500)_55%,var(--ds-text-subtle))]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
