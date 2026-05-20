import { CareerApplyButton } from "@/components/career/career-apply-button";
import { HomeSection, SectionHeader } from "@/components/home/home-card-system";
import { cn } from "@/lib/utils";

const primaryCtaClassName =
  "inline-flex min-h-12.5 shrink-0 items-center justify-center rounded-full bg-brand-accent px-8 py-3 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-white no-underline shadow-(--ds-shadow-button-primary) transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-white";

export function CareerCTA() {
  return (
    <HomeSection id="career-cta" tone="gradient" className="mb-0!">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
        <SectionHeader
          eyebrow="Ready to apply?"
          title="Take the next step with GDK Packaging."
          description="Send us a message with your resume and a short summary of the role you are targeting. We will respond with the next step within two business days."
          tone="gradient"
          align="left"
        />

        <CareerApplyButton className={cn(primaryCtaClassName, "w-full lg:w-auto")}>
          Send your interest
        </CareerApplyButton>
      </div>
    </HomeSection>
  );
}
