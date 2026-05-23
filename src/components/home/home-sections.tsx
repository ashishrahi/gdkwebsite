import { ClienteleSection } from "@/components/home/clientele-section";
import { ContactSection } from "@/components/home/contact-section";
import {
  FeatureCard,
  HomeSection,
  ProcessCard,
  SectionHeader,
  ServiceCard,
  homeContentSpacingClassName,
  homeGridClassName,
} from "@/components/home/home-card-system";
import {
  Award,
  BadgeCheck,
  Box,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Factory,
  Globe,
  Handshake,
  Layers,
  Package,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";

const homeProducts = [
  {
    name: "Plastic Rigid Sheets",
    description: "Durable rigid sheets built for high-performance industrial packaging.",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Food Packaging Containers",
    description: "Hygienic food-grade containers engineered for freshness and safety.",
    icon: Box,
    image:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=1600&q=80",
  },
 
  {
    name: "Dairy & Yogurt Containers",
    description: "Precision-molded dairy containers for clean filling and shelf appeal.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "MAP & Retort Packaging",
    description: "Advanced packs optimized for extended shelf life and heat stability.",
    icon: BadgeCheck,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Injection Moulded Containers",
    description: "Robust injection moulded containers for scalable industrial output.",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
];

const industries = [
  {
    title: "Dairy",
    description:
      "Reliable dairy packaging designed for hygiene, freshness retention, and high-volume processing lines.",
    icon: Box,
  },
  {
    title: "FMCG",
    description:
      "Scalable FMCG packaging formats built for speed, shelf impact, and consistent supply fulfillment.",
    icon: Briefcase,
  },
  {
    title: "Bakery",
    description:
      "Protective bakery packaging that maintains product integrity from production to point-of-sale display.",
    icon: BadgeCheck,
  },
  {
    title: "Food & Beverage",
    description:
      "Food-safe, performance-tested packaging systems suited for varied beverage and processed food applications.",
    icon: Globe,
  },
  {
    title: "Electronics",
    description:
      "Precision packaging solutions for electronics that reduce transit damage and improve component safety.",
    icon: Layers,
  },
  {
    title: "Ready-to-Eat Food",
    description:
      "Convenient, durable packaging for ready-to-eat products with dependable sealing and shelf-life support.",
    icon: Handshake,
  },
];

const whyChooseUsFeatures = [
  {
    title: "Advanced Manufacturing Technology",
    description:
      "State-of-the-art production infrastructure ensures precision, consistency, and high-volume delivery for complex packaging requirements.",
    icon: Factory,
  },
  {
    title: "Custom Packaging Design",
    description:
      "Our design specialists create tailored packaging formats aligned with your product, branding, and operational workflows.",
    icon: ClipboardList,
  },
  {
    title: "Sustainable Materials",
    description:
      "Eco-conscious material choices and responsible sourcing help reduce environmental impact without compromising performance.",
    icon: Sparkles,
  },
  {
    title: "Global Quality Standards",
    description:
      "Strict quality controls and industry-aligned processes deliver dependable packaging trusted by clients across global markets.",
    icon: Award,
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
    icon: Layers,
  },
  {
    step: "03",
    title: "Thermoforming",
    description: "Precision thermoforming for exact specifications.",
    icon: Factory,
  },
  {
    step: "04",
    title: "Injection Moulding",
    description: "High-precision injection moulding for complex shapes.",
    icon: Briefcase,
  },
  {
    step: "05",
    title: "Quality Testing",
    description: "Rigorous quality control at every stage.",
    icon: CheckCircle2,
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
     

      <HomeSection id="products">
        <SectionHeader
          eyebrow="Our Products"
          title="Comprehensive Packaging Solutions"
          description="Discover our wide range of industrial packaging products designed for modern businesses."
        />

        <div className={`${homeGridClassName} ${homeContentSpacingClassName}`}>
          {homeProducts.map((product) => (
            <ServiceCard
              key={product.name}
              title={product.name}
              description={product.description}
              image={product.image}
              icon={product.icon}
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection id="industries">
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Trusted Across Multiple Sectors"
          description="Our packaging solutions serve diverse industries with quality, safety, and scalability."
        />

        <div className={`${homeGridClassName} ${homeContentSpacingClassName}`}>
          {industries.map((industry) => (
            <FeatureCard
              key={industry.title}
              title={industry.title}
              description={industry.description}
              icon={industry.icon}
            />
          ))}
        </div>
      </HomeSection>

      <ClienteleSection />

      <HomeSection id="why-choose-us">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Your Trusted Packaging Partner"
          description="Discover what sets us apart in the packaging industry through innovation, quality, and reliability."
          spacing="relaxed"
        />

        <div className={`${homeGridClassName} ${homeContentSpacingClassName}`}>
          {whyChooseUsFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        id="manufacturing-process"
        tone="gradient"
        className="py-ds-section-y"
      >
        <SectionHeader
          eyebrow="Our Process"
          title="Manufacturing Excellence"
          description="A streamlined workflow built for consistent quality, dependable timelines, and scalable industrial output."
          tone="gradient"
        />

        <div className={`${homeGridClassName} ${homeContentSpacingClassName}`}>
          {manufacturingProcessSteps.map((processStep) => (
            <ProcessCard
              key={processStep.step}
              step={processStep.step}
              title={processStep.title}
              description={processStep.description}
              icon={processStep.icon}
            />
          ))}
        </div>
      </HomeSection>

      <ContactSection />
    </>
  );
}
