import { Award, ShieldCheck, Target } from "lucide-react";

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
        <h1 className="text-4xl font-semibold tracking-tight">About GDK Packaging</h1>
        <p className="text-muted-foreground">
          We provide industrial-grade packaging products designed for durability,
          consistency, and operational efficiency.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">What We Do</h2>
        <p>
          From LDPE and HDPE materials to custom packaging films and industrial
          solutions, GDK helps businesses ship safer and scale faster with dependable
          supply and support.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {aboutPillars.map((pillar) => (
          <article key={pillar.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f26a21]/10 text-[#f26a21]">
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
