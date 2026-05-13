import Image from "next/image";

import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

type ProductHeroProps = {
  category: string;
  material: string;
  title: string;
  shortDescription: string;
  heroText: string;
  badges: string[];
  heroImage: string;
};

export function ProductHero({
  category,
  material,
  title,
  shortDescription,
  heroText,
  badges,
  heroImage,
}: ProductHeroProps) {
  return (
    <section className={cn(cardSurfaceVariants({ variant: "bordered" }), "rounded-ds-card-lg border-[color-mix(in_srgb,var(--brand-blue-500)_28%,var(--border))] bg-brand-green-deep text-white")}>
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-[color-mix(in_srgb,var(--brand-green-950)_78%,transparent)] via-[color-mix(in_srgb,var(--brand-green-950)_58%,transparent)] to-[color-mix(in_srgb,var(--brand-green-950)_34%,transparent)]" />
      <div className="relative z-10 grid min-h-104 content-center gap-5 p-6 py-12 sm:p-8 sm:py-14 lg:p-10 lg:py-16">
        <div className="flex flex-wrap gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase">
          <span className="rounded-full bg-[color-mix(in_srgb,var(--brand-accent)_22%,transparent)] px-3.5 py-1.5 leading-none text-[color-mix(in_srgb,var(--brand-accent)_78%,white)]">{category}</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 leading-none text-white/82">{material}</span>
        </div>
        <h1 className="max-w-3xl text-h1 text-white">
          {title}
        </h1>
        <p className="max-w-3xl text-body-sm font-medium text-white/76">
          From Concept to Solution.{" "}
          <span className="text-(--brand-orange-500)">With Sustainability Built In.</span>
        </p>
        <p className="max-w-2xl text-body text-white/84">
          {shortDescription}
        </p>
        <p className="max-w-3xl text-body-sm text-white/76">{heroText}</p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold leading-none text-white/90"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
