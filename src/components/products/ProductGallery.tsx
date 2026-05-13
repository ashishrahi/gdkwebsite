import Image from "next/image";

import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import type { ProductGalleryItem } from "@/lib/products-data";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  title: string;
  items: ProductGalleryItem[];
};

export function ProductGallery({ title, items }: ProductGalleryProps) {
  return (
    <section aria-labelledby="product-gallery" className="space-y-5">
      <div className="space-y-2">
        <h2 id="product-gallery" className="text-h3 text-ds-text-strong">
          Sizes & Variants
        </h2>
        <p className="text-sm text-ds-text-muted">Available formats for {title} with scalable supply.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <figure
            key={`${item.label}-${index}`}
            className={cn("group", cardSurfaceVariants({ variant: "interactive" }))}
          >
            <div className="relative h-48 overflow-hidden bg-ds-surface-muted">
            <Image
              src={item.image}
              alt={`${title} - ${item.label}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-sm font-semibold text-ds-text-strong">{item.label}</span>
              <span className="text-xs text-[var(--color-success)]">Available</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
