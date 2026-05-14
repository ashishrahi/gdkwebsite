import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Factory, Layers, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { AddToEnquiryButton } from "@/components/enquiry/add-to-enquiry-button";
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
  action?: ReactNode;
  imageSizes?: string;
};

const productCardBadgeClassName =
  "rounded-full border border-[color-mix(in_srgb,var(--brand-accent)_20%,var(--border))] bg-[color-mix(in_srgb,var(--brand-accent)_9%,white)] px-2.5 py-1.5 text-[10px] font-semibold leading-none tracking-[0.08em] text-brand-accent";

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
  action,
  imageSizes = "(max-width: 768px) 100vw, 33vw",
}: BaseProductCardProps) {
  const ProductIcon = icon ?? DefaultProductIcon;
  const visibleBadges = badges?.slice(0, 2) ?? [];

  return (
    <Card
      variant="default"
      className="group/product-card h-full min-h-full rounded-[1.35rem] border-[color-mix(in_srgb,var(--brand-blue-200)_46%,white)] bg-white py-0 shadow-[0_10px_30px_color-mix(in_srgb,var(--brand-green-950)_5%,transparent)] transition-[border-color,box-shadow,background-color] duration-300 ease-ds-out hover:border-[color-mix(in_srgb,var(--brand-accent)_26%,var(--border))] hover:shadow-[0_20px_46px_color-mix(in_srgb,var(--brand-green-950)_10%,transparent)] focus-within:border-[color-mix(in_srgb,var(--brand-accent)_34%,var(--border))] focus-within:shadow-[0_18px_42px_color-mix(in_srgb,var(--brand-green-950)_9%,transparent)]"
    >
      <Link
        href={href}
        className="group/product-link flex flex-1 flex-col rounded-[1.25rem] font-normal text-card-foreground no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--brand-accent)_18%,transparent)]"
        aria-label={ariaLabel}
      >
        <div className="relative m-3 mb-0 h-48 overflow-hidden rounded-[1.05rem] bg-[color-mix(in_srgb,var(--brand-blue-100)_58%,white)] sm:h-52">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-ds-out group-hover/product-card:scale-[1.045] group-focus-visible/product-link:scale-[1.045]"
            sizes={imageSizes}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/42 to-transparent opacity-0 transition-opacity duration-300 group-hover/product-card:opacity-100" />
        </div>
        <CardHeader className="gap-4 px-4 pt-5 pb-0 sm:px-5">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <span
              className={cn(
                cardIconClassNames.brand,
                "h-10 w-10 rounded-xl border border-[color-mix(in_srgb,var(--brand-accent)_12%,white)] bg-[color-mix(in_srgb,var(--brand-accent)_10%,white)] shadow-[0_8px_18px_color-mix(in_srgb,var(--brand-accent)_8%,transparent)]",
              )}
            >
              <ProductIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {visibleBadges.length ? (
              <div className="flex max-w-[72%] flex-wrap justify-end gap-1.5">
                {visibleBadges.map((badge) => (
                  <ProductCardBadge key={badge}>{badge}</ProductCardBadge>
                ))}
              </div>
            ) : null}
          </div>
          <div className="min-w-0 space-y-2.5">
            {meta ? (
              <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ds-text-subtle">
                {meta}
              </CardDescription>
            ) : null}
            <CardTitle className="line-clamp-2 text-[1.05rem] leading-tight tracking-[-0.018em] text-ds-text-strong transition-colors duration-200 group-hover/product-card:text-primary">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        {description ? (
          <CardContent className="flex-1 px-4 pt-2 pb-0 text-sm leading-6 text-ds-text-muted sm:px-5">
            <p className="line-clamp-3">{description}</p>
          </CardContent>
        ) : (
          <CardContent className="flex-1 px-4 pt-2 pb-0 sm:px-5" />
        )}
        <CardFooter className="mt-auto flex-col items-start justify-between gap-3 border-t-0 bg-transparent px-4 pt-5 pb-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
          {footerLeading ? (
            <span className="min-w-0 wrap-break-word text-sm font-semibold leading-5 text-ds-text-strong">
              {footerLeading}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}
          <span className="inline-flex w-full shrink-0 items-center justify-between gap-1.5 rounded-full text-[0.76rem] font-semibold uppercase tracking-[0.09em] text-primary transition-[color,transform] duration-200 group-hover/product-card:translate-x-0.5 group-hover/product-card:text-brand-accent sm:w-auto sm:justify-start">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </CardFooter>
      </Link>
      {action ? (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <div className="rounded-[1rem] border border-[color-mix(in_srgb,var(--brand-blue-200)_42%,white)] bg-[color-mix(in_srgb,var(--brand-blue-100)_26%,white)] p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] transition-[border-color,background-color,opacity] duration-300 ease-ds-out sm:group-hover/product-card:opacity-100 sm:group-focus-within/product-card:opacity-100">
            {action}
          </div>
        </div>
      ) : null}
    </Card>
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
      action={
        <AddToEnquiryButton
          size="card"
          item={{
            id: product.id,
            slug: product.slug,
            title: product.name,
            category: product.category,
            imageSrc: product.imageUrl,
            imageAlt: product.name,
            href: productHref,
          }}
        />
      }
    />
  );
}
