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
};

export function GlobalBreadcrumb({ crumbs: providedCrumbs, className }: GlobalBreadcrumbProps = {}) {
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
    <nav aria-label="Breadcrumb" className={cn("mx-auto w-full max-w-7xl px-6 pt-28 pb-2", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="inline-flex items-center gap-1.5 font-medium text-[var(--primary)]">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="inline-flex items-center gap-1.5 hover:text-[var(--primary)]">
                  {crumb.icon ? <crumb.icon size={14} strokeWidth={2} className="shrink-0" aria-hidden="true" /> : null}
                  {crumb.label}
                </Link>
              )}
              {!isLast ? <span className="text-[color:color-mix(in_srgb,var(--secondary)_45%,#94a3b8)]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
