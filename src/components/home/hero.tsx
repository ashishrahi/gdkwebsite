"use client";

import { HeroSlider } from "@/components/hero/HeroSlider";
import Link from "next/link";

const heroEyebrow = "About GDK Packaging";
const heroTitle = "Engineering Reliable Packaging Solutions for Modern Industries";
const heroDescription =
  "Precision-built packaging systems backed by disciplined manufacturing, custom engineering, and dependable bulk supply.";

export function HeroSection() {
  return (
    <section className="relative left-1/2 isolate w-screen -translate-x-1/2 overflow-hidden bg-brand-green-deep">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-brand-green-deep sm:aspect-video lg:aspect-2/1 lg:min-h-[600px] xl:aspect-21/9">
        <HeroSlider />
        <div className="relative z-20 mx-auto flex h-full w-full max-w-352 items-center px-ds-page-x py-10 sm:py-12 lg:py-16">
          <div className="max-w-172 rounded-[1.5rem] border border-white/10 bg-[color-mix(in_srgb,var(--brand-green-950)_18%,transparent)] p-6 text-white sm:p-8 lg:p-9">
            <span className="inline-flex w-fit rounded-full border border-white/18 bg-white/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-(--ds-type-eyebrow-letter-spacing) text-white/88">
              {heroEyebrow}
            </span>
            <h1 className="mt-5 max-w-3xl text-display text-white">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg font-normal text-white/82">
              {heroDescription}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex min-h-12.5 items-center justify-center rounded-full bg-brand-accent px-8 py-3 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-white no-underline shadow-(--ds-shadow-button-primary) transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-white"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return <HeroSection />;
}
