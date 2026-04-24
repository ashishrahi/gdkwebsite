import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="home">
        <Hero />
      </section>

      <main className="mx-auto mt-12 w-full max-w-6xl px-6 pb-10 lg:px-10">
        <HomeSections />
      </main>
    </>
  );
}
