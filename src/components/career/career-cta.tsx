import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/home/home-card-system";

export function CareerCTA() {
  return (
    <section aria-labelledby="career-cta-title">
      <div
        className={cn(
          cardSurfaceVariants({
            variant: "gradient",
            padding: "xl",
          }),
          "rounded-ds-card-lg p-6 sm:p-8 lg:p-10"
        )}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Stronger readable text */}
          <div className="max-w-3xl">
            <SectionHeader
              eyebrow="Ready to apply?"
              title="Take the next step with GDK Packaging."
              description="Send us a message with your resume and a short summary of the role you are targeting. We will respond with the next step within two business days."
              titleLevel="h3"
              align="left"
            />
          </div>

          <Button
            asChild
            size="lg"
            className="bg-brand-accent text-white shadow-none"
          >
            <Link href="/#contact">Send your interest</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}