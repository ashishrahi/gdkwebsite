import type { Metadata } from "next";

import { CareerBenefits } from "@/components/career/career-benefits";
import { CareerCTA } from "@/components/career/career-cta";
import { CareerHero } from "@/components/career/career-hero";
import { CareerPageShell } from "@/components/career/career-page-shell";
import { HiringProcess } from "@/components/career/hiring-process";
import { OpenPositions } from "@/components/career/open-positions";
import { WhyJoinUs } from "@/components/career/why-join-us";
import { getOpenCareerPositions } from "@/lib/data/careers";

export const metadata: Metadata = {
  title: "Career | GDK Packaging",
  description:
    "Explore careers at GDK Packaging, view open roles, and learn about our hiring process.",
};

const openPositions = getOpenCareerPositions();

export default function CareerPage() {
  return (
    <CareerPageShell>
      <main className="flex w-full max-w-none! flex-1 flex-col bg-background p-0!">
        <CareerHero />
        <WhyJoinUs />
        <OpenPositions openings={openPositions} />
        <HiringProcess />
        <CareerBenefits />
        <CareerCTA />
      </main>
    </CareerPageShell>
  );
}
