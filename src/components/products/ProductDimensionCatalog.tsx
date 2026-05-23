import { cardSurfaceVariants, cardTextClassNames } from "@/design-system/shadcn/card.variants";
import { productCategories, type ProductCategoryGroup } from "@/lib/data/product-catalog";
import { cn } from "@/lib/utils";

type ProductDimensionCatalogProps = {
  categories?: ProductCategoryGroup[];
  className?: string;
  title?: string;
  description?: string;
};

const dimensionUnavailableLabel = "On request";

function formatDimension(dimension: string | null): string {
  return dimension ?? dimensionUnavailableLabel;
}

function CategoryTable({ group }: { group: ProductCategoryGroup }) {
  return (
    <article className="space-y-4">
      <h3 className={cardTextClassNames.title}>{group.category}</h3>
      <div
        className={cn(
          cardSurfaceVariants({ variant: "minimal" }),
          "overflow-hidden rounded-xl",
        )}
      >
        <div
          className="grid grid-cols-[minmax(0,1fr)_minmax(7.5rem,auto)] items-center gap-4 border-b border-ds-border-subtle bg-ds-surface-muted px-5 py-3"
          role="row"
        >
          <span
            className="text-xs font-medium tracking-(--ds-type-label-letter-spacing) text-ds-text-subtle uppercase"
            role="columnheader"
          >
            Product
          </span>
          <span
            className="text-right text-xs font-medium tracking-(--ds-type-label-letter-spacing) text-ds-text-subtle uppercase"
            role="columnheader"
          >
            Dimensions (mm)
          </span>
        </div>
        <ul className="divide-y divide-ds-border-subtle/80" role="rowgroup">
          {group.products.map((product) => (
            <li
              key={`${group.category}-${product.name}`}
              className="grid min-h-12 grid-cols-[minmax(0,1fr)_minmax(7.5rem,auto)] items-center gap-4 px-5 py-3.5 transition-colors duration-200 ease-ds-out hover:bg-ds-surface-muted/55 sm:py-4"
              role="row"
            >
              <span
                className="text-body-sm font-semibold leading-snug text-ds-text-strong"
                role="cell"
              >
                {product.name}
              </span>
              <span
                className={cn(
                  "text-right text-body-sm leading-snug tabular-nums tracking-tight",
                  product.dimension
                    ? "font-medium text-ds-text-body"
                    : "text-caption font-normal text-ds-text-subtle italic",
                )}
                role="cell"
              >
                {formatDimension(product.dimension)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProductDimensionCatalog({
  categories = productCategories,
  className,
  title = "Product sizes & dimensions",
  description = "Reference dimensions (L × W × H in mm) for our PP packaging range. Contact us for custom tooling or variants not listed below.",
}: ProductDimensionCatalogProps) {
  return (
    <section
      aria-labelledby="product-dimension-catalog-heading"
      className={cn("space-y-7 lg:space-y-8", className)}
    >
      <div className="flex max-w-3xl flex-col gap-2">
        <h2 id="product-dimension-catalog-heading" className="text-h3 text-ds-text-strong">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-6 text-ds-text-muted">{description}</p>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10 xl:gap-x-12">
        {categories.map((group) => (
          <CategoryTable key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
}
