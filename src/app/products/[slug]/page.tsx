import { notFound } from "next/navigation";

import { EnquiryModal } from "@/components/product/enquiry-modal";
import { mockProducts } from "@/lib/data/products";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="space-y-3">
        <p className="text-sm font-semibold tracking-wide text-secondary uppercase">
          {product.category}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
        <p className="text-muted-foreground">{product.description}</p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <EnquiryModal productName={product.name} />
        </div>
      </section>
    </main>
  );
}
