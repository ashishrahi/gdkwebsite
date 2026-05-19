import { Check } from "lucide-react";

import { SectionHeader } from "@/components/home/home-card-system";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
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
    <section
      className="ds-section"
      aria-labelledby="career-benefits-title"
    >
      <div className="space-y-10">
        {/* Center aligned header */}
        <SectionHeader
          eyebrow="Benefits"
          title="Benefits built for long-term manufacturing careers."
          description="We support our people with training, stability, and a culture that values quality and continuous improvement."
          titleLevel="h3"
          align="center"
        />

        {/* Center aligned grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className={cn(
                  cardSurfaceVariants({
                    variant: "minimal",
                    padding: "lg",
                  }),
                  "h-full rounded-ds-card-lg"
                )}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent">
                    <Check className="size-4" aria-hidden="true" />
                  </span>

                  {/* Text */}
                  <p className="text-body leading-7 text-ds-text-body">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}