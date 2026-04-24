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
    </main>
  );
}
