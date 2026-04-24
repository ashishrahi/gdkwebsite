import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";

export default function Home() {
  return (
    <>
      <Hero />

      <main className="mx-auto mt-12 w-full max-w-6xl px-6 pb-10 lg:px-10">
        <HomeSections />
      </main>
    </>
  );
}
