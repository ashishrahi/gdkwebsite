import { Award, Sparkles, Users } from "lucide-react";

import {
  FeatureCard,
  HomeSection,
  SectionHeader,
  homeContentSpacingClassName,
  homeGridClassName,
} from "@/components/home/home-card-system";
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
    <HomeSection id="why-join-us">
      <SectionHeader
        eyebrow="Why Join Us"
        title="A manufacturing career with clear purpose and growth."
        description="At GDK Packaging, every role contributes to stronger supply chains, safer packaging, and more reliable execution for modern brands."
      />

      <div
        className={cn(
          homeGridClassName,
          homeContentSpacingClassName,
          "sm:grid-cols-2"
        )}
      >
        {reasons.map((reason) => (
          <FeatureCard
            key={reason.title}
            title={reason.title}
            description={reason.description}
            icon={reason.icon}
          />
        ))}
      </div>
    </HomeSection>
  );
}
