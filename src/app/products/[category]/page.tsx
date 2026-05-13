import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BaseProductCard, getProductCardIcon } from "@/components/product/product-card";
import {
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import {
  getNavigationCategoryByKey,
  getProductRouteBySlug,
  NAVIGATION_CATEGORIES,
} from "@/lib/catalog";
import { getProductsBySlugs } from "@/lib/products-data";

type ProductDetailsPageProps = {
  params: Promise<{ category: string }>;
};

const fallbackPreviewImage = "/images/esdtray/esdtray.jpg";

export async function generateStaticParams() {
  return NAVIGATION_CATEGORIES.map((category) => ({ category: category.key }));
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryItem = getNavigationCategoryByKey(category);

  if (!categoryItem) {
    return {
      title: "Product Not Found | GDK Packaging",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${categoryItem.title} | GDK Packaging`,
    description: categoryItem.description,
    openGraph: {
      title: `${categoryItem.title} | GDK Packaging`,
      description: categoryItem.description,
      type: "website",
      url: `/products/${categoryItem.key}`,
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { category } = await params;
  const categoryItem = getNavigationCategoryByKey(category);

  if (!categoryItem) {
    const legacyProductPath = getProductRouteBySlug(category);
    if (legacyProductPath) {
      redirect(legacyProductPath);
    }
    notFound();
  }

  return (
    <main className="flex w-full flex-1 flex-col gap-10 lg:gap-12">
      <section className={cardSurfaceVariants({ variant: "gradient", padding: "xl" })}>
        <div className="flex flex-col gap-6 lg:gap-7">
          <p className="ds-eyebrow">
            Product Category
          </p>
          <div className="flex max-w-3xl flex-col gap-4 lg:gap-5">
            <h1 className="text-h1 text-ds-text-strong">
              {categoryItem.title}
            </h1>
            <p className="text-body-lg text-ds-text-body">{categoryItem.description}</p>
          </div>
        </div>
      </section>

      <section className="space-y-7 lg:space-y-8">
        <h2 className="text-h3 text-ds-text-strong">Subcategories</h2>
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categoryItem.subcategories.map((subcategory) => {
            const previewProduct = getProductsBySlugs(subcategory.productSlugs)[0];

            return (
              <BaseProductCard
                key={subcategory.slug}
                href={subcategory.href}
                ariaLabel={`Explore ${subcategory.title}`}
                title={subcategory.title}
                description={subcategory.description}
                meta={categoryItem.title}
                imageSrc={previewProduct?.heroImage ?? fallbackPreviewImage}
                imageAlt={previewProduct?.title ?? subcategory.title}
                icon={getProductCardIcon(`${categoryItem.title} ${subcategory.title}`)}
                badges={["Product Subcategory"]}
                footerLeading={`${subcategory.productSlugs.length} product${
                  subcategory.productSlugs.length === 1 ? "" : "s"
                }`}
                ctaLabel="Explore Subcategory"
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
