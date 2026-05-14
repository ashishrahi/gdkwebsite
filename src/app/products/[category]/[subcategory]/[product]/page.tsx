import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AddToEnquiryButton } from "@/components/enquiry/add-to-enquiry-button";
import { ProductApplications } from "@/components/products/ProductApplications";
import { ProductCTA } from "@/components/products/ProductCTA";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductHero } from "@/components/products/ProductHero";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
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
  const enquiryItem = {
    id: productData.id,
    slug: productData.slug,
    title: productData.title,
    category: productData.category,
    subcategory: productData.material,
    imageSrc: productData.heroImage,
    imageAlt: productData.title,
    href: `/products/${category}/${subcategory}/${productData.slug}`,
    variants: productData.variants,
    variantLabel: productData.variants.length
      ? `${productData.variants.length} variants available`
      : "Variant to be confirmed",
  };

  return (
    <main className="flex w-full flex-1 flex-col gap-10 lg:gap-12">
      <ProductHero
        category={productData.category}
        material={productData.material}
        title={productData.title}
        shortDescription={productData.shortDescription}
        heroText={productData.heroText}
        badges={productData.badges}
        heroImage={productData.heroImage}
      />

      <section aria-labelledby="product-overview" className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="product-overview" className="text-h3 text-ds-text-strong">
            Product Details
          </h2>
          <AddToEnquiryButton
            size="card"
            item={enquiryItem}
            className="w-fit max-w-full px-5"
          />
        </div>
        <p className="max-w-4xl text-body text-ds-text-body">{productData.description}</p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {productData.variants.map((variant) => (
            <span
              key={variant}
              className="rounded-full border border-[color-mix(in_srgb,var(--brand-accent)_25%,var(--border))] bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] px-3.5 py-1.5 text-xs font-medium leading-none tracking-(--ds-type-label-letter-spacing) text-brand-accent"
            >
              {variant}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="product-specifications" className="space-y-5">
        <h2 id="product-specifications" className="text-h3 text-ds-text-strong">
          Specifications
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {productData.specifications.map((spec) => (
            <article
              key={spec.label}
              className={`${cardSurfaceVariants({ variant: "minimal" })} rounded-xl px-5 py-4`}
            >
              <p className="text-xs font-medium tracking-(--ds-type-label-letter-spacing) text-ds-text-subtle uppercase">{spec.label}</p>
              <p className="mt-2 text-body-sm text-ds-text-strong">{spec.value}</p>
            </article>
          ))}
        </div>
      </section>

      {productData.detailSections?.length ? (
        <section aria-labelledby="product-detail-sections" className="space-y-5">
          <h2
            id="product-detail-sections"
            className="text-h3 text-ds-text-strong"
          >
            Manufacturing Excellence
          </h2>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            {productData.detailSections.map((section) => (
              <article
                key={section.id}
                className={cardSurfaceVariants({ variant: "default", padding: "default" })}
              >
                <h3 className="text-h4 text-ds-text-strong">{section.title}</h3>
                <p className="mt-3 text-body-sm text-ds-text-muted">{section.description}</p>
                {section.points?.length ? (
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2 text-body-sm text-ds-text-body">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
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
