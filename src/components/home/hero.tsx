"use client";

import { HeroSlider } from "@/components/hero/HeroSlider";

export function HeroSection() {
  return (
    <section className="relative left-1/2 isolate h-[calc(clamp(420px,78vw,620px)-var(--ds-layout-navbar-h))] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-brand-green-deep sm:h-[calc(clamp(560px,70vw,780px)-var(--ds-layout-navbar-h))] lg:h-[calc(100vh-var(--ds-layout-navbar-h))]">
      <HeroSlider />
    </section>
  );
}

export function Hero() {
  return <HeroSection />;
}
