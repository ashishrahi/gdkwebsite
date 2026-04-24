import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getProductsByCategory } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "PP Products | GDK Packaging",
  description:
    "Discover premium PP food packaging products from GDK Packaging, including PP Box, PP Container, Meal Box, Round Container, and Pasta Tray.",
  keywords: [
    "pp products",
    "food packaging products",
    "meal box manufacturer",
    "pp container supplier",
    "bulk packaging",
  ],
  openGraph: {
    title: "PP Products | GDK Packaging",
    description:
      "Explore scalable PP product solutions with premium design, reliable quality, and bulk supply support.",
    type: "website",
    url: "/products",
  },
};

export default function ProductsPage() {
  const products = getProductsByCategory("PP Products");

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-10">
      <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-linear-to-br from-white via-orange-50/40 to-white p-8 shadow-sm sm:p-10">
        <div className="relative z-10 space-y-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-orange-600 uppercase">
            GDK Product Range
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            PP Products
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Scalable polypropylene packaging portfolio for food brands, cloud kitchens, restaurants,
            and bulk distributors. Each product page is data-driven and ready for future category
            expansion.
          </p>
          <div className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm text-slate-700">
            Search and filter structure is modular and category-ready.
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Category Overview</h2>
            <p className="text-sm text-slate-600">
              Showing {products.length} PP products. Additional categories can be enabled via
              `products-data.ts`.
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
            Filter-ready architecture
          </div>
        </div>
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
              <p className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
                {product.category}
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{product.title}</h2>
              <p className="text-sm leading-6 text-slate-600">{product.shortDescription}</p>
              <p className="text-xs text-slate-500">{product.variants.length} sizes / variants</p>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex text-sm font-semibold text-[#1450c8] hover:underline"
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
