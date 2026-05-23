"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  SectionHeader,
  homeContentSpacingClassName,
} from "@/components/home/home-card-system";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

function altFromPath(path: string): string {
  const base = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  return base.replace(/[-_]/g, " ").trim() || "Client logo";
}

function LogoTile({ src }: { src: string }) {
  return (
    <div
      className={cn(
        "group flex h-30 w-56 shrink-0 items-center justify-center px-7 sm:h-34 sm:w-64 sm:px-9",
        cardSurfaceVariants({ variant: "minimal" }),
        "rounded-ds-card-lg"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-0 transition group-hover:opacity-100" />

      <Image
        src={src}
        alt={altFromPath(src)}
        width={180}
        height={80}
        className="max-h-16 w-auto object-contain opacity-80 transition-all duration-200 group-hover:opacity-100 sm:max-h-18"
      />
    </div>
  );
}

export function ClienteleSection() {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPaths(data);
      })
      .catch(() => setPaths([]));
  }, []);

  const loop = useMemo(() => [...paths, ...paths], [paths]);

  if (loop.length === 0) return null;

  return (
    <section className="relative mb-0 w-full bg-background py-ds-section-y">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="ds-container">
        <SectionHeader
          eyebrow="Trusted Brands"
          title="Our Clientele"
          description="Trusted by leading brands across FMCG, dairy, and food & beverage."
        />
      </div>

      <div className={`relative overflow-hidden ${homeContentSpacingClassName}`}>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-linear-to-r from-background via-background/90 to-transparent sm:w-24 lg:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-linear-to-l from-background via-background/90 to-transparent sm:w-24 lg:w-40" />

        <div className="py-5">
          <motion.div
            className="flex w-max gap-6 will-change-transform sm:gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 38,
              ease: "linear",
            }}
          >
            {loop.map((src, i) => (
              <LogoTile key={`${src}-${i}`} src={src} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
