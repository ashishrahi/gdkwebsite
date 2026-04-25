import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getNavigationCategoryByKey,
  getProductRouteBySlug,
  NAVIGATION_CATEGORIES,
} from "@/lib/catalog";

type ProductDetailsPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return NAVIGATION_CATEGORIES.map((category) => ({ category: category.key }));
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryItem = getNavigationCategoryByKey(category);

  if (!categoryItem) {
    return {
      title: "Product Not Found | GDK Packaging",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${categoryItem.title} | GDK Packaging`,
    description: categoryItem.description,
    openGraph: {
      title: `${categoryItem.title} | GDK Packaging`,
      description: categoryItem.description,
      type: "website",
      url: `/products/${categoryItem.key}`,
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { category } = await params;
  const categoryItem = getNavigationCategoryByKey(category);

  if (!categoryItem) {
    const legacyProductPath = getProductRouteBySlug(category);
    if (legacyProductPath) {
      redirect(legacyProductPath);
    }
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--brand-accent)] uppercase">
          Product Category
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {categoryItem.title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-600">{categoryItem.description}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Subcategories</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryItem.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={subcategory.href}
              className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-3 p-5">
                <p className="text-xs font-semibold tracking-wider text-[var(--brand-accent)] uppercase">
                  Product Subcategory
                </p>
                <p className="text-xl font-semibold tracking-tight text-slate-900">{subcategory.title}</p>
                {subcategory.description ? (
                  <p className="text-sm leading-6 text-slate-600">{subcategory.description}</p>
                ) : null}
                <p className="text-xs text-slate-500">
                  {subcategory.productSlugs.length} product
                  {subcategory.productSlugs.length === 1 ? "" : "s"}
                </p>
                <span className="inline-flex text-sm font-semibold text-[var(--secondary)] group-hover:underline">
                  Explore Subcategory
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
