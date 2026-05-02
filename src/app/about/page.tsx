"use client";

import { Award, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const heroSubtitle =
  "At our Kanpur facility, we specialize in manufacturing PP UFT containers, glasses, and cups.";

const heroMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

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

const timelineInView = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const easePremium = [0.16, 1, 0.3, 1] as const;
const easeTimeline = [0.25, 1, 0.5, 1] as const;
const easeHeroY = [0.22, 1, 0.36, 1] as const;

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-10">
      <div id="kb-ropes" className="scroll-mt-28 h-0 md:scroll-mt-32" />

      <section className="mb-24 scroll-mt-36 overflow-hidden rounded-xl border border-border bg-card md:scroll-mt-40">
        <motion.div
          className="flex flex-col gap-8 px-6 py-6 text-left md:gap-10 md:px-10 md:py-8"
          {...heroMotion}
          transition={{
            y: { duration: 0.6, ease: easeHeroY },
            opacity: { duration: 0.78, ease: easePremium },
          }}
        >
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/images/hero/kankani.webp"
              alt="Kankani Manufacturing Facility"
              width={1400}
              height={500}
              className="h-56 w-full object-cover object-center md:h-72"
              priority
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              K.B. Ropes Pvt Ltd
            </h2>
            <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
              {heroSubtitle}
            </p>
            <div className="space-y-5 text-base leading-relaxed text-foreground/75 md:text-lg">
              <p>
                At our Kanpur facility, we specialize in manufacturing PP UFT containers, glasses, and cups. These products find applications in the food and other industries. Our range includes ice cream cups and glasses, as well as containers in round, octagonal, and rectangular shapes, with capacities ranging from 50 mL to 1000 ML. Not only are our containers refrigerated, but they are also microwave-safe and highly affordable. They are designed to suit a wide range of products.
              </p>
              <p>
                Our production unit is equipped with six state-of-the-art TFM machines and a four-color UV printing machine that uses food-grade inks. Additionally, we have an in-house double-barrel extrusion machine for manufacturing sheets compatible with various polymer types. With a processing capacity of 900 TPA, we are well-positioned to meet the demands of our customers.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="vision-mission"
        className="mb-24 scroll-mt-28 space-y-8 md:scroll-mt-32"
      >
        <motion.div
          {...headingInView}
          transition={{ duration: 0.5, ease: easePremium }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Our Vision & Mission
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
              <Card className="group h-full rounded-2xl border border-border bg-card p-6 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-0">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 space-y-0">
                    <CardTitle className="font-heading text-xl font-semibold leading-snug text-foreground">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

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
    </main>
  );
}
