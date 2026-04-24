"use client";

import { ArrowRight, Box, Globe, Package, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const trustStats = [
  { value: "500+", label: "Bulk Orders Monthly", icon: Package },
  { value: "24-48h", label: "Fast Dispatch", icon: Truck },
  { value: "Pan India", label: "Supply Coverage", icon: Globe },
];

const productRows = [
  {
    title: "Corrugated Box Sets",
    description: "3/5 ply heavy-duty packaging",
    tag: "Top Seller",
    icon: Box,
    tagClass: "border-[#1450c8]/20 bg-[#1450c8]/10 text-[#1450c8]",
  },
  {
    title: "BOPP Tape Rolls",
    description: "Machine and manual grades",
    tag: "Industrial",
    icon: Package,
    tagClass: "border-[#f26a21]/25 bg-[#f26a21]/15 text-[#f26a21]",
  },
  {
    title: "Courier Bags",
    description: "Tamper-safe e-commerce dispatch",
    tag: "Secure",
    icon: ShieldCheck,
    tagClass: "border-[#1450c8]/20 bg-[#1450c8]/10 text-[#1450c8]",
  },
  {
    title: "Stretch Films",
    description: "High clarity wrap protection",
    tag: "Bulk",
    icon: Truck,
    tagClass: "border-[#f26a21]/25 bg-[#f26a21]/15 text-[#f26a21]",
  },
];

export function Hero() {
  return (
    <section className="group relative min-h-screen overflow-hidden bg-linear-to-br from-white via-slate-50 to-orange-50 px-6 pt-24 pb-12 sm:px-8 sm:pt-28 lg:px-10 lg:pt-32">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=80"
          alt="Industrial packaging warehouse with stacked boxes and production operations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-100 brightness-[0.95] contrast-[1.08] saturate-[1.05] transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/38 backdrop-blur-[0.5px]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-white/52 via-white/26 to-white/40" />
      <div className="pointer-events-none absolute -left-20 top-24 z-0 h-72 w-72 rounded-full bg-[#1450c8]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 bottom-20 z-0 h-72 w-72 rounded-full bg-[#f26a21]/12 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1450px] items-center gap-12 pt-2 lg:-translate-y-[10px] lg:grid-cols-[1fr_520px] lg:gap-16 lg:pt-4">
        <div className="max-w-[600px] space-y-8 motion-safe:animate-[fade-in_0.7s_ease-out]">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-slate-700 uppercase shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
            Trusted Packaging Manufacturer Since 2012
          </div>

          <h1 className="text-[2.4rem] leading-[1.03] font-black tracking-tight text-slate-950 sm:text-[3rem] lg:text-[4.05rem]">
            Modern Packaging
            <br />
            Built for <span className="text-[#f26a21]">Growth</span>
          </h1>

          <p className="max-w-[60ch] text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            High-quality corrugated boxes, films, tapes and custom industrial
            packaging solutions for modern businesses.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="group/primary rounded-full bg-[#f26a21] px-7 text-white shadow-[0_16px_34px_rgba(242,106,33,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#de5b17]"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 text-white! no-underline hover:text-white!"
              >
                <span className="text-white!">Explore Products</span>
                <ArrowRight className="size-4 text-white transition-transform duration-300 group-hover/primary:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group/quote rounded-full border-slate-300 bg-white px-7 text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-slate-800! no-underline hover:text-slate-900!"
              >
                <span className="text-slate-800!">Get Quote</span>
                <ArrowRight className="size-4 text-slate-700 transition-transform duration-300 group-hover/quote:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {trustStats.map((stat, index) => (
              <Card
                key={stat.label}
                className="border-slate-200 bg-white/88 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <CardContent className="px-4 py-4">
                  <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#f26a21]/10 text-[#f26a21]">
                    <stat.icon className="h-[18px] w-[18px]" />
                  </span>
                  <p className="text-lg font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="relative mx-auto w-full max-w-[520px] border-slate-200 bg-white p-2.5 shadow-xl transition-all duration-500 hover:-translate-y-1">
          <CardContent className="rounded-[22px] border border-slate-200/80 bg-white p-3.5">
            <CardHeader className="space-y-2 p-0">
              <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
                Premium Product Range
              </CardTitle>
              <p className="text-sm text-slate-600">
                Reliable industrial packaging engineered for speed, scale and
                consistency.
              </p>
            </CardHeader>

            <div className="mt-3.5 space-y-2.5">
              {productRows.map((item) => (
                <div
                  key={item.title}
                  className="group/row flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_26px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#06162f]/8 text-[#1450c8]">
                      <item.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase",
                      item.tagClass
                    )}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {["Boxes", "Films", "Tapes"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
                >
                  {tab}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
