import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer id="site-footer" className="w-full shrink-0 bg-brand-green-deep">

      {/* TOP STRIP */}
      <div className="border-y border-ds-border-subtle bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-ds-page-x py-5 sm:flex-row sm:items-center lg:gap-8">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo-white.png"
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
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_82%_45%,color-mix(in_srgb,var(--brand-blue-500)_16%,transparent),transparent_34%),linear-gradient(135deg,var(--brand-green-950),var(--brand-green-900))] text-white">

        {/* GLOW */}
        <div className="pointer-events-none absolute top-1/2 right-[18%] z-0 size-[min(70vw,420px)] -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--brand-orange-500)_12%,transparent)] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-ds-page-x py-10 sm:py-12">

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:gap-14">

            {/* LOGO */}
            <div className="flex flex-col gap-4">
              <Image
                src="/logo-white1.png"
                alt="GDK Packaging"
                width={250}
                height={170}
                className="h-auto w-45 object-contain sm:w-55 md:w-62.5"
              />
              <p className="max-w-[56ch] text-body-sm font-medium text-white/72 sm:text-body">
                From Concept to Solution.{" "}
                <span className="text-(--brand-orange-500)">With Sustainability Built In.</span>
              </p>
            </div>

            {/* TEXT */}
            <div className="flex flex-1 justify-start md:justify-end lg:mt-10">
              <h2 className="relative z-20 text-left font-light text-white drop-shadow-[0_2px_10px_color-mix(in_srgb,white_20%,transparent)] md:text-right">

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
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">

            {/* SOCIAL — links hidden; spacing preserved */}
            <div
              className="flex min-h-5 flex-wrap items-center gap-5 sm:gap-6"
              aria-hidden="true"
            />

            {/* COPYRIGHT */}
            <div className="text-sm text-white/80">
              © 2026 GDK Packaging Pvt. Ltd.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}