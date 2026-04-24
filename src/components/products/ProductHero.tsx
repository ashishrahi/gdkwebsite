import Image from "next/image";

type ProductHeroProps = {
  category: string;
  material: string;
  title: string;
  shortDescription: string;
  heroImage: string;
};

export function ProductHero({
  category,
  material,
  title,
  shortDescription,
  heroImage,
}: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover opacity-45"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/85 to-slate-900/60" />
      <div className="relative z-10 mx-auto grid min-h-72 max-w-5xl content-center gap-4 px-6 py-12 sm:px-10">
        <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
          <span className="rounded-full bg-orange-300/15 px-3 py-1 text-orange-300">{category}</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{material}</span>
        </div>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
          {shortDescription}
        </p>
      </div>
    </section>
  );
}
