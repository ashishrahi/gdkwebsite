export const PRODUCT_CATEGORIES = [
  "PP Products",
  "PET Products",
  "Printed Products",
  "Thermoforming",
  "ESD Trays",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PP_PRODUCT_SLUGS = [
  "pp-box",
  "pp-container",
  "meal-box",
  "round-container",
  "pasta-tray",
  "esd-trays",
] as const;

export type ProductSlug = (typeof PP_PRODUCT_SLUGS)[number];

export type ProductGalleryItem = {
  label: string;
  image: string;
};

export type ProductDetailSection = {
  id: string;
  title: string;
  description: string;
  points?: string[];
};

export type ProductSeo = {
  title: string;
  description: string;
  keywords: string[];
};

export type ProductCta = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  whatsappLabel: string;
};

export type ProductData = {
  id: string;
  slug: ProductSlug;
  title: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  material: string;
  heroImage: string;
  gallery: ProductGalleryItem[];
  detailSections?: ProductDetailSection[];
  variants: string[];
  features: string[];
  applications: string[];
  applicationsDescription?: string;
  seo: ProductSeo;
  cta: ProductCta;
  relatedProducts: ProductSlug[];
};

const commonFeatures = [
  "Food Grade",
  "Leak Resistant",
  "Durable",
  "Reusable",
  "Custom Branding Available",
  "Bulk Supply Ready",
] as const;

