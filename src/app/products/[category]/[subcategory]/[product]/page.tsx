import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductApplications } from "@/components/products/ProductApplications";
import { ProductCTA } from "@/components/products/ProductCTA";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductHero } from "@/components/products/ProductHero";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { getNavigationProductDetailMatch, NAVIGATION_CATEGORIES } from "@/lib/catalog";
import { getProductBySlug, getRelatedProducts } from "@/lib/products-data";

type ProductDetailsPageProps = {
  params: Promise<{ category: string; subcategory: string; product: string }>;
};

export async function generateStaticParams() {
  return NAVIGATION_CATEGORIES.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.productSlugs.map((productSlug) => ({
        category: category.key,
        subcategory: subcategory.slug,
        product: productSlug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  const { category, subcategory, product } = await params;
  const detailMatch = getNavigationProductDetailMatch(category, subcategory, product);

  if (!detailMatch) {
    return {
      title: "Product Not Found | GDK Packaging",
      description: "The requested product could not be found.",
    };
  }

  const productData = getProductBySlug(detailMatch.productSlug);
  if (!productData) {
    return {
      title: "Product Not Found | GDK Packaging",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: productData.seo.title,
    description: productData.seo.description,
    keywords: productData.seo.keywords,
    openGraph: {
      title: productData.seo.title,
      description: productData.seo.description,
      type: "website",
      url: `/products/${category}/${subcategory}/${productData.slug}`,
      images: [
        {
          url: productData.heroImage,
          alt: productData.title,
        },
      ],
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { category, subcategory, product } = await params;
  const detailMatch = getNavigationProductDetailMatch(category, subcategory, product);
  if (!detailMatch) {
    notFound();
  }

  const productData = getProductBySlug(detailMatch.productSlug);
  if (!productData) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(productData.slug);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
      <ProductHero
        category={productData.category}
        material={productData.material}
        title={productData.title}
        shortDescription={productData.shortDescription}
        heroText={productData.heroText}
        badges={productData.badges}
        heroImage={productData.heroImage}
      />

      <section aria-labelledby="product-overview" className="space-y-3">
        <h2 id="product-overview" className="text-2xl font-semibold tracking-tight text-slate-900">
          Product Details
        </h2>
        <p className="max-w-4xl text-base leading-7 text-slate-700">{productData.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {productData.variants.map((variant) => (
            <span
              key={variant}
              className="rounded-full border border-[color:color-mix(in_srgb,var(--brand-accent)_25%,var(--border))] bg-[color:color-mix(in_srgb,var(--brand-accent)_12%,white)] px-3 py-1 text-xs font-semibold text-[var(--brand-accent)]"
            >
              {variant}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="product-specifications" className="space-y-4">
        <h2 id="product-specifications" className="text-2xl font-semibold tracking-tight text-slate-900">
          Specifications
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {productData.specifications.map((spec) => (
            <article
              key={spec.label}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{spec.label}</p>
              <p className="mt-1 text-sm leading-6 text-slate-800">{spec.value}</p>
            </article>
          ))}
        </div>
      </section>

      {productData.detailSections?.length ? (
        <section aria-labelledby="product-detail-sections" className="space-y-4">
          <h2
            id="product-detail-sections"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Manufacturing Excellence
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {productData.detailSections.map((section) => (
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
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
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

      <ProductGallery title={productData.title} items={productData.gallery} />
      <ProductFeatures features={productData.features} />
      <ProductApplications
        applications={productData.applications}
        description={productData.applicationsDescription}
      />
      <ProductCTA productTitle={productData.title} cta={productData.cta} />
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
