import { CareerApplyButton } from "@/components/career/career-apply-button";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

const primaryCtaClassName =
  "inline-flex min-h-12.5 items-center justify-center rounded-full bg-brand-accent px-8 py-3 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-white no-underline shadow-(--ds-shadow-button-primary) transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-white";

export function CareerHero() {
  return (
    <section
      aria-label="Career hero section"
      className="ds-container pt-(--ds-space-page-top)"
    >
      <div
        className={cn(
          cardSurfaceVariants({
            variant: "gradient",
            padding: "xl",
          }),
          "rounded-ds-card-lg"
        )}
      >
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="ds-section-header-left flex max-w-3xl flex-col gap-5 lg:gap-6">
            <span className="ds-eyebrow">Careers at GDK Packaging</span>
            <h1 className="text-h1 text-balance text-ds-text-strong">
              Join a team that builds sustainable packaging solutions at scale.
            </h1>
            <p className="max-w-2xl text-body-lg text-ds-text-body">
              Grow with a manufacturing partner that blends engineering
              discipline, customer focus, and strong quality standards for
              modern brands.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <div className="flex max-w-3xl flex-col gap-4">
              <p className="text-body text-ds-text-body">
                Our team delivers food-safe, printed, and ESD packaging systems
                from Kanpur to customers across India. We look for people who
                are curious, dependable, and ready to own solutions that matter.
              </p>
              <p className="text-body-sm text-ds-text-muted">
                We combine disciplined manufacturing, practical product design,
                and a collaborative culture to support brands and their supply
                chains.
              </p>
            </div>

            <CareerApplyButton
              className={cn(primaryCtaClassName, "w-fit shrink-0")}
            >
              Talk to our hiring team
            </CareerApplyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
