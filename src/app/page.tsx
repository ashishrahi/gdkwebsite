import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";

export default function Home() {
  return (
    <>
      <section id="home" className="scroll-mt-(--ds-layout-navbar-h) mb-0!">
        <Hero />
      </section>

<<<<<<< Updated upstream
=======
      <ClienteleSection />

>>>>>>> Stashed changes
      <main className="w-full max-w-none! bg-background p-0!">
        <HomeSections />
      </main>
    </>
  );
}
