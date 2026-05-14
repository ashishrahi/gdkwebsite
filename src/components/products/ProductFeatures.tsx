import { BadgeCheck, Droplets, PackageCheck, Recycle, Shield, Snowflake, UtensilsCrossed, Waves } from "lucide-react";

import {
  cardIconClassNames,
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

type ProductFeaturesProps = {
  features: string[];
};

export function ProductFeatures({ features }: ProductFeaturesProps) {
  const featureIcons = {
    "Food Grade": UtensilsCrossed,
    "Leak Resistant": Droplets,
    Durable: Shield,
    Reusable: Recycle,
    "Microwave Safe": Waves,
    "Freezer Safe": Snowflake,
    "Custom Branding Available": BadgeCheck,
    "Bulk Supply Ready": PackageCheck,
    default: BadgeCheck,
  };

  return (
    <section aria-labelledby="product-features" className="space-y-5">
      <div className="space-y-2">
        <h2 id="product-features" className="text-h3 text-ds-text-strong">
          Key Features
        </h2>
        <p className="text-sm text-ds-text-muted">Built for reliability, hygiene, and bulk operations.</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <li
            key={feature}
            className={cn(
              cardSurfaceVariants({ variant: "minimal" }),
              "flex min-w-0 items-center gap-4 rounded-xl px-5 py-5 text-sm leading-6 text-ds-text-body"
            )}
          >
            <span className={cn(cardIconClassNames.brand, "h-9 w-9 rounded-lg")}>
              {(() => {
                const Icon = featureIcons[feature as keyof typeof featureIcons] ?? featureIcons.default;
                return <Icon className="h-4 w-4" aria-hidden="true" />;
              })()}
            </span>
            <span className="min-w-0 wrap-break-word">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
