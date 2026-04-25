import { EnquiryModal } from "@/components/product/enquiry-modal";
import type { ProductCta } from "@/lib/products-data";
import Link from "next/link";

type ProductCTAProps = {
  productTitle: string;
  cta: ProductCta;
};

export function ProductCTA({ productTitle, cta }: ProductCTAProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi GDK team, I need details for ${productTitle}. Please share pricing and MOQ.`,
  );

  return (
    <section className="rounded-2xl border border-[color:color-mix(in_srgb,var(--brand-accent)_22%,var(--border))] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {cta.title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            {cta.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/contact"
            className="inline-flex h-9 items-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white! transition-colors hover:bg-orange-600"
          >
            {cta.primaryLabel}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-9 items-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-semibold text-orange-600 transition-colors hover:border-orange-400"
          >
            {cta.secondaryLabel}
          </Link>
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-green-400 bg-white px-4 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50"
          >
            {cta.whatsappLabel}
          </a>
          <EnquiryModal productName={productTitle} />
        </div>
      </div>
    </section>
  );
}
