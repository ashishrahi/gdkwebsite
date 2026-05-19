import { CheckCircle, Clock3, MessageSquare, Users } from "lucide-react";

import { SectionHeader } from "@/components/home/home-card-system";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Application Review",
    description:
      "We review your resume and experience for the right fit across packaging, quality, and operations roles.",
    icon: Users,
  },
  {
    title: "Initial Conversation",
    description:
      "A short call with our hiring team to discuss your background and career priorities.",
    icon: MessageSquare,
  },
  {
    title: "Technical Assessment",
    description:
      "We evaluate practical problem solving, process understanding, and packaging operations knowledge.",
    icon: Clock3,
  },
  {
    title: "Offer and Onboarding",
    description:
      "Successful candidates receive a clear offer and a structured onboarding plan to join our team.",
    icon: CheckCircle,
  },
] as const;

export function HiringProcess() {
  return (
    <section
      className="ds-section"
      aria-labelledby="career-hiring-process-title"
    >
      <div className="space-y-10">
        {/* Center aligned header */}
        <SectionHeader
          eyebrow="Hiring Process"
          title="A straightforward process that values clarity."
          description="Our hiring steps are designed to be efficient and transparent for candidates and teams."
          titleLevel="h3"
          align="center"
        />

        {/* Center aligned grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className={cn(
                    cardSurfaceVariants({
                      variant: "default",
                      padding: "lg",
                    }),
                    "h-full rounded-ds-card-lg text-center"
                  )}
                >
                  {/* Center icon */}
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--brand-green-950)_10%,white)] text-brand-green-950">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  {/* Icon → Title → Description */}
                  <div className="mt-8 space-y-5 text-center">
                    <h3 className="text-h4 text-ds-text-strong">
                      {step.title}
                    </h3>

                    <p className="text-body-sm leading-7 text-ds-text-body">
                      {step.description}
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