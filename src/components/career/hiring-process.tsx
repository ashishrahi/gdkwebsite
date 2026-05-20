import { CheckCircle, Clock3, MessageSquare, Users } from "lucide-react";

import {
  FeatureCard,
  HomeSection,
  SectionHeader,
  homeContentSpacingClassName,
  homeGridClassName,
} from "@/components/home/home-card-system";
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
    <HomeSection id="hiring-process">
      <SectionHeader
        eyebrow="Hiring Process"
        title="A straightforward process that values clarity."
        description="Our hiring steps are designed to be efficient and transparent for candidates and teams."
      />

      <div
        className={cn(
          homeGridClassName,
          homeContentSpacingClassName,
          "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {steps.map((step) => (
          <FeatureCard
            key={step.title}
            title={step.title}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </HomeSection>
  );
}
