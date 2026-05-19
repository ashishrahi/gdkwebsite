import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CareerOpening } from "@/lib/data/careers";
import { SectionHeader } from "@/components/home/home-card-system";

type OpenPositionsProps = {
  openings: CareerOpening[];
};

export function OpenPositions({ openings }: OpenPositionsProps) {
  return (
    <section
      className="ds-section"
      aria-labelledby="career-open-positions-title"
    >
      <div className="space-y-10">
        {/* Center aligned header */}
        <SectionHeader
          eyebrow="Open Positions"
          title="Current roles where you can make an impact."
          description="Explore opportunities across product development, quality, sales, and operations."
          titleLevel="h3"
          align="center"
        />

        {/* Center aligned grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {openings.map((opening) => (
              <Card
                key={opening.slug}
                className="group flex h-full flex-col rounded-ds-card-lg border-ds-border-subtle bg-card shadow-ds-card-subtle"
                variant="default"
              >
                <CardHeader className="px-6 pt-6 pb-4">
                  {/* Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    {opening.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ds-border-subtle bg-[color-mix(in_srgb,var(--brand-accent)_10%,white)] px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-brand-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Badge → Title */}
                  <CardTitle className="mt-8 text-h4 text-ds-text-strong">
                    {opening.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pt-0 pb-6 text-body-sm text-ds-text-body">
                  {/* Title → Description */}
                  <p className="leading-7">{opening.description}</p>

                  {/* Details */}
                  <div className="mt-8 grid gap-4 text-sm text-ds-text-muted">
                    <div className="flex items-center justify-between rounded-2xl bg-ds-surface-muted px-4 py-3">
                      <span>Department</span>
                      <span className="font-medium text-ds-text-strong">
                        {opening.department}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-ds-surface-muted px-4 py-3">
                      <span>Location</span>
                      <span className="font-medium text-ds-text-strong">
                        {opening.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-ds-surface-muted px-4 py-3">
                      <span>Experience</span>
                      <span className="font-medium text-ds-text-strong">
                        {opening.experience}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="mt-auto border-t border-ds-border-subtle bg-transparent px-6 py-6">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-brand-accent text-white shadow-none"
                  >
                    <Link href="/#contact">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}