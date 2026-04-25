import Image from "next/image";

import type { ProductGalleryItem } from "@/lib/products-data";

type ProductGalleryProps = {
  title: string;
  items: ProductGalleryItem[];
};

export function ProductGallery({ title, items }: ProductGalleryProps) {
  return (
    <section aria-labelledby="product-gallery" className="space-y-4">
      <div className="space-y-1">
        <h2 id="product-gallery" className="text-2xl font-semibold tracking-tight text-slate-900">
          Sizes & Variants
        </h2>
        <p className="text-sm text-slate-600">Available formats for {title} with scalable supply.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <figure
            key={`${item.label}-${index}`}
            className="group overflow-hidden rounded-2xl border border-[color:color-mix(in_srgb,var(--brand-accent)_20%,var(--border))] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-52 bg-slate-100">
            <Image
              src={item.image}
              alt={`${title} - ${item.label}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm font-semibold text-slate-800">{item.label}</span>
              <span className="text-xs text-[var(--brand-accent)]">Available</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
