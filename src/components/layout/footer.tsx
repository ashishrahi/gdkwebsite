import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer id="site-footer" className="w-full shrink-0 bg-[#1F1F1F]">

      {/* TOP STRIP */}
      <div className="border-y border-ds-border-subtle bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-ds-page-x py-5 sm:flex-row sm:items-center lg:gap-8">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/GDK_LOGO.jpg"
              alt="GDK Packaging"
              width={190}
              height={52}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
           <p className="max-w-[56ch] text-body-sm font-medium text-white/72 sm:text-body">
                From Concept to Solution.{" "}
                <span className="text-(--brand-orange-500)">With Sustainability Built In.</span>
              </p>
        </div>
      </div>


      {/* BLACK HERO SECTION */}
      <div className="relative overflow-hidden bg-[#1F1F1F] text-white">

        {/* GLOW — subtle cyan only, behind heading area */}
        <div className="pointer-events-none absolute top-1/2 right-[18%] z-0 size-[min(70vw,420px)] -translate-y-1/2 rounded-full bg-[rgba(0,173,239,0.08)] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-ds-page-x py-10 sm:py-12">

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:gap-14">

            {/* LOGO */}
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit overflow-hidden rounded-ds-card border border-[rgba(0,173,239,0.14)]  shadow-[0_2px_10px_rgb(31_31_31/0.14)]">
                <div className="overflow-hidden rounded-ds-card [&_img]:block [&_img]:rounded-ds-card [&_img]:object-contain [&_span]:block [&_span]:overflow-hidden [&_span]:rounded-ds-card">
                  <Image
                    src="/GDK_LOGO-Footer.png"   
                    alt="GDK Solutions"
                    width={350}
                    height={245}
                    className="h-auto w-45 sm:w-55 md:w-62.5"
                  />
                </div>
              </div>
              <p className="max-w-[56ch] text-body-sm font-medium text-[#D9D9D9] sm:text-body">
                From Concept to Solution.{" "}
                <span className="text-[#F58220]">With Sustainability Built In.</span>
              </p>
            </div>

            {/* TEXT */}
            <div className="flex flex-1 justify-start md:justify-end lg:mt-10">
              <h2 className="relative z-20 text-left font-light text-white drop-shadow-[0_2px_10px_rgb(31_31_31/0.35)] md:text-right">

                <span className="block text-[clamp(2rem,10vw,4.5rem)] leading-tight">
                  EXECUTIVE EXCELLENCE
                </span>

                <span className="block text-[clamp(2rem,10vw,4.5rem)] leading-tight">
                  IN PACKAGING
                </span>

              </h2>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[rgba(0,173,239,0.14)] pt-8 md:flex-row md:items-center">

            {/* SOCIAL — links hidden; spacing preserved */}
            <div
              className="flex min-h-5 flex-wrap items-center gap-5 sm:gap-6"
              aria-hidden="true"
            />

            {/* COPYRIGHT */}
            <div className="text-sm text-[#A3A3A3]">
              © 2026 GDK Solutions.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}