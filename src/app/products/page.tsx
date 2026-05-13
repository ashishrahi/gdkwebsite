import type { Metadata } from "next";

import { BaseProductCard, getProductCardIcon } from "@/components/product/product-card";
import {
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import { NAVIGATION_CATEGORIES } from "@/lib/catalog";
import { getProductsBySlugs } from "@/lib/products-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products | GDK Packaging",
  description:
    "Explore our packaging product categories including Thermoforming, Printed Products, and ESD Trays.",
  openGraph: {
    title: "Products | GDK Packaging",
    description:
      "Explore our packaging product categories including Thermoforming, Printed Products, and ESD Trays.",
    type: "website",
    url: "/products",
  },
};

const fallbackPreviewImage = "/images/esdtray/esdtray.jpg";

function getCategoryPreviewProduct(category: (typeof NAVIGATION_CATEGORIES)[number]) {
  return getProductsBySlugs(
    category.subcategories.flatMap((subcategory) => subcategory.productSlugs)
  )[0];
}

export default function ProductsPage() {
  const featuredCategories = ["thermoforming", "printed-products", "esd-trays"]
    .map((key) => NAVIGATION_CATEGORIES.find((category) => category.key === key))
    .filter((category): category is (typeof NAVIGATION_CATEGORIES)[number] => Boolean(category));

  return (
    <main className="flex w-full flex-1 flex-col gap-10 lg:gap-12">
      <section className={cn(cardSurfaceVariants({ variant: "gradient" }), "rounded-ds-card-lg p-6 sm:p-8 lg:p-10")}>
        <div className="relative z-10 flex flex-col gap-6 lg:gap-7">
          <p className="ds-eyebrow">
            GDK Product Range
          </p>
          <div className="flex max-w-3xl flex-col gap-4 lg:gap-5">
            <h1 className="text-h1 text-ds-text-strong">
              Products
            </h1>
            <p className="text-body-sm font-medium text-ds-text-muted sm:text-body">
              From Concept to Solution.{" "}
              <span className="text-(--primary)">With Sustainability Built In.</span>
            </p>
            <p className="text-body-lg text-ds-text-body">
              Explore our complete packaging portfolio by top-level category. Choose a category to
              discover subcategories and detailed product pages.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className={cn(cardSurfaceVariants({ variant: "minimal", padding: "default" }), "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between")}>
          <div className="space-y-2">
            <h2 className="text-h4 text-ds-text-strong">Category Overview</h2>
            <p className="text-body-sm text-ds-text-muted">
              Browse the three primary product categories available in our catalog.
            </p>
          </div>
          <div className="rounded-lg bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] px-3 py-2 text-xs font-semibold text-brand-accent">
            Category-first navigation
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
        {featuredCategories.map((category) => {
          const previewProduct = getCategoryPreviewProduct(category);

          return (
            <BaseProductCard
              key={category.key}
              href={category.href}
              ariaLabel={`Explore ${category.title}`}
              title={category.title}
              description={category.description}
              meta="Category-first navigation"
              imageSrc={previewProduct?.heroImage ?? fallbackPreviewImage}
              imageAlt={previewProduct?.title ?? category.title}
              icon={getProductCardIcon(category.title)}
              badges={["Product Category"]}
              footerLeading={`${category.subcategories.length} subcategor${
                category.subcategories.length === 1 ? "y" : "ies"
              }`}
              ctaLabel="Explore Category"
            />
          );
        })}
      </section>
    </main>
  );
}
