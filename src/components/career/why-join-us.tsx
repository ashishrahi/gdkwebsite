import { Award, Sparkles, Users } from "lucide-react";

import { SectionHeader } from "@/components/home/home-card-system";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

const reasons = [
  {
    title: "Industry-leading capabilities",
    description:
      "Work with modern thermoforming, printing and ESD packaging systems serving food, dairy, and industrial customers.",
    icon: Sparkles,
  },
  {
    title: "Quality and compliance focus",
    description:
      "Be part of a team that follows ISO-grade processes, robust testing, and dependable delivery standards.",
    icon: Award,
  },
  {
    title: "Growth through collaboration",
    description:
      "Join a hands-on culture where engineering, operations, and sales collaborate to solve real customer challenges.",
    icon: Users,
  },
] as const;

export function WhyJoinUs() {
  return (
    <section
      className="ds-section"
      aria-labelledby="career-why-join-us-title"
    >
      <div className="space-y-10">
        {/* Center aligned header */}
        <SectionHeader
          eyebrow="Why Join Us"
          title="A manufacturing career with clear purpose and growth."
          description="At GDK Packaging, every role contributes to stronger supply chains, safer packaging, and more reliable execution for modern brands."
          titleLevel="h3"
          align="center"
        />

        {/* Center aligned cards wrapper */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className={cn(
                    cardSurfaceVariants({
                      variant: "elevated",
                      padding: "lg",
                    }),
                    "h-full rounded-ds-card-lg text-center"
                  )}
                >
                  {/* Center icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] text-brand-accent mx-auto">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  {/* Center text */}
                  <div className="mt-8 space-y-5 text-center">
                    <h3 className="text-h4 text-ds-text-strong">
                      {reason.title}
                    </h3>

                    <p className="text-body-sm leading-7 text-ds-text-body">
                      {reason.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}