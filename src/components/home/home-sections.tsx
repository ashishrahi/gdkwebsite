import Image from "next/image";
import {
  Award,
  BadgeCheck,
  Beaker,
  CakeSlice,
  Cog,
  Cpu,
  CupSoda,
  Leaf,
  Layers3,
  Milk,
  Package,
  PencilRuler,
  ShoppingBag,
  ShieldCheck,
  Tv,
  Truck,
  Zap,
} from "lucide-react";

const trustStats = [
  "25+ Years Experience",
  "500+ Clients Served",
  "ISO Certified",
  "Bulk Production Ready",
];

const homeProducts = [
  {
    name: "Plastic Rigid Sheets",
    description: "Durable rigid sheets built for high-performance industrial packaging.",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Food Packaging Containers",
    description: "Hygienic food-grade containers engineered for freshness and safety.",
    image:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Laminated Packaging",
    description: "Multi-layer laminated formats for superior barrier protection needs.",
    image:
      "https://images.unsplash.com/photo-1635865165118-917ed9e20936?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Dairy & Yogurt Containers",
    description: "Precision-molded dairy containers for clean filling and shelf appeal.",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "MAP & Retort Packaging",
    description: "Advanced packs optimized for extended shelf life and heat stability.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Injection Moulded Containers",
    description: "Robust injection moulded containers for scalable industrial output.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
];

const industries = [
  {
    title: "Dairy",
    description:
      "Reliable dairy packaging designed for hygiene, freshness retention, and high-volume processing lines.",
    icon: Milk,
  },
  {
    title: "FMCG",
    description:
      "Scalable FMCG packaging formats built for speed, shelf impact, and consistent supply fulfillment.",
    icon: Package,
  },
  {
    title: "Bakery",
    description:
      "Protective bakery packaging that maintains product integrity from production to point-of-sale display.",
    icon: CakeSlice,
  },
  {
    title: "Food & Beverage",
    description:
      "Food-safe, performance-tested packaging systems suited for varied beverage and processed food applications.",
    icon: CupSoda,
  },
  {
    title: "Retail",
    description:
      "Consumer-ready retail packaging crafted for durability, branding appeal, and efficient logistics handling.",
    icon: ShoppingBag,
  },
  {
    title: "Pharmaceuticals",
    description:
      "Compliance-focused pharmaceutical packaging engineered for protection, traceability, and secure distribution.",
    icon: Beaker,
  },
  {
    title: "Electronics",
    description:
      "Precision packaging solutions for electronics that reduce transit damage and improve component safety.",
    icon: Tv,
  },
  {
    title: "Ready-to-Eat Food",
    description:
      "Convenient, durable packaging for ready-to-eat products with dependable sealing and shelf-life support.",
    icon: BadgeCheck,
  },
];

const whyChooseUsFeatures = [
  {
    title: "Advanced Manufacturing Technology",
    description:
      "State-of-the-art production infrastructure ensures precision, consistency, and high-volume delivery for complex packaging requirements.",
    icon: Cpu,
    iconBoxClassName: "border-blue-200/70 bg-blue-50 text-blue-600",
  },
  {
    title: "Custom Packaging Design",
    description:
      "Our design specialists create tailored packaging formats aligned with your product, branding, and operational workflows.",
    icon: PencilRuler,
    iconBoxClassName: "border-purple-200/70 bg-purple-50 text-purple-600",
  },
  {
    title: "Sustainable Materials",
    description:
      "Eco-conscious material choices and responsible sourcing help reduce environmental impact without compromising performance.",
    icon: Leaf,
    iconBoxClassName: "border-green-200/70 bg-green-50 text-green-600",
  },
  {
    title: "Global Quality Standards",
    description:
      "Strict quality controls and industry-aligned processes deliver dependable packaging trusted by clients across global markets.",
    icon: Award,
    iconBoxClassName: "border-orange-200/70 bg-orange-50 text-orange-600",
  },
];

const manufacturingProcessSteps = [
  {
    step: "01",
    title: "Raw Material",
    description: "Premium quality raw materials sourced from certified suppliers.",
    icon: Package,
  },
  {
    step: "02",
    title: "Extrusion",
    description: "Advanced extrusion process for optimal material properties.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Thermoforming",
    description: "Precision thermoforming for exact specifications.",
    icon: Layers3,
  },
  {
    step: "04",
    title: "Injection Moulding",
    description: "High-precision injection moulding for complex shapes.",
    icon: Cog,
  },
  {
    step: "05",
    title: "Quality Testing",
    description: "Rigorous quality control at every stage.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Packaging & Delivery",
    description: "Safe packaging and timely delivery worldwide.",
    icon: Truck,
  },
];

export function HomeSections() {
  return (
    <>
      <section
        id="about"
        className="mt-8 rounded-2xl bg-linear-to-br from-orange-50 via-white to-emerald-50 p-4 shadow-sm sm:p-6 lg:mt-12 lg:p-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
              alt="Industrial packaging warehouse and manufacturing floor"
              width={1200}
              height={900}
              className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[360px] lg:h-[460px]"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="space-y-5 lg:space-y-6">
            <span className="inline-flex rounded-full border border-[#f26a21]/20 bg-[#f26a21]/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[#f26a21]">
              ABOUT GDK PACKAGING
            </span>

            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Engineering Reliable Packaging Solutions for Modern Industries
            </h2>

            <div className="space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                GDK Packaging brings decades of manufacturing expertise to deliver
                precision-built packaging systems for high-demand industrial operations.
                Our teams combine process discipline with practical engineering to support
                complex production environments.
              </p>
              <p>
                From custom packaging solutions to stringent quality control, we help
                procurement and operations leaders reduce risk while maintaining consistent
                output. With reliable bulk supply timelines and sustainability-focused
                material choices, we are built to scale with your business.
              </p>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {trustStats.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-all duration-300 hover:border-[#2f8f83]/40 hover:shadow-md"
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2f8f83]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-flex rounded-full border border-[#f26a21]/20 bg-[#f26a21]/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[#f26a21]">
              OUR PRODUCTS
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Comprehensive Packaging Solutions
            </h2>
            <p className="text-base leading-7 text-slate-700 sm:text-lg">
              Discover our wide range of industrial packaging products designed for
              modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {homeProducts.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="line-clamp-1 text-sm text-slate-600">{product.description}</p>
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-semibold text-[#f26a21] transition-colors duration-200 hover:text-[#2f8f83]"
                  >
                    Learn More <span aria-hidden="true" className="ml-1">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="bg-white py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-flex rounded-full border border-[#f26a21]/20 bg-[#f26a21]/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[#f26a21]">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Trusted Across Multiple Sectors
            </h2>
            <p className="text-base leading-7 text-slate-700 sm:text-lg">
              Our packaging solutions serve diverse industries with quality, safety,
              and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry) => {
              const Icon = industry.icon;

              return (
                <article
                  key={industry.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
                >
                  <div className="mb-5 inline-flex rounded-xl border border-[#2f8f83]/20 bg-[#2f8f83]/10 p-3 text-[#2f8f83]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{industry.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-flex rounded-full border border-[#f26a21]/20 bg-[#f26a21]/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[#f26a21]">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Your Trusted Packaging Partner
            </h2>
            <p className="text-base leading-7 text-slate-700 sm:text-lg">
              Discover what sets us apart in the packaging industry through innovation,
              quality, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {whyChooseUsFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)]"
                >
                  <div
                    className={`mb-6 inline-flex rounded-xl border p-3 ${feature.iconBoxClassName}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="manufacturing-process"
        className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-gradient-to-br from-[#1450c8] via-[#1c57d1] to-[#0f3ea8] py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1800px] space-y-16 px-6 md:px-10 xl:px-14">
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-orange-300">
              OUR PROCESS
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Manufacturing Excellence
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/85 md:text-xl">
              A streamlined process ensuring quality at every step
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {manufacturingProcessSteps.map((processStep) => {
              const Icon = processStep.icon;

              return (
                <article key={processStep.step} className="relative w-full max-w-none pt-14">
                  <div className="absolute -top-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-2xl">
                    <Icon className="h-9 w-9 text-[#1450c8]" aria-hidden="true" />
                  </div>

                  <div className="relative w-full min-h-[300px] rounded-3xl border border-white/15 bg-white/10 px-6 pt-14 pb-8 backdrop-blur-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">
                      Step {processStep.step}
                    </p>
                    <h3 className="mx-auto mt-4 max-w-[180px] text-center text-xl font-bold leading-tight text-white xl:text-2xl">
                      {processStep.title}
                    </h3>
                    <p className="mt-4 text-center text-sm leading-7 text-white/85 xl:text-base">
                      {processStep.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
