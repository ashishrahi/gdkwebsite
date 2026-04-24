import { EnquiryModal } from "@/components/product/enquiry-modal";
import type { ProductCta } from "@/lib/products-data";

type ProductCTAProps = {
  productTitle: string;
  cta: ProductCta;
};

export function ProductCTA({ productTitle, cta }: ProductCTAProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi GDK team, I need details for ${productTitle}. Please share pricing and MOQ.`,
  );

  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
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
          <a
            href="/contact"
            className="inline-flex h-9 items-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            {cta.primaryLabel}
          </a>
          <a
            href="/contact"
            className="inline-flex h-9 items-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {cta.secondaryLabel}
          </a>
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-emerald-300 px-4 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            {cta.whatsappLabel}
          </a>
          <EnquiryModal productName={productTitle} />
        </div>
      </div>
    </section>
  );
}
