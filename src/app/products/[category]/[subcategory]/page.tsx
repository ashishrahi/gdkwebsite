import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getCategoryProductByLegacyRouteSegment,
  getNavigationCategoryByKey,
  getNavigationSubcategoryRouteMatch,
  NAVIGATION_CATEGORIES,
} from "@/lib/catalog";
import { getProductsBySlugs } from "@/lib/products-data";

type ProductSubcategoryPageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export async function generateStaticParams() {
  return NAVIGATION_CATEGORIES.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.key,
      subcategory: subcategory.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductSubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const categoryItem = getNavigationCategoryByKey(category);
  const subcategoryItem = getNavigationSubcategoryRouteMatch(category, subcategory);

  if (!categoryItem || !subcategoryItem) {
    return {
      title: "Subcategory Not Found | GDK Packaging",
      description: "The requested product subcategory could not be found.",
    };
  }

  return {
    title: `${subcategoryItem.title} | ${categoryItem.title} | GDK Packaging`,
    description: subcategoryItem.description ?? categoryItem.description,
  };
}

export default async function ProductSubcategoryPage({ params }: ProductSubcategoryPageProps) {
  const { category, subcategory } = await params;
  const categoryItem = getNavigationCategoryByKey(category);
  const subcategoryItem = getNavigationSubcategoryRouteMatch(category, subcategory);

  if (!categoryItem) {
    notFound();
  }

  if (!subcategoryItem) {
    const legacyProductMatch = getCategoryProductByLegacyRouteSegment(category, subcategory);
    if (legacyProductMatch) {
      redirect(
        `/products/${legacyProductMatch.category.key}/${legacyProductMatch.subcategory.slug}/${legacyProductMatch.productSlug}`,
      );
    }
    notFound();
  }

  const products = getProductsBySlugs(subcategoryItem.productSlugs);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--brand-accent)] uppercase">
          {categoryItem.title}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {subcategoryItem.title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          {subcategoryItem.description ??
            "Select a product to view complete specifications, variants, and application details."}
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.slug}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.heroImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex flex-wrap gap-2">
                {product.badges.slice(0, 2).map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[color:color-mix(in_srgb,var(--brand-accent)_25%,var(--border))] bg-[color:color-mix(in_srgb,var(--brand-accent)_12%,white)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand-accent)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{product.title}</h2>
              <p className="text-sm leading-6 text-slate-600">{product.shortDescription}</p>
              <Link
                href={`/products/${categoryItem.key}/${subcategoryItem.slug}/${product.slug}`}
                className="inline-flex text-sm font-semibold text-[var(--secondary)] hover:underline"
              >
                Explore Product
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