export const productsData: ProductData[] = [
  {
    id: "esd-trays",
    slug: "esd-trays",
    title: "ESD Trays",
    shortDescription:
      "Precision-engineered ESD trays designed for static-safe electronics handling, reliable component protection, and premium production consistency.",
    description:
      "GDK ESD Trays are developed for modern electronics manufacturing where electrostatic control, dimensional stability, and repeatable quality directly impact yield, safety, and delivery commitments.",
    category: "ESD Trays",
    material: "APET / PCR rPET / HIPS",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      {
        label: "Precision cavity tray",
        image:
          "https://images.unsplash.com/photo-1563770557593-9dff3ac4f08c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "Stackable transport tray",
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "Custom profile tray",
        image:
          "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    detailSections: [
      {
        id: "who-are-we",
        title: "Who Are We",
        description:
          "GDK Packaging is a trusted thermoforming and extrusion manufacturing partner with decades of conversion expertise, high-capacity infrastructure, and strict process control for mission-critical packaging.",
      },
      {
        id: "tool-room-service",
        title: "Tool Room Service",
        description:
          "Our in-house tool room supports rapid design-to-mold execution, cavity optimization, and maintenance cycles to keep your ESD tray programs accurate, scalable, and delivery-ready.",
      },
      {
        id: "customised-esd-trays",
        title: "Customised ESD Trays",
        description:
          "Every tray is tailored to your component geometry, stacking logic, automation workflow, and handling requirements for secure transit and predictable line performance.",
      },
      {
        id: "technical-specifications",
        title: "Technical Specifications",
        description:
          "Built for dependable anti-static protection with material flexibility and production-grade consistency:",
        points: [
          "Surface resistivity between 10^6 and 10^9 Ohm/square as per ASTM D618",
          "Choice of APET / PCR rPET / HIPS",
          "Static-free protection + sustainability",
          "In-house extrusion lines and tool rooms",
          "Material gauge 0.3mm to 1.5mm",
          "Reliable ESD safety",
        ],
      },
    ],
    variants: [
      "Low-profile cavity trays",
      "Deep-draw trays",
      "Interlocking stack trays",
      "Automation-compatible trays",
    ],
    features: [
      "ESD Safe",
      "Precision Thermoformed",
      "Custom Cavity Design",
      "Stackable Geometry",
      "In-house Tool Room",
      "Sustainable Material Options",
    ],
    applications: [
      "Printed circuit boards",
      "Micro-processors",
      "Semi-conductors",
      "Computer hard disks",
      "Memory modules",
      "Mobile components",
      "Assembly kits",
    ],
    applicationsDescription:
      "Engineered for static-sensitive electronics, precision assemblies, and high-value component logistics.",
    seo: {
      title: "ESD Trays Manufacturer | Custom Anti-Static Trays | GDK Packaging",
      description:
        "Production-grade customised ESD Trays for PCB, semiconductor, memory, and electronics components with controlled surface resistivity and in-house tool room support.",
      keywords: [
        "esd trays manufacturer",
        "custom esd tray",
        "anti static electronics tray",
        "thermoformed esd packaging",
        "pcr rpet esd tray",
      ],
    },
    cta: {
      title: "Ready to launch your ESD tray program?",
      description:
        "Share your component drawings or sample, and our team will propose a production-ready tray solution with tooling and volume planning.",
      primaryLabel: "Get Quote",
      secondaryLabel: "Discuss Tooling",
      whatsappLabel: "WhatsApp Inquiry",
    },
    relatedProducts: ["pp-container", "meal-box", "round-container"],
  },
  {
    id: "pp-box",
    slug: "pp-box",
    title: "PP Box / Sweet Box Container",
    shortDescription:
      "Reliable sweet and snack packaging container with strong shelf appeal for retail and bulk dispatch.",
    description:
      "Our PP Box / Sweet Box Container is built for hygienic food packing with dependable stacking strength, premium presentation, and repeat-order consistency for high-volume operations.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    heroImage:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        label: "1250 ML",
        image:
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "1000 ML",
        image:
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "750 ML",
        image:
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "500 ML",
        image:
          "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "400 ML",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    variants: ["1250 ML", "1000 ML", "750 ML", "500 ML", "400 ML"],
    features: [...commonFeatures, "Microwave Safe", "Freezer Safe"],
    applications: [
      "Sweet Packaging",
      "Dry Fruit Packaging",
      "Snacks Packaging",
      "Takeaway Food",
    ],
    seo: {
      title: "PP Box / Sweet Box Container | GDK Packaging",
      description:
        "Explore PP Sweet Box Containers in 400 ML to 1250 ML capacities for sweets, snacks, and takeaway packaging.",
      keywords: [
        "pp sweet box container",
        "pp box manufacturer",
        "food packaging box",
        "sweet packaging container",
      ],
    },
    cta: {
      title: "Scale your packaging supply with confidence",
      description:
        "Get custom quantity, pricing, and dispatch planning for PP Box / Sweet Box Container.",
      primaryLabel: "Get Quote",
      secondaryLabel: "Bulk Order",
      whatsappLabel: "WhatsApp Inquiry",
    },
    relatedProducts: ["pp-container", "meal-box", "round-container"],
  },
  {
    id: "pp-container",
    slug: "pp-container",
    title: "PP Container",
    shortDescription:
      "Versatile multi-capacity PP containers designed for food service, logistics convenience, and repeat use.",
    description:
      "Our PP Container range supports a variety of meal and food-packaging workflows, including injection-molded formats, with strong sealing performance and operational durability.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    heroImage:
      "https://images.unsplash.com/photo-1584305574647-acf8069ad5d8?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        label: "1000ml",
        image:
          "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "500ml Injection Molding",
        image:
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "500ml",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "300ml",
        image:
          "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "750ml",
        image:
          "https://images.unsplash.com/photo-1518131678677-a465a70d08c6?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    variants: ["1000ml", "500ml Injection Molding", "500ml", "300ml", "750ml"],
    features: [...commonFeatures, "Microwave Safe", "Freezer Safe"],
    applications: [
      "Meal Delivery",
      "Takeaway Food",
      "Restaurant Use",
      "Industrial Food Packing",
    ],
    seo: {
      title: "PP Container | GDK Packaging",
      description:
        "Discover PP Containers in 300ml to 1000ml variants, including injection molding options for food and takeaway use.",
      keywords: [
        "pp container manufacturer",
        "food grade pp container",
        "takeaway pp container",
        "bulk pp containers",
      ],
    },
    cta: {
      title: "Need dependable PP containers in bulk?",
      description:
        "Share your capacity mix and monthly demand, and we will provide the right supply plan.",
      primaryLabel: "Get Quote",
      secondaryLabel: "Bulk Order",
      whatsappLabel: "WhatsApp Inquiry",
    },
    relatedProducts: ["meal-box", "round-container", "pp-box"],
  },
  {
    id: "meal-box",
    slug: "meal-box",
    title: "Meal Box",
    shortDescription:
      "Compartment-ready meal boxes optimized for portion control, delivery safety, and premium presentation.",
    description:
      "Designed for cloud kitchens, caterers, and QSR operations, our Meal Box variants support efficient packing, better food separation, and professional customer experience.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    heroImage:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        label: "8 CP",
        image:
          "https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "5 CP",
        image:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "3 CP",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "2 CP",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    variants: ["8 CP", "5 CP", "3 CP", "2 CP"],
    features: [...commonFeatures, "Microwave Safe", "Freezer Safe"],
    applications: ["Meal Delivery", "Restaurant Use", "Takeaway Food", "Snacks Packaging"],
    seo: {
      title: "Meal Box | GDK Packaging",
      description:
        "Premium compartment Meal Box options in 2 CP to 8 CP formats for takeaway and meal delivery brands.",
      keywords: [
        "meal box manufacturer",
        "compartment meal box",
        "pp meal packaging",
        "food delivery containers",
      ],
    },
    cta: {
      title: "Upgrade meal delivery packaging",
      description:
        "Get the right compartment configuration and high-volume supply plan for your operations.",
      primaryLabel: "Get Quote",
      secondaryLabel: "Bulk Order",
      whatsappLabel: "WhatsApp Inquiry",
    },
    relatedProducts: ["pp-container", "round-container", "pasta-tray"],
  },
  {
    id: "round-container",
    slug: "round-container",
    title: "Round Container",
    shortDescription:
      "High-utility round containers for curries, gravies, snacks, and storage with robust leak control.",
    description:
      "Our Round Container series combines food-safe PP material, secure closure compatibility, and multiple capacities for retail, kitchen, and distribution needs.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    heroImage:
      "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        label: "1200 ML",
        image:
          "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "1000 ML",
        image:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "750 ML",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "500 ML",
        image:
          "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "300 ML",
        image:
          "https://images.unsplash.com/photo-1598511796432-5f01c9308354?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    variants: ["1200 ML", "1000 ML", "750 ML", "500 ML", "300 ML"],
    features: [...commonFeatures, "Microwave Safe", "Freezer Safe"],
    applications: ["Takeaway Food", "Meal Delivery", "Restaurant Use", "Snacks Packaging"],
    seo: {
      title: "Round Container | GDK Packaging",
      description:
        "Food-grade PP Round Containers in 300 ML to 1200 ML capacities for takeaway, kitchens, and food delivery.",
      keywords: [
        "round pp container",
        "food packaging round container",
        "leak resistant round container",
        "bulk food containers",
      ],
    },
    cta: {
      title: "Source round containers at production scale",
      description:
        "Tell us your size split and delivery location to receive a customized quotation.",
      primaryLabel: "Get Quote",
      secondaryLabel: "Bulk Order",
      whatsappLabel: "WhatsApp Inquiry",
    },
    relatedProducts: ["pp-container", "meal-box", "pp-box"],
  },
  {
    id: "pasta-tray",
    slug: "pasta-tray",
    title: "Pasta Tray",
    shortDescription:
      "Specialized pasta trays for neat servings, transit safety, and premium food-brand presentation.",
    description:
      "Our Pasta Tray range is tailored for portion-friendly food service workflows, helping restaurants and takeaway brands deliver pasta and snack items with cleaner presentation.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    heroImage:
      "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8f70?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        label: "75 GM",
        image:
          "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8f70?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "60 GM",
        image:
          "https://images.unsplash.com/photo-1608756687911-aa1599ab0386?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "45 GM",
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
      },
      {
        label: "30 GM",
        image:
          "https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    variants: ["75 GM", "60 GM", "45 GM", "30 GM"],
    features: [...commonFeatures, "Microwave Safe"],
    applications: ["Takeaway Food", "Meal Delivery", "Restaurant Use", "Snacks Packaging"],
    seo: {
      title: "Pasta Tray | GDK Packaging",
      description:
        "Explore food-grade Pasta Trays in 30 GM to 75 GM variants for delivery, takeaway, and restaurant service.",
      keywords: [
        "pasta tray manufacturer",
        "food grade pasta tray",
        "takeaway pasta container",
        "pp tray bulk order",
      ],
    },
    cta: {
      title: "Get high-volume pasta tray supply",
      description:
        "Connect with our team for variant planning, bulk rates, and schedule-based dispatch.",
      primaryLabel: "Get Quote",
      secondaryLabel: "Bulk Order",
      whatsappLabel: "WhatsApp Inquiry",
    },
    relatedProducts: ["meal-box", "pp-container", "round-container"],
  },
];

export function getAllProducts(): ProductData[] {
  return productsData;
}

export function getProductBySlug(slug: string): ProductData | undefined {
  return productsData.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): ProductData[] {
  return productsData.filter((product) => product.category === category);
}

export function getRelatedProducts(slug: ProductSlug, limit = 3): ProductData[] {
  const product = getProductBySlug(slug);
  if (!product) {
    return [];
  }

  const explicitlyRelated = product.relatedProducts
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter((item): item is ProductData => Boolean(item));

  if (explicitlyRelated.length >= limit) {
    return explicitlyRelated.slice(0, limit);
  }

  const fallback = productsData.filter(
    (candidate) =>
      candidate.slug !== slug &&
      candidate.category === product.category &&
      !explicitlyRelated.some((related) => related.slug === candidate.slug),
  );

  return [...explicitlyRelated, ...fallback].slice(0, limit);
}
