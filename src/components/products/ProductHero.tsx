import Image from "next/image";

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
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white">
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
      <div className="absolute inset-0 bg-linear-to-r from-[#042819]/58 via-[#063c25]/46 to-[#063c25]/30" />
      <div className="relative z-10 mx-auto grid min-h-72 max-w-5xl content-center gap-4 px-6 py-12 sm:px-10">
        <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
          <span className="rounded-full bg-[color:color-mix(in_srgb,var(--brand-accent)_22%,transparent)] px-3 py-1 text-[color:color-mix(in_srgb,var(--brand-accent)_78%,white)]">{category}</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{material}</span>
        </div>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
          {shortDescription}
        </p>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">{heroText}</p>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
