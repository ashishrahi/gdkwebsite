import { AddToEnquiryButton } from "@/components/enquiry/add-to-enquiry-button";
import { BaseProductCard, getProductCardIcon } from "@/components/product/product-card";
import { getProductRouteBySlug } from "@/lib/catalog";
import type { ProductData } from "@/lib/products-data";

type RelatedProductsProps = {
  products: ProductData[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-products" className="space-y-5">
      <h2 id="related-products" className="text-h3 text-ds-text-strong">
        Related Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {products.map((product) => {
          const href = getProductRouteBySlug(product.slug) ?? `/products/${product.slug}`;

          return (
            <BaseProductCard
              key={product.slug}
              href={href}
              ariaLabel={`View details for ${product.title}`}
              title={product.title}
              description={product.shortDescription}
              meta={product.category}
              imageSrc={product.heroImage}
              imageAlt={product.title}
              icon={getProductCardIcon(`${product.category} ${product.title}`)}
              badges={product.badges}
              footerLeading={product.material}
              ctaLabel="View details"
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
      </div>
    </section>
  );
}
