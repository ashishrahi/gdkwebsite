import { Check } from "lucide-react";

import {
  HomeSection,
  SectionHeader,
  homeContentSpacingClassName,
  homeGridClassName,
  premiumCardClassName,
} from "@/components/home/home-card-system";
import { cardIconClassNames } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

const benefits = [
  "Structured training for manufacturing and quality systems",
  "Collaborative teams with clear ownership and accountability",
  "Career growth across product, operations, and customer-facing roles",
  "Competitive compensation and performance-driven rewards",
  "A sustainable workplace with a strong focus on compliance",
] as const;

export function CareerBenefits() {
  return (
    <HomeSection id="benefits">
      <SectionHeader
        eyebrow="Benefits"
        title="Benefits built for long-term manufacturing careers."
        description="We support our people with training, stability, and a culture that values quality and continuous improvement."
      />

      <div
        className={cn(
          homeGridClassName,
          homeContentSpacingClassName,
          "sm:grid-cols-2 lg:grid-cols-2"
        )}
      >
        {benefits.map((benefit) => (
          <article
            key={benefit}
            className={cn(
              premiumCardClassName,
              "flex min-h-24 flex-row items-center gap-4 p-6 sm:p-8"
            )}
          >
            <span
              className={cn(
                cardIconClassNames.brand,
                "h-10 w-10 shrink-0 border border-ds-border-subtle"
              )}
            >
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="m-0 min-w-0 text-sm font-medium leading-snug text-ds-text-strong">
              {benefit}
            </p>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
