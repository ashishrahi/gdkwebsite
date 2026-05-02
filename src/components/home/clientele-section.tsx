"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function altFromPath(path: string): string {
  const base = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  return base.replace(/[-_]/g, " ").trim() || "Client logo";
}

function LogoTile({ src }: { src: string }) {
  return (
    <div className="group relative flex h-23 w-[180px] shrink-0 items-center justify-center rounded-2xl border border-border bg-card px-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-0 transition group-hover:opacity-100" />

      <Image
        src={src}
        alt={altFromPath(src)}
        width={160}
        height={72}
        className="max-h-[3.2rem] w-auto object-contain opacity-80 transition-all duration-300 group-hover:scale-[1.06] group-hover:opacity-100"
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
    <section className="relative w-full bg-background py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Clientele
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Trusted by leading brands across FMCG, dairy, and food & beverage.
          </p>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-linear-to-r from-background via-background/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-linear-to-l from-background via-background/90 to-transparent" />

        <motion.div
          className="flex w-max gap-8"
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
    </section>
  );
}
