import type { Metadata } from "next";

import { CareerBenefits } from "@/components/career/career-benefits";
import { CareerCTA } from "@/components/career/career-cta";
import { CareerHero } from "@/components/career/career-hero";
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
    <main className="flex w-full flex-1 flex-col gap-10 lg:gap-12">
      <CareerHero />
      <WhyJoinUs />
      <OpenPositions openings={openPositions} />
      <HiringProcess />
      <CareerBenefits />
      <CareerCTA />
    </main>
  );
}
