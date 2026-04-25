import type { Metadata } from "next";
import Link from "next/link";

import { NAVIGATION_CATEGORIES } from "@/lib/catalog";

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

export default function ProductsPage() {
  const featuredCategories = ["thermoforming", "printed-products", "esd-trays"]
    .map((key) => NAVIGATION_CATEGORIES.find((category) => category.key === key))
    .filter((category): category is (typeof NAVIGATION_CATEGORIES)[number] => Boolean(category));

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-10">
      <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-linear-to-br from-white via-orange-50/40 to-white p-8 shadow-sm sm:p-10">
        <div className="relative z-10 space-y-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-orange-600 uppercase">
            GDK Product Range
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Products
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Explore our complete packaging portfolio by top-level category. Choose a category to
            discover subcategories and detailed product pages.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Category Overview</h2>
            <p className="text-sm text-slate-600">
              Browse the three primary product categories available in our catalog.
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
            Category-first navigation
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {featuredCategories.map((category) => (
          <article
            key={category.key}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="space-y-3 p-5">
              <p className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
                Product Category
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{category.title}</h2>
              <p className="text-sm leading-6 text-slate-600">{category.description}</p>
              <p className="text-xs text-slate-500">{category.subcategories.length} subcategories</p>
              <Link
                href={category.href}
                className="inline-flex text-sm font-semibold text-[#1450c8] hover:underline"
              >
                Explore Category
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
