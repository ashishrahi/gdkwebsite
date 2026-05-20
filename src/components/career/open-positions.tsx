import { ApplyNowButton } from "@/components/career/apply-now-button";
import {
  HomeSection,
  SectionHeader,
  homeContentSpacingClassName,
  homeGridClassName,
  premiumCardClassName,
} from "@/components/home/home-card-system";
import type { CareerOpening } from "@/lib/data/careers";
import { cn } from "@/lib/utils";

const applyCtaClassName =
  "inline-flex h-12.5 w-full items-center justify-center rounded-full bg-brand-accent px-8 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-white no-underline shadow-(--ds-shadow-button-primary) transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-white";

type OpenPositionsProps = {
  openings: CareerOpening[];
};

export function OpenPositions({ openings }: OpenPositionsProps) {
  return (
    <HomeSection id="open-positions">
      <SectionHeader
        eyebrow="Open Positions"
        title="Current roles where you can make an impact."
        description="Explore opportunities across product development, quality, sales, and operations."
      />

      <div
        className={cn(
          homeGridClassName,
          homeContentSpacingClassName,
          "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        )}
      >
        {openings.map((opening) => (
          <article
            key={opening.slug}
            className={cn(
              premiumCardClassName,
              "group/position flex flex-col p-6 sm:p-8"
            )}
          >
            <div className="flex flex-wrap gap-2">
              {opening.tags.map((tag) => (
                <span
                  key={tag}
                  className="ds-eyebrow border-[color-mix(in_srgb,var(--brand-accent)_26%,transparent)] bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] text-brand-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <h3 className="text-h4 text-ds-text-strong">{opening.title}</h3>
              <p className="max-w-prose text-body-sm text-ds-text-body">
                {opening.description}
              </p>
            </div>

            <dl className="mt-10 grid gap-4">
              {(
                [
                  ["Department", opening.department],
                  ["Location", opening.location],
                  ["Experience", opening.experience],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-ds-border-subtle bg-ds-surface-muted px-4 py-3"
                >
                  <dt className="text-body-sm text-ds-text-muted">{label}</dt>
                  <dd className="text-right text-sm font-medium text-ds-text-strong">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto pt-10">
              <ApplyNowButton opening={opening} className={applyCtaClassName} />
            </div>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
