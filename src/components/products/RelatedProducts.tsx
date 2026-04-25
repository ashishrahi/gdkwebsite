import Link from "next/link";

import { getProductRouteBySlug } from "@/lib/catalog";
import type { ProductData } from "@/lib/products-data";

type RelatedProductsProps = {
  products: ProductData[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-products" className="space-y-4">
      <h2 id="related-products" className="text-2xl font-semibold tracking-tight text-slate-900">
        Related Products
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.slug}
            className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
            <Link
              href={getProductRouteBySlug(product.slug) ?? `/products/${product.slug}`}
              className="mt-3 inline-flex text-sm font-semibold text-[var(--secondary)] hover:underline"
            >
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
