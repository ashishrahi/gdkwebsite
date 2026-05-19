import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

export function CareerHero() {
  return (
    <section
      className="ds-section"
      aria-label="Career hero section"
    >
      <div
        className={cn(
          cardSurfaceVariants({
            variant: "gradient",
            padding: "xl",
          }),
          "rounded-ds-card-lg p-6 sm:p-8 lg:p-10"
        )}
      >
        <div className="space-y-10">
          {/* Header */}
          <div className="max-w-3xl ds-section-header-left space-y-8">
            <p className="ds-eyebrow">Careers at GDK Packaging</p>

            <h1 className="text-h1 leading-[1.15] text-ds-text-strong">
              Join a team that builds sustainable packaging solutions at scale.
            </h1>

            <p className="max-w-2xl text-body-lg leading-8 text-ds-text-body">
              Grow with a manufacturing partner that blends engineering
              discipline, customer focus, and strong quality standards for
              modern brands.
            </p>
          </div>

          {/* Content + CTA */}
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="space-y-5">
              <p className="text-body leading-7 text-ds-text-body">
                Our team delivers food-safe, printed, and ESD packaging systems
                from Kanpur to customers across India. We look for people who
                are curious, dependable, and ready to own solutions that matter.
              </p>

              <p className="text-body-sm leading-7 text-ds-text-muted">
                We combine disciplined manufacturing, practical product design,
                and a collaborative culture to support brands and their supply
                chains.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="w-fit bg-brand-accent text-white shadow-none"
            >
              <Link href="/#contact">Talk to our hiring team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}