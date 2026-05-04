"use client";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const journey = [
  {
    year: "1992",
    description:
      "We began our journey in thermoforming with our flagship brand Heera, laying a strong foundation built on consistent quality, branded raw materials, and a commitment to excellence. From day one, our focus remained clear, delivering reliable packaging solutions where quality was never compromised.",
  },
  {
    year: "2007",
    description:
      "With growing customer trust and market acceptance, we expanded our footprint by setting up a new manufacturing unit in Haridwar. This marked a significant step towards building long-term relationships with corporate clients and strengthening our presence in organized markets.",
  },
  {
    year: "2012",
    description:
      "To further enhance our capabilities, we invested in nine state-of-the-art American machines, bringing advanced global technology to India. This upgrade enabled us to deliver superior precision, consistency, and high-quality output, setting us apart in the industry.",
  },
  {
    year: "2017",
    description:
      "We established our in-house Tool Room along with a dedicated R&D Center, empowering us to respond quickly to evolving market needs. This allowed us to offer faster product development, innovative design support, and customized packaging solutions tailored to our customers' requirements.",
  },
  {
    year: "2019",
    description:
      "Continuing our growth journey, we set up a new unit in Kanpur, equipped with advanced PET extrusion lines. During the same phase, we expanded into the dairy packaging segment, leveraging Swiss and German technologies to deliver high-performance and hygienic packaging solutions.",
  },
  {
    year: "2024",
    description:
      "We entered the next phase of innovation by introducing robotic injection molding technology, bringing automation, precision, and enhanced production efficiency to our operations. This further strengthened our ability to serve large-scale and quality-driven customers.",
  },
  {
    year: "2025",
    description:
      "To support our future vision, we acquired four times additional land capacity, creating a strong foundation for expansion. This strategic move will enable us to scale operations, increase production capacity, and cater to the growing demands of our customers.",
  },
] as const;

const headingInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const timelineInView = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const easePremium = [0.16, 1, 0.3, 1] as const;
const easeTimeline = [0.25, 1, 0.5, 1] as const;

export function AboutJourney() {
  return (
    <section className="mb-24 space-y-10">
      <motion.div
        {...headingInView}
        transition={{ duration: 0.5, ease: easePremium }}
      >
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Our Journey of Growth & Innovation
        </h2>
      </motion.div>
      <ul className="space-y-10">
        {journey.map((entry, index) => {
          const isLast = index === journey.length - 1;
          return (
            <motion.li
              key={entry.year}
              className="flex gap-6 rounded-xl px-2 py-1 transition-colors duration-300 hover:bg-linear-to-r hover:from-primary/6 hover:to-transparent md:gap-8"
              {...timelineInView}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: easeTimeline,
              }}
            >
              <div className="flex w-5 shrink-0 flex-col items-center self-stretch pt-1.5 md:w-6">
                <div
                  className="relative z-1 size-3 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                {!isLast ? (
                  <div
                    className="mt-3 w-px flex-1 bg-border"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-2xl font-semibold tabular-nums text-primary">
                  {entry.year}
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: easePremium }}
                >
                  <Card className="rounded-2xl border border-border bg-card p-6 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-0">
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
