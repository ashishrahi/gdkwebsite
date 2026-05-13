import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Factory, Layers, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cardIconClassNames } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const categoryIcons = [
  { key: "tray", icon: Layers },
  { key: "container", icon: Box },
  { key: "film", icon: Package },
  { key: "print", icon: Package },
  { key: "box", icon: Box },
  { key: "industrial", icon: Factory },
  { key: "thermo", icon: Factory },
  { key: "default", icon: Package },
] as const;

const DefaultProductIcon = Package;

type BaseProductCardProps = {
  href: string;
  ariaLabel: string;
  title: string;
  description?: string;
  meta?: string;
  imageSrc: string;
  imageAlt: string;
  icon?: LucideIcon;
  badges?: readonly string[];
  footerLeading?: ReactNode;
  ctaLabel: string;
  imageSizes?: string;
};

const productCardBadgeClassName =
  "rounded-full border border-[color-mix(in_srgb,var(--brand-accent)_25%,var(--border))] bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] px-3 py-1.5 text-[11px] font-medium leading-none tracking-[0.04em] text-brand-accent";

export function getProductCardIcon(label: string): LucideIcon {
  const matchedCategory = categoryIcons.find((entry) =>
    entry.key === "default" ? false : label.toLowerCase().includes(entry.key)
  );

  return matchedCategory?.icon ?? categoryIcons.find((entry) => entry.key === "default")!.icon;
}

export function ProductCardBadge({ children }: { children: ReactNode }) {
  return <span className={productCardBadgeClassName}>{children}</span>;
}

export function BaseProductCard({
  href,
  ariaLabel,
  title,
  description,
  meta,
  imageSrc,
  imageAlt,
  icon,
  badges,
  footerLeading,
  ctaLabel,
  imageSizes = "(max-width: 768px) 100vw, 33vw",
}: BaseProductCardProps) {
  const ProductIcon = icon ?? DefaultProductIcon;
  const visibleBadges = badges?.slice(0, 2) ?? [];

  return (
    <Link
      href={href}
      className="group/product-card block h-full rounded-ds-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={ariaLabel}
    >
      <Card variant="interactive" className="h-full">
        <div className="relative h-44 w-full overflow-hidden bg-ds-surface-muted">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 ease-ds-out group-hover/product-card:scale-[1.03]"
            sizes={imageSizes}
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-3">
              <span className={cn(cardIconClassNames.brand, "h-9 w-9 rounded-lg")}>
                <ProductIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <CardTitle>{title}</CardTitle>
            </div>
            {visibleBadges.length ? (
              <div className="flex max-w-36 flex-wrap justify-end gap-2">
                {visibleBadges.map((badge) => (
                  <ProductCardBadge key={badge}>{badge}</ProductCardBadge>
                ))}
              </div>
            ) : null}
          </div>
          {meta ? <CardDescription>{meta}</CardDescription> : null}
        </CardHeader>
        {description ? (
          <CardContent className="flex-1">
            <p>{description}</p>
          </CardContent>
        ) : (
          <CardContent className="flex-1" />
        )}
        <CardFooter className="mt-auto justify-between gap-4">
          {footerLeading ? (
            <span className="min-w-0 text-sm font-medium text-foreground sm:text-base">
              {footerLeading}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const productHref = `/products/${product.slug}`;

  return (
    <BaseProductCard
      href={productHref}
      ariaLabel={`View details for ${product.name}`}
      title={product.name}
      description={product.description}
      meta={product.category}
      imageSrc={product.imageUrl}
      imageAlt={product.name}
      icon={getProductCardIcon(product.category)}
      badges={[product.inStock ? "In stock" : "Out of stock"]}
      footerLeading={`$${product.price.toFixed(2)}`}
      ctaLabel="View details"
    />
  );
}
