"use client";

import {
  Award,
  Quote,
  ShieldCheck,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { CertificationsGrid } from "@/components/about/CertificationsGrid";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  cardIconClassNames,
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
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

const kbHighlights = [
  "PP UFT containers, glasses, and cups",
  "50 mL to 1000 ML formats",
  "900 TPA processing capacity",
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

const certifications = [
  {
    image: "/images/certifications/gdk-thumbnail.webp",
    pdf: "/images/certifications/gdk.pdf",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="ds-page-shell flex flex-1 flex-col gap-10 lg:gap-12">
      <section className={cn(cardSurfaceVariants({ variant: "gradient", padding: "xl" }), "rounded-ds-card-lg")}>
        <div className="relative z-10 flex flex-col gap-6 lg:gap-7">
          <p className="ds-eyebrow">About GDK Packaging</p>
          <div className="flex max-w-3xl flex-col gap-4 lg:gap-5">
            <h1 className="text-h1 text-ds-text-strong">
              Manufacturing packaging solutions with quality, scale, and consistency.
            </h1>
            <p className="text-body-sm font-medium text-ds-text-muted sm:text-body">
              From Concept to Solution.{" "}
              <span className="text-primary">With Sustainability Built In.</span>
            </p>
            <p className="text-body-lg text-ds-text-body">
              We combine disciplined production, practical engineering, and long-term customer partnerships to serve modern packaging needs.
            </p>
          </div>
        </div>
      </section>

      <div id="kb-ropes" className="scroll-mt-28 h-0 md:scroll-mt-32" />

        <section className={cn(cardSurfaceVariants({ variant: "default" }), "scroll-mt-36 rounded-ds-card-lg md:scroll-mt-40")}>
          <motion.div
            className="grid gap-7 px-6 py-6 text-left sm:px-8 sm:py-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:px-10 lg:py-10"
            {...heroMotion}
            transition={{
              y: { duration: 0.6, ease: easeHeroY },
              opacity: { duration: 0.78, ease: easePremium },
            }}
          >
            <div className="flex flex-col gap-8 lg:gap-9">
              <p className="ds-eyebrow">Group Capability</p>
              <div className="flex flex-col gap-7 lg:gap-8">
                <h2 className="text-h3 text-ds-text-strong">
                  K.B. Ropes Pvt Ltd
                </h2>
                <p className="text-body-lg text-ds-text-body">
                  {heroSubtitle}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {kbHighlights.map((item) => (
                  <div
                    key={item}
                    className={cn(
                      cardSurfaceVariants({ variant: "minimal" }),
                      "rounded-xl px-4 py-3 text-sm font-medium leading-6 text-ds-text-strong"
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 text-body text-ds-text-body">
              <div className="relative aspect-2167/725 overflow-hidden rounded-xl border border-ds-border-subtle bg-white shadow-ds-card-subtle">
                <Image
                  src="/images/hero/kankani.webp"
                  alt="Kankani manufacturing facility"
                  fill
                  preload
                  quality={100}
                  sizes="(max-width: 1024px) calc(100vw - 3rem), (max-width: 1280px) 56vw, 680px"
                  className="object-cover object-center"
                />
              </div>
              <article className={cn(cardSurfaceVariants({ variant: "minimal", padding: "default" }), "rounded-xl")}>
                <p>
                  At our Kanpur facility, we specialize in manufacturing PP UFT containers, glasses, and cups. These products find applications in the food and other industries. Our range includes ice cream cups and glasses, as well as containers in round, octagonal, and rectangular shapes, with capacities ranging from 50 mL to 1000 ML. Not only are our containers refrigerated, but they are also microwave-safe and highly affordable. They are designed to suit a wide range of products.
                </p>
              </article>
              <article className={cn(cardSurfaceVariants({ variant: "minimal", padding: "default" }), "rounded-xl")}>
                <p>
                  Our production unit is equipped with six state-of-the-art TFM machines and a four-color UV printing machine that uses food-grade inks. Additionally, we have an in-house double-barrel extrusion machine for manufacturing sheets compatible with various polymer types. With a processing capacity of 900 TPA, we are well-positioned to meet the demands of our customers.
                </p>
              </article>
            </div>
          </motion.div>
        </section>

      <section
        id="md-message"
        className="scroll-mt-36 space-y-5 md:scroll-mt-40"
      >
        <motion.div
          {...headingInView}
          transition={{ duration: 0.5, ease: easePremium }}
        >
          <h2 className="text-h3 text-ds-text-strong">
            Message from the Managing Director
          </h2>
        </motion.div>

        <div className={cn(cardSurfaceVariants({ variant: "default" }), "rounded-ds-card-lg")}>
          <motion.div
            className="mx-auto grid w-full gap-7 px-6 py-6 text-left sm:px-8 sm:py-8 lg:grid-cols-[280px_1fr] lg:gap-10 lg:px-10 lg:py-10"
            {...heroMotion}
            transition={{
              y: { duration: 0.6, ease: easeHeroY },
              opacity: { duration: 0.78, ease: easePremium },
            }}
          >
            <aside className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-end lg:sticky lg:top-28 lg:block lg:space-y-4 lg:self-start">
              <div className="relative mx-auto aspect-3/4 w-full max-w-[220px] overflow-hidden rounded-[1.35rem] bg-ds-surface-muted sm:mx-0 sm:max-w-none">
                <Image
                  src="/images/about/managing-director.jpg"
                  alt="Mr. Ramesh Kankani"
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover object-center"
                />
              </div>
              <div className="rounded-xl border border-ds-border-subtle bg-[color-mix(in_srgb,var(--brand-blue-100)_26%,white)] p-4">
                <p className="text-body-lg font-medium text-ds-text-strong">
                  Mr. Ramesh Kankani
                </p>
                <p className="mt-1 text-body-sm text-ds-text-muted">
                  Managing Director, GDK Solutions
                </p>
              </div>
            </aside>

            <div className="space-y-6 md:space-y-7">
              <div className="flex items-start gap-4 rounded-xl border border-[color-mix(in_srgb,var(--brand-accent)_18%,var(--border))] bg-[color-mix(in_srgb,var(--brand-accent)_7%,white)] p-5 sm:p-6">
                <span className={cn(cardIconClassNames.brand, "h-10 w-10 rounded-lg")}>
                  <Quote className="h-5 w-5" aria-hidden />
                </span>
                <blockquote className="text-body-lg font-medium leading-8 text-ds-text-strong">
                  His leadership is centered on execution, ensuring that every commitment made to the customer is delivered with precision and consistency. With a clear focus on continuous improvement and technology adoption, he continues to strengthen GDK’s position as a dependable partner for leading FMCG and dairy brands.
                </blockquote>
              </div>

              <div className="space-y-5 text-body leading-8 text-ds-text-body">
                <p>
                  Ramesh Kankani, a technocrat with decades of experience in packaging manufacturing, has been the driving force behind GDK Solutions’ steady growth and reliability in the industry. His approach has always been grounded in building strong systems, maintaining process discipline, and delivering consistent quality to customers.
                </p>
                <p>
                  Over the years, he has guided GDK from a conventional setup to an integrated manufacturing unit with capabilities across extrusion, thermoforming, and an in-house tool room. This has enabled faster development, better control over production, and the ability to meet evolving customer requirements with confidence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      <section className="space-y-5">
        <motion.div
          {...headingInView}
          transition={{ duration: 0.5, ease: easePremium }}
        >
          <h2 className="text-h3 text-ds-text-strong">
            Our Journey of Growth & Innovation
          </h2>
        </motion.div>
        <ul className="space-y-5 lg:space-y-6">
          {journey.map((entry, index) => {
            const isLast = index === journey.length - 1;
            return (
              <motion.li
                key={entry.year}
                className="flex gap-4 rounded-xl px-1 py-2 transition-colors duration-200 hover:bg-accent sm:gap-5 md:gap-6"
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
                  <p className="text-2xl font-medium tracking-[-0.02em] tabular-nums text-primary">
                    {entry.year}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.2, ease: easePremium }}
                  >
                    <Card variant="interactive" className="p-5 text-foreground sm:p-6">
                      <CardContent className="p-0">
                        <p className="text-body text-ds-text-muted">
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

      <section
        id="vision-mission"
        className="scroll-mt-28 space-y-5 md:scroll-mt-32"
      >
        <motion.div
          {...headingInView}
          transition={{ duration: 0.5, ease: easePremium }}
        >
          <h2 className="text-h3 text-ds-text-strong">
            Our Vision & Mission
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {visionMission.map((item, index) => (
            <motion.div
              key={item.title}
              {...cardInView}
              whileHover={{ scale: 1.005 }}
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
              <Card variant="feature" className="h-full p-5 text-foreground sm:p-6">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-0">
                  <span className={cn(cardIconClassNames.brand, "h-10 w-10")}>
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 space-y-0">
                    <CardTitle className="text-h4 text-ds-text-strong">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <p className="text-body text-ds-text-muted">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </section>

      <section className="space-y-5">
        <motion.div
          {...headingInView}
          transition={{ duration: 0.5, ease: easePremium }}
        >
          <h2 className="text-h3 text-ds-text-strong">
            Certifications
          </h2>
        </motion.div>
        <motion.div
          {...cardInView}
          transition={{ duration: 0.55, ease: easePremium }}
          className="w-full"
        >
          <div className="flex w-full justify-start">
            <CertificationsGrid certifications={certifications} />
          </div>
        </motion.div>
      </section>

    </main>
  );
}