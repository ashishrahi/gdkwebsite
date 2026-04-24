import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductApplications } from "@/components/products/ProductApplications";
import { ProductCTA } from "@/components/products/ProductCTA";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductHero } from "@/components/products/ProductHero";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products-data";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | GDK Packaging",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      type: "website",
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.heroImage,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
      <ProductHero
        category={product.category}
        material={product.material}
        title={product.title}
        shortDescription={product.shortDescription}
        heroImage={product.heroImage}
      />

      <section aria-labelledby="product-overview" className="space-y-3">
        <h2 id="product-overview" className="text-2xl font-semibold tracking-tight text-slate-900">
          Product Details
        </h2>
        <p className="max-w-4xl text-base leading-7 text-slate-700">{product.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {product.variants.map((variant) => (
            <span
              key={variant}
              className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
            >
              {variant}
            </span>
          ))}
        </div>
      </section>

      {product.detailSections?.length ? (
        <section aria-labelledby="product-detail-sections" className="space-y-4">
          <h2
            id="product-detail-sections"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Manufacturing Excellence
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {product.detailSections.map((section) => (
              <article
                key={section.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">{section.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{section.description}</p>
                {section.points?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <ProductGallery title={product.title} items={product.gallery} />
      <ProductFeatures features={product.features} />
      <ProductApplications
        applications={product.applications}
        description={product.applicationsDescription}
      />
      <ProductCTA productTitle={product.title} cta={product.cta} />
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
