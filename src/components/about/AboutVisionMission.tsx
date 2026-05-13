"use client";

import { Award, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardIconClassNames } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

const visionMission = [
  {
    title: "Vision",
    description:
      "Build a future-ready packaging ecosystem with long-term customer partnerships.",
    icon: Award,
  },
  {
    title: "Mission",
    description:
      "Deliver dependable packaging systems that improve safety and operational speed.",
    icon: Target,
  },
  {
    title: "Quality",
    description:
      "Maintain strict quality standards across material selection and production.",
    icon: ShieldCheck,
  },
] as const;

const headingInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const cardInView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const easePremium = [0.16, 1, 0.3, 1] as const;

export function AboutVisionMission() {
  return (
    <section
      id="vision-mission"
      className="mb-28 scroll-mt-28 space-y-10 md:scroll-mt-32"
    >
      <motion.div
        {...headingInView}
        transition={{ duration: 0.5, ease: easePremium }}
      >
        <h2 className="text-h2 text-foreground">
          Our Vision & Mission
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
        {visionMission.map((item, index) => (
          <motion.div
            key={item.title}
            {...cardInView}
            whileHover={{ scale: 1.02 }}
            transition={{
              y: {
                duration: 0.55,
                delay: index * 0.08,
                ease: easePremium,
              },
              opacity: {
                duration: 0.55,
                delay: index * 0.08 + 0.06,
                ease: easePremium,
              },
            }}
          >
            <Card variant="feature" className="h-full p-6 sm:p-7 text-foreground">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-0">
                <span className={cn(cardIconClassNames.brand, "h-11 w-11")}>
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1 space-y-0">
                  <CardTitle className="text-h4 text-foreground">
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-5">
                <p className="text-body text-ds-text-muted">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
