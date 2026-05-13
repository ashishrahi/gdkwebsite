"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

const heroSubtitle =
  "At our Kanpur facility, we specialize in manufacturing PP UFT containers, glasses, and cups.";

const heroMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const easePremium = [0.16, 1, 0.3, 1] as const;
const easeHeroY = [0.22, 1, 0.36, 1] as const;

export function AboutHero() {
  return (
    <section className={cn(cardSurfaceVariants({ variant: "default" }), "mb-28 scroll-mt-36 rounded-xl md:scroll-mt-40")}>
      <motion.div
        className="flex flex-col gap-8 px-6 py-6 text-left md:gap-10 md:px-10 md:py-10"
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
            className="w-full h-auto object-contain object-center bg-white md:h-72 md:object-cover"
            priority
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-h2 text-foreground">
            K.B. Ropes Pvt Ltd
          </h2>
          <p className="text-body-lg text-muted-foreground">
            From Concept to Solution.{" "}
            <span className="text-primary">With Sustainability Built In.</span>
          </p>
          <p className="text-body-lg text-foreground/75">
            {heroSubtitle}
          </p>
          <div className="space-y-5 text-body-lg text-foreground/75">
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
  );
}
