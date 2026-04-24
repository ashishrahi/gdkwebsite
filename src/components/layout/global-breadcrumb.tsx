"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const toLabel = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export function GlobalBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (!parts.length || parts[0] !== "products") {
    return null;
  }

  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  if (parts[1]) {
    crumbs.push({
      href: `/products/${parts[1]}`,
      label: toLabel(parts[1]),
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-6 pt-28 pb-2">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-slate-900">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-slate-900">
                  {crumb.label}
                </Link>
              )}
              {!isLast ? <span className="text-slate-400">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
