import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AddToEnquiryButton } from "@/components/enquiry/add-to-enquiry-button";
import { BaseProductCard, getProductCardIcon } from "@/components/product/product-card";
import {
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import {
  getCategoryProductByLegacyRouteSegment,
  getNavigationCategoryByKey,
  getNavigationSubcategoryRouteMatch,
  NAVIGATION_CATEGORIES,
} from "@/lib/catalog";
import { getProductsBySlugs } from "@/lib/products-data";

type ProductSubcategoryPageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export async function generateStaticParams() {
  return NAVIGATION_CATEGORIES.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.key,
      subcategory: subcategory.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductSubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const categoryItem = getNavigationCategoryByKey(category);
  const subcategoryItem = getNavigationSubcategoryRouteMatch(category, subcategory);

  if (!categoryItem || !subcategoryItem) {
    return {
      title: "Subcategory Not Found | GDK Packaging",
      description: "The requested product subcategory could not be found.",
    };
  }

  return {
    title: `${subcategoryItem.title} | ${categoryItem.title} | GDK Packaging`,
    description: subcategoryItem.description ?? categoryItem.description,
  };
}

export default async function ProductSubcategoryPage({ params }: ProductSubcategoryPageProps) {
  const { category, subcategory } = await params;
  const categoryItem = getNavigationCategoryByKey(category);
  const subcategoryItem = getNavigationSubcategoryRouteMatch(category, subcategory);

  if (!categoryItem) {
    notFound();
  }

  if (!subcategoryItem) {
    const legacyProductMatch = getCategoryProductByLegacyRouteSegment(category, subcategory);
    if (legacyProductMatch) {
      redirect(
        `/products/${legacyProductMatch.category.key}/${legacyProductMatch.subcategory.slug}/${legacyProductMatch.productSlug}`,
      );
    }
    notFound();
  }

  const products = getProductsBySlugs(subcategoryItem.productSlugs);

  return (
    <main className="flex w-full flex-1 flex-col gap-10 lg:gap-12">
      <section className={cardSurfaceVariants({ variant: "gradient", padding: "xl" })}>
        <div className="flex flex-col gap-6 lg:gap-7">
          <p className="ds-eyebrow">
            {categoryItem.title}
          </p>
          <div className="flex max-w-3xl flex-col gap-4 lg:gap-5">
            <h1 className="text-h1 text-ds-text-strong">
              {subcategoryItem.title}
            </h1>
            <p className="text-body-lg text-ds-text-body">
              {subcategoryItem.description ??
                "Select a product to view complete specifications, variants, and application details."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
        {products.map((product) => {
          const href = `/products/${categoryItem.key}/${subcategoryItem.slug}/${product.slug}`;

          return (
            <BaseProductCard
              key={product.slug}
              href={href}
              ariaLabel={`Explore ${product.title}`}
              title={product.title}
              description={product.shortDescription}
              meta={product.category}
              imageSrc={product.heroImage}
              imageAlt={product.title}
              icon={getProductCardIcon(`${product.category} ${product.title}`)}
              badges={product.badges}
              footerLeading={product.material}
              ctaLabel="Explore Product"
              action={
                <AddToEnquiryButton
                  size="card"
                  item={{
                    id: product.id,
                    slug: product.slug,
                    title: product.title,
                    category: product.category,
                    subcategory: product.material,
                    imageSrc: product.heroImage,
                    imageAlt: product.title,
                    href,
                    variants: product.variants,
                    variantLabel: product.variants.length
                      ? `${product.variants.length} variants available`
                      : "Variant to be confirmed",
                  }}
                />
              }
            />
          );
        })}
      </section>
    </main>
  );
}
