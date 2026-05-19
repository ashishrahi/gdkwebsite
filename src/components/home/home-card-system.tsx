import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import {
  cardIconClassNames,
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "gradient";
type SectionAlign = "center" | "left";

const sectionShellClassName =
  "relative mb-0 w-full overflow-hidden py-ds-section-y";
const sectionContainerClassName = "ds-container";
const centeredHeaderMeasureClassName =
  "w-full";
const leftHeaderMeasureClassName = "ds-section-header-left w-full";
const centeredTitleMeasureClassName =
  "mx-auto";
const sectionDescriptionMeasureClassName =
  "w-full text-pretty";

export const homeGridClassName =
  "grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10";

export const homeContentSpacingClassName = "mt-12 sm:mt-14 lg:mt-16";

export const premiumCardClassName = cn(
  cardSurfaceVariants({ variant: "interactive" }),
  "mb-0 flex h-full min-h-full flex-col rounded-ds-card bg-white"
);

export function HomeSection({
  id,
  tone = "default",
  children,
  className,
  containerClassName,
}: {
  id: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        sectionShellClassName,
        tone === "gradient"
          ? "bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--brand-green-700)_28%,transparent),transparent_34%),linear-gradient(135deg,var(--brand-green-950),var(--brand-green-900))]"
          : "bg-background odd:bg-background even:bg-ds-surface-muted",
        className
      )}
    >
      <div className={cn(sectionContainerClassName, containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "default",
  align = "center",
  titleLevel = "h2",
  spacing = "default",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: SectionTone;
  align?: SectionAlign;
  titleLevel?: "h2" | "h3";
  spacing?: "default" | "relaxed";
  className?: string;
}) {
  const isInverse = tone === "gradient";
  const isRelaxed = spacing === "relaxed";
  const headerGapClassName = isRelaxed
    ? "gap-6 lg:gap-7"
    : "gap-5 lg:gap-6";
  const headerStackClassName =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const eyebrowClassName = align === "center" ? "self-center justify-self-center" : "self-start";
  const copyClassName =
    align === "center"
      ? "mx-auto items-center text-center"
      : "mx-0 items-start text-left";
  const titleClassName = cn(
    "text-balance",
    titleLevel === "h3" ? "text-h3" : "text-h2",
    align === "center" ? centeredTitleMeasureClassName : "mx-0 max-w-3xl",
    isInverse ? "text-white!" : "text-ds-text-strong"
  );
  const titleElement =
    titleLevel === "h3" ? (
      <h3 className={titleClassName}>{title}</h3>
    ) : (
      <h2 className={titleClassName}>{title}</h2>
    );
  const descriptionElement = description ? (
    <p
      className={cn(
        "text-body-lg",
        sectionDescriptionMeasureClassName,
        align === "center" ? "mx-auto" : "mx-0",
        isInverse ? "text-white!" : "text-ds-text-body"
      )}
    >
      {description}
    </p>
  ) : null;

  return (
    <div
      className={cn(
        "ds-section-header",
        isRelaxed && "ds-section-header-stack",
        align === "center" ? centeredHeaderMeasureClassName : leftHeaderMeasureClassName,
        className
      )}
    >
      <div className={cn("flex w-full flex-col", headerGapClassName, headerStackClassName)}>
        <span
          className={cn(
            "ds-eyebrow justify-center shadow-[inset_0_1px_0_rgb(255_255_255/0.55),0_8px_20px_rgb(8_17_31/0.04)]",
            eyebrowClassName,
            isInverse
              ? "border-white/25 bg-white/11 text-white/90 backdrop-blur-md"
              : "border-[color-mix(in_srgb,var(--brand-accent)_26%,transparent)] bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] text-brand-accent"
          )}
        >
          {eyebrow}
        </span>
        <div
          className={cn(
            "ds-section-header-copy flex max-w-3xl flex-col gap-3.5! lg:gap-4!",
            copyClassName
          )}
        >
          {titleElement}
          {descriptionElement}
        </div>
      </div>
    </div>
  );
}

export function PremiumCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn(premiumCardClassName, "p-6 sm:p-8", className)}>
      {children}
    </article>
  );
}

export function ServiceCard({
  title,
  description,
  image,
  icon: Icon,
  href = "/products",
}: {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  href?: string;
}) {
  return (
    <article className={cn(premiumCardClassName, "group/service overflow-hidden p-0")}>
      <div className="relative h-48 w-full overflow-hidden rounded-t-ds-card sm:h-56">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-ds-out group-hover/service:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[color-mix(in_srgb,var(--brand-green-950)_35%,transparent)] via-transparent to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-col p-6 pt-10 sm:p-7 sm:pt-11">
        <span className="absolute -top-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-ds-border-subtle bg-white text-brand-accent shadow-ds-card-subtle">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="m-0 text-h4 text-ds-text-strong">
          {title}
        </h3>
        <p className="m-0 mt-3.5 max-w-prose text-body-sm text-ds-text-body">
          {description}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-brand-accent no-underline transition-colors duration-200 ease-ds-out hover:text-brand-accent-hover"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-ds-out group-hover/service:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className={cn(premiumCardClassName, "min-h-61 gap-6 p-6 sm:p-8")}>
      <span className={cn(cardIconClassNames.brand, "h-11 w-11 border border-ds-border-subtle")}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3.5">
        <h3 className="m-0 text-h4 text-ds-text-strong">{title}</h3>
        <p className="m-0 max-w-prose text-body-sm text-ds-text-body">
          {description}
        </p>
      </div>
    </article>
  );
}

export function StatCard({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <article className={cn(premiumCardClassName, "min-h-24 flex-row items-center gap-4 p-5 sm:p-6")}>
      <span className={cn(cardIconClassNames.brand, "h-10 w-10 border border-ds-border-subtle")}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="m-0 min-w-0 text-sm font-medium leading-snug text-ds-text-strong">
        {label}
      </p>
    </article>
  );
}

export function ProcessCard({
  step,
  title,
  description,
  icon: Icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="relative mb-0 flex h-full pt-7">
      <div className="absolute left-6 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/45 bg-white text-brand-accent shadow-ds-card-medium">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <div className="flex min-h-60 w-full flex-col rounded-ds-card border border-white/15 bg-white/8 p-6 pt-14 text-white shadow-ds-card-subtle backdrop-blur-xl transition-[border-color,box-shadow,transform,background-color] duration-200 ease-ds-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12 hover:shadow-ds-card-medium">
        <p className="m-0 text-xs font-medium uppercase leading-none tracking-(--ds-type-eyebrow-letter-spacing) text-white/70">
          Step {step}
        </p>
        <div className="mt-5 flex min-w-0 flex-1 flex-col gap-3.5">
          <h3 className="m-0 text-h4 text-white">
            {title}
          </h3>
          <p className="m-0 max-w-prose text-body-sm text-white/85">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
