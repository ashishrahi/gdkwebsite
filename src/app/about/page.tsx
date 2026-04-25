import { Award, ShieldCheck, Target } from "lucide-react";
import Image from "next/image";

import { GlobalBreadcrumb } from "@/components/layout/global-breadcrumb";

const aboutPillars = [
  {
    title: "Mission",
    description: "Deliver dependable packaging systems that improve safety and operational speed.",
    icon: Target,
  },
  {
    title: "Vision",
    description: "Build a future-ready packaging ecosystem with long-term customer partnerships.",
    icon: Award,
  },
  {
    title: "Quality",
    description: "Maintain strict quality standards across material selection and production.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="space-y-3">
       
      </section>

      <div id="kb-ropes" className="scroll-mt-28 h-0 md:scroll-mt-32" />

      <section className="space-y-3 scroll-mt-36 rounded-xl border border-border bg-card p-6 md:scroll-mt-40">
        <div className="mx-auto max-w-3xl space-y-5 text-left">
          <GlobalBreadcrumb
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/about#kb-ropes", label: "K.B. Ropes" },
            ]}
            className="mb-6 max-w-none px-0 pt-0 pb-0"
          />
          <div className="mb-8">
            <Image
              src="/images/hero/kankani.png"
              alt="Kankani Manufacturing Facility"
              width={1400}
              height={500}
              className="w-full h-56 md:h-72 rounded-xl object-cover object-center"
            />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
            K.B. Ropes Pvt Ltd
          </h2>
          <div className="space-y-5 text-sm leading-7 text-zinc-700 sm:text-base sm:leading-8 dark:text-zinc-300">
            <p>
              At our Kanpur facility, we specialize in manufacturing PP UFT containers, glasses, and cups. These products find applications in the food and other industries. Our range includes ice cream cups and glasses, as well as containers in round, octagonal, and rectangular shapes, with capacities ranging from 50 mL to 1000 ML. Not only are our containers refrigerated, but they are also microwave-safe and highly affordable. They are designed to suit a wide range of products.
            </p>
            <p>
              Our production unit is equipped with six state-of-the-art TFM machines and a four-color UV printing machine that uses food-grade inks. Additionally, we have an in-house double-barrel extrusion machine for manufacturing sheets compatible with various polymer types. With a processing capacity of 900 TPA, we are well-positioned to meet the demands of our customers.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {aboutPillars.map((pillar) => (
          <article key={pillar.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:color-mix(in_srgb,var(--brand-accent)_14%,white)] text-[var(--brand-accent)]">
              <pillar.icon className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
