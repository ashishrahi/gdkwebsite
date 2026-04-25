import { DATA_CATEGORY_LABELS } from "@/lib/catalog/registry";
import type { DataCategoryLabel } from "@/lib/catalog/types";

export const PRODUCT_CATEGORIES = DATA_CATEGORY_LABELS;

export type ProductCategory = DataCategoryLabel;

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

export type ProductSpecification = {
  label: string;
  value: string;
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
  slug: string;
  title: string;
  shortDescription: string;
  heroText: string;
  description: string;
  category: ProductCategory;
  material: string;
  badges: string[];
  specifications: ProductSpecification[];
  heroImage: string;
  gallery: ProductGalleryItem[];
  detailSections?: ProductDetailSection[];
  variants: string[];
  features: string[];
  applications: string[];
  applicationsDescription?: string;
  seo: ProductSeo;
  cta: ProductCta;
  relatedProducts: string[];
};

type ProductSeed = Omit<ProductData, "id">;

const commonFoodFeatures = [
  "Food Grade",
  "Leak Resistant",
  "Durable",
  "Reusable",
  "Custom Branding Available",
  "Bulk Supply Ready",
] as const;

const commonTrayFeatures = [
  "ESD Safe",
  "Precision Thermoformed",
  "Custom Cavity Design",
  "Stackable Geometry",
  "In-house Tool Room",
  "Sustainable Material Options",
] as const;

const defaultCta: ProductCta = {
  title: "Need production-ready packaging support?",
  description:
    "Share your requirement, expected monthly volume, and target timeline for a structured quotation.",
  primaryLabel: "Get Quote",
  secondaryLabel: "Discuss Project",
  whatsappLabel: "WhatsApp Inquiry",
};

function buildProduct(seed: ProductSeed): ProductData {
  return {
    ...seed,
    id: seed.slug,
  };
}

export const productsData: ProductData[] = [
  buildProduct({
    slug: "pp-box",
    title: "PP Box",
    shortDescription: "Premium rigid PP box for sweets, dry snacks, and festive takeaway packs.",
    heroText: "Built for premium presentation with reliable stacking and safe food contact.",
    description:
      "The PP Box is designed for sweet shops, bakery chains, and snack brands requiring clean aesthetics, dependable lid fitment, and high-throughput dispatch readiness.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    badges: ["Best Seller", "Food Safe", "MOQ Friendly"],
    specifications: [
      { label: "Capacity Range", value: "400 ml to 1250 ml" },
      { label: "Wall Thickness", value: "0.45 mm to 0.75 mm" },
      { label: "Lid Type", value: "Snap-fit transparent lid" },
      { label: "Print Option", value: "Sticker + IML compatible" },
    ],
    heroImage: "/images/sweetbox/1250.jpg",
    gallery: [
      { label: "1250 ml", image: "/images/sweetbox/1250.jpg" },
      { label: "1000 ml", image: "/images/sweetbox/1000.jpg" },
      { label: "750 ml", image: "/images/sweetbox/750.jpg" },
    ],
    variants: ["400 ml", "500 ml", "750 ml", "1000 ml", "1250 ml"],
    features: [...commonFoodFeatures, "Microwave Safe", "Freezer Safe"],
    applications: ["Sweet Packaging", "Dry Fruit Packaging", "Bakery Counter Packing", "Gift Combo Packing"],
    applicationsDescription: "Ideal for retail counters and bulk festive packaging programs.",
    seo: {
      title: "PP Box for Sweets and Snacks | GDK Packaging",
      description: "Professional PP Box range for sweets and snack packaging with multiple capacities and branding support.",
      keywords: ["pp box", "sweet box container", "food grade pp box", "bulk sweet packaging"],
    },
    cta: defaultCta,
    relatedProducts: ["pp-container", "meal-box", "premium-sweet-box"],
  }),
  buildProduct({
    slug: "pp-container",
    title: "PP Container",
    shortDescription: "Multi-purpose PP container range for food service and cloud-kitchen operations.",
    heroText: "Durable everyday packaging with consistent seal performance and smooth stackability.",
    description:
      "GDK PP Containers are made for takeaway and commissary workflows where leak safety, batch consistency, and volume flexibility are essential.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    badges: ["Hot Fill Ready", "Reusable", "Bulk Dispatch"],
    specifications: [
      { label: "Capacity Range", value: "300 ml to 1000 ml" },
      { label: "Temperature Resistance", value: "-10C to 110C" },
      { label: "Closure", value: "Pressure-lock lid" },
      { label: "Production", value: "Thermoformed + Injection lines" },
    ],
    heroImage: "/images/ppcontainer/1000ml.jpg",
    gallery: [
      { label: "300 ml", image: "/images/ppcontainer/300ml.jpg" },
      { label: "500 ml", image: "/images/ppcontainer/500ml.jpg" },
      { label: "1000 ml", image: "/images/ppcontainer/1000ml.jpg" },
    ],
    variants: ["300 ml", "500 ml", "750 ml", "1000 ml"],
    features: [...commonFoodFeatures, "Microwave Safe", "Freezer Safe"],
    applications: ["Meal Delivery", "QSR Takeaway", "Retail Food Packs", "Central Kitchen Dispatch"],
    seo: {
      title: "PP Container Manufacturer | GDK Packaging",
      description: "Versatile PP containers for takeaway and food service in multiple capacities and lid configurations.",
      keywords: ["pp container", "takeaway pp container", "food container manufacturer", "bulk pp containers"],
    },
    cta: defaultCta,
    relatedProducts: ["meal-box", "round-container", "pp-box"],
  }),
  buildProduct({
    slug: "meal-box",
    title: "Meal Box",
    shortDescription: "Compartment meal box series for organized plating and safe delivery.",
    heroText: "Engineered for cloud kitchens that need portion control and delivery confidence.",
    description:
      "The Meal Box lineup supports one-way food logistics with multi-compartment layouts that preserve quality and presentation during transit.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    badges: ["Compartment Series", "Delivery Ready", "Food Grade"],
    specifications: [
      { label: "Compartment Options", value: "2 CP, 3 CP, 5 CP, 8 CP" },
      { label: "Seal Integrity", value: "High snap-lock retention" },
      { label: "Microwave Use", value: "Yes" },
      { label: "Color Options", value: "Natural, Black, Custom tone" },
    ],
    heroImage: "/images/mealbox/8cp.jpg",
    gallery: [
      { label: "2 CP", image: "/images/mealbox/2.jpeg" },
      { label: "5 CP", image: "/images/mealbox/5.jpg" },
      { label: "8 CP", image: "/images/mealbox/8cp.jpg" },
    ],
    variants: ["2 CP", "3 CP", "5 CP", "8 CP"],
    features: [...commonFoodFeatures, "Microwave Safe", "Freezer Safe"],
    applications: ["Meal Subscriptions", "Corporate Catering", "QSR Combos", "Travel Meal Packs"],
    seo: {
      title: "Meal Box with Compartments | GDK Packaging",
      description: "Compartment meal box options for cloud kitchen and catering workflows with dependable closure.",
      keywords: ["meal box", "compartment food box", "pp meal packaging", "takeaway meal box"],
    },
    cta: defaultCta,
    relatedProducts: ["pp-container", "pasta-tray", "salad-bowl"],
  }),
  buildProduct({
    slug: "round-container",
    title: "Round Container",
    shortDescription: "Round PP container for gravies, curries, and bulk prep portions.",
    heroText: "Balanced shape and leak control for dependable hot and cold food movement.",
    description:
      "This round series is tailored for versatile kitchens requiring stackable and easy-to-handle containers for daily production and dispatch.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    badges: ["Leak Control", "Stack Friendly", "Microwave Safe"],
    specifications: [
      { label: "Capacity Range", value: "300 ml to 1200 ml" },
      { label: "Diameter Range", value: "96 mm to 142 mm" },
      { label: "Use Case", value: "Hot and cold items" },
      { label: "MOQ", value: "Starts from 10,000 pcs" },
    ],
    heroImage: "/images/roundcontainer/1200ml.jpg",
    gallery: [
      { label: "300 ml", image: "/images/roundcontainer/300ml.jpg" },
      { label: "750 ml", image: "/images/roundcontainer/750ml.jpg" },
      { label: "1200 ml", image: "/images/roundcontainer/1200ml.jpg" },
    ],
    variants: ["300 ml", "500 ml", "750 ml", "1000 ml", "1200 ml"],
    features: [...commonFoodFeatures, "Microwave Safe", "Freezer Safe"],
    applications: ["Curry Delivery", "Ready-to-Cook Packs", "Restaurant Takeaway", "Sauce Packaging"],
    seo: {
      title: "Round PP Container | GDK Packaging",
      description: "Round PP containers in multiple capacities with leak-resistant closure options for food service.",
      keywords: ["round container", "pp round container", "food takeaway container", "bulk container supplier"],
    },
    cta: defaultCta,
    relatedProducts: ["sauce-container", "pp-container", "dessert-cup"],
  }),
  buildProduct({
    slug: "pasta-tray",
    title: "Pasta Tray",
    shortDescription: "Shallow food tray tailored for pasta, noodles, and snack portions.",
    heroText: "Clean presentation tray for quick-service, takeaway, and event food counters.",
    description:
      "The Pasta Tray format improves plating consistency and handling convenience for food businesses serving semi-dry meals and fusion snack formats.",
    category: "PP Products",
    material: "Polypropylene (PP)",
    badges: ["Premium Finish", "Quick Serve", "Bulk Supply Ready"],
    specifications: [
      { label: "Portion Sizes", value: "30 g, 45 g, 60 g, 75 g equivalent" },
      { label: "Form", value: "Rectangular shallow tray" },
      { label: "Surface", value: "Gloss and matte options" },
      { label: "Branding", value: "Custom sleeve support" },
    ],
    heroImage: "/images/pastatray/75gm.jpeg",
    gallery: [
      { label: "30 g", image: "/images/pastatray/30gm.jpeg" },
      { label: "60 g", image: "/images/pastatray/60gm.jpeg" },
      { label: "75 g", image: "/images/pastatray/75gm.jpeg" },
    ],
    variants: ["30 g", "45 g", "60 g", "75 g"],
    features: [...commonFoodFeatures, "Microwave Safe"],
    applications: ["Pasta Service", "Noodle Takeaway", "Snack Portioning", "Cafeteria Lines"],
    seo: {
      title: "Pasta Tray for Takeaway | GDK Packaging",
      description: "Professional pasta tray options for portion service with premium shelf and delivery appearance.",
      keywords: ["pasta tray", "food tray", "takeaway tray", "pp pasta tray"],
    },
    cta: defaultCta,
    relatedProducts: ["meal-box", "pp-box", "cookies-tray"],
  }),
  buildProduct({
    slug: "pet-hinged-box",
    title: "PET Hinged Box",
    shortDescription: "Transparent clamshell PET box for bakery and fresh food display.",
    heroText: "Crystal-clear visibility with secure hinge lock for retail-ready packaging.",
    description:
      "PET Hinged Box solutions are ideal for grab-and-go displays where product visibility, tamper confidence, and transport safety are key.",
    category: "PET Products",
    material: "Food-grade PET",
    badges: ["High Clarity", "Retail Ready", "Recyclable"],
    specifications: [
      { label: "Material", value: "Virgin PET / rPET blend" },
      { label: "Closure", value: "Integrated hinge lock" },
      { label: "Shelf Visibility", value: "High transparency" },
      { label: "Use Temp", value: "Cold fill applications" },
    ],
    heroImage: "/images/pet/hinged1000ml.jpg",
    gallery: [
      { label: "1000 ml", image: "/images/pet/hinged1000ml.jpg"},
      { label: "750 ml", image: "/images/pet/hinged750ml.jpg"},
      { label: "600 ml", image: "/images/pet/hinged600ml.jpg"},
      { label: "500 ml", image: "/images/pet/hinged500ml.jpg" },
      { label: "375 ml", image: "/images/pet/hinged375ml.jpg" },
      { label: "250 ml", image: "/images/pet/hinged250ml.jpg" },
    ],
    variants: ["Single cavity", "Twin cavity", "Deep base"],
    features: ["Food Grade", "High Clarity", "Tamper Evident Design", "Stackable", "Recyclable", "Bulk Supply Ready"],
    applications: ["Bakery Display", "Fruit Packaging", "Ready-to-Eat Snacks", "Retail Counter Sales"],
    seo: {
      title: "PET Hinged Box Manufacturer | GDK Packaging",
      description: "Clear PET hinged boxes for bakery, fruit, and snack packaging with secure lock design.",
      keywords: ["pet hinged box", "pet clamshell", "transparent food box", "bakery packaging box"],
    },
    cta: defaultCta,
    relatedProducts: ["cookies-tray", "dessert-cup", "salad-bowl"],
  }),
  buildProduct({
    slug: "sauce-container",
    title: "Sauce Container",
    shortDescription: "Compact PET sauce containers for dips, chutneys, and side servings.",
    heroText: "Small-format precision container designed for clean servings and zero-spill delivery.",
    description:
      "These sauce containers provide controlled portioning and leak-managed transport for QSRs, delivery kitchens, and catering packs.",
    category: "PET Products",
    material: "PET",
    badges: ["Portion Control", "Leak Managed", "Food Service Essential"],
    specifications: [
      { label: "Capacity", value: "35 ml" },
      { label: "Lid", value: "Snap-fit flat lid" },
      { label: "Wall", value: "Lightweight clear PET" },
      { label: "Pack Format", value: "Sleeved bulk packs" },
    ],
    heroImage: "/images/pet/souce35ml.jpg",
    gallery: [
      { label: "35 ml", image: "/images/pet/souce35ml.jpg" },
      { label: "35 ml", image: "/images/pet/source2.jpg" },
      { label: "35 ml", image: "/images/pet/souce3.jpg" },
    ],
    variants: ["35 ml"],
    features: ["Food Grade", "Leak Resistant", "Transparent", "Stackable", "Bulk Supply Ready"],
    applications: ["Dip Servings", "Condiment Packaging", "Meal Add-ons", "Catering Trays"],
    seo: {
      title: "PET Sauce Container | GDK Packaging",
      description: "PET sauce container range for food delivery and condiment portioning in compact sizes.",
      keywords: ["sauce container", "pet dip container", "food service containers", "condiment cups"],
    },
    cta: defaultCta,
    relatedProducts: ["round-container", "pet-hinged-box", "dessert-cup"],
  }),
  buildProduct({
    slug: "cookies-tray",
    title: "Cookies Tray",
    shortDescription: "PET cookies tray with cavity precision for safe transport and attractive display.",
    heroText: "Protective tray geometry that keeps cookies intact from production to shelf.",
    description:
      "Cookies Tray designs prevent breakage and maintain shape retention for premium bakery products in modern retail and gifting channels.",
    category: "PET Products",
    material: "PET",
    badges: ["Breakage Protection", "Display Quality", "Retail Compatible"],
    specifications: [
      { label: "Cavity Types", value: "Round, square, custom profile" },
      { label: "Gauge", value: "0.25 mm to 0.55 mm" },
      { label: "Food Contact", value: "Compliant material grade" },
      { label: "Packaging", value: "Nested stack format" },
    ],
    heroImage: "/images/pet/cookies300gm.jpeg",
    gallery: [
      { label: "300 Gm", image: "/images/pet/cookeies2.jpeg" },
      { label: "300 Gm", image: "/images/pet/cookies3.jpeg" },
      { label: "300 Gm", image: "/images/pet/cookies300gm.jpeg" },
      { label: "200 Gm", image: "/images/pet/cookies4.jpeg" },

    ],
    variants: ["6 cavity", "9 cavity", "12 cavity"],
    features: ["Food Grade", "High Clarity", "Rigid Support", "Custom Cavity", "Bulk Supply Ready"],
    applications: ["Cookies Packaging", "Bakery Display", "Gift Packs", "Premium Assorted Trays"],
    seo: {
      title: "PET Cookies Tray Supplier | GDK Packaging",
      description: "Professional PET cookies trays with cavity options for bakery retail and gifting programs.",
      keywords: ["cookies tray", "pet bakery tray", "cookie packaging tray", "custom cavity tray"],
    },
    cta: defaultCta,
    relatedProducts: ["pet-hinged-box", "dessert-cup", "premium-sweet-box"],
  }),
  // buildProduct({
  //   slug: "salad-bowl",
  //   title: "Salad Bowl",
  //   shortDescription: "Clear PET salad bowl for fresh meals, fruit mixes, and cold deli servings.",
  //   heroText: "Modern bowl format that improves visual freshness and shelf impact.",
  //   description:
  //     "The Salad Bowl range offers transparent, lightweight, and robust packaging for cold meals and retail-ready healthy food lines.",
  //   category: "PET Products",
  //   material: "PET",
  //   badges: ["Fresh Food Focus", "Crystal Clear", "Recyclable"],
  //   specifications: [
  //     { label: "Capacity", value: "250 ml to 1000 ml" },
  //     { label: "Rim", value: "Lid compatible smooth seal rim" },
  //     { label: "Application", value: "Cold and ambient food" },
  //     { label: "Branding", value: "Sleeve and sticker ready" },
  //   ],
  //   heroImage: "/images/pet/pvt.png",
  //   gallery: [
  //     { label: "250 ml", image: "/images/pet/pvt.png" },
  //     { label: "500 ml", image: "/images/pet/source2.jpg" },
  //     { label: "1000 ml", image: "/images/pet/hinged600ml.jpg" },
  //   ],
  //   variants: ["250 ml", "500 ml", "750 ml", "1000 ml"],
  //   features: ["Food Grade", "High Clarity", "Leak Resistant Lid Fit", "Recyclable", "Bulk Supply Ready"],
  //   applications: ["Salad Retail", "Fruit Bowl Packs", "Cold Meal Prep", "Deli Counter Packaging"],
  //   seo: {
  //     title: "PET Salad Bowl Packaging | GDK Packaging",
  //     description: "Clear PET salad bowl options for healthy food brands and cold meal packaging.",
  //     keywords: ["salad bowl pet", "cold food bowl", "fresh meal packaging", "pet bowl manufacturer"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["dessert-cup", "pet-hinged-box", "sauce-container"],
  // }),
  // buildProduct({
  //   slug: "dessert-cup",
  //   title: "Dessert Cup",
  //   shortDescription: "Elegant PET dessert cup for mousse, puddings, layered sweets, and parfaits.",
  //   heroText: "Premium transparent cup that highlights layered desserts beautifully.",
  //   description:
  //     "Dessert Cup formats are crafted for visual merchandising and clean handling in bakery chains, celebration boxes, and online dessert brands.",
  //   category: "PET Products",
  //   material: "PET",
  //   badges: ["Premium Look", "Display Friendly", "Food Safe"],
  //   specifications: [
  //     { label: "Cup Sizes", value: "80 ml to 250 ml" },
  //     { label: "Design", value: "Round and tapered profiles" },
  //     { label: "Lid Compatibility", value: "Flat and dome options" },
  //     { label: "Print Support", value: "Cup sticker and wrap label" },
  //   ],
  //   heroImage: "/images/pet/source2.jpg",
  //   gallery: [
  //     { label: "80 ml", image: "/images/pet/source2.jpg" },
  //     { label: "150 ml", image: "/images/pet/pvt.png" },
  //     { label: "250 ml", image: "/images/pet/souce3.jpg" },
  //   ],
  //   variants: ["80 ml", "120 ml", "150 ml", "250 ml"],
  //   features: ["Food Grade", "High Clarity", "Lightweight", "Stackable", "Bulk Supply Ready"],
  //   applications: ["Dessert Retail", "Bakery Counters", "Event Catering", "Gift Hampers"],
  //   seo: {
  //     title: "PET Dessert Cup Supplier | GDK Packaging",
  //     description: "Professional PET dessert cups in multiple sizes for bakery and premium sweet presentations.",
  //     keywords: ["dessert cup", "pet dessert cup", "mousse cup packaging", "bakery cup"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["salad-bowl", "pet-hinged-box", "premium-sweet-box"],
  // }),
  buildProduct({
    slug: "premium-sweet-box",
    title: "Premium Sweet Box",
    shortDescription: "Decorative IML sweet box for festive and premium confectionery assortments.",
    heroText: "High shelf appeal packaging designed for gifting and premium sweet brands.",
    description:
      "Premium Sweet Box combines rigid structure and premium in-mold visual finish, ideal for festive launches, seasonal offers, and high-value mithai assortments.",
    category: "Thermoforming",
    material: "PP with IML finish",
    badges: ["IML Print", "Festive Edition", "Premium Segment"],
    specifications: [
      { label: "Decoration", value: "IML high-definition graphics" },
      { label: "Capacity", value: "250 g to 1 kg assortments" },
      { label: "Shape", value: "Square and rectangle options" },
      { label: "Closure", value: "Press-fit premium lid" },
    ],
    heroImage: "/images/sweetbox/iml.jpeg",
    gallery: [
      { label: "250 g", image: "/images/sweetbox/iml.jpeg" },
      { label: "500 g", image: "/images/sweetbox/iml.jpeg" },
      { label: "1 kg", image: "/images/sweetbox/iml.jpeg" },
    ],
    variants: ["250 g", "500 g", "1 kg"],
    features: [...commonFoodFeatures, "Premium IML Surface"],
    applications: ["Festive Sweet Packs", "Premium Gift Boxes", "Retail Mithai Counter", "Corporate Gifting"],
    seo: {
      title: "Premium IML Sweet Box | GDK Packaging",
      description: "Premium IML sweet box range for festive gifting and high-value confectionery packaging.",
      keywords: ["iml sweet box", "premium mithai box", "festive sweet packaging", "printed sweet container"],
    },
    cta: defaultCta,
    relatedProducts: ["dry-fruit-box", "mithai-tray", "pp-box"],
  }),
  // buildProduct({
  //   slug: "dry-fruit-box",
  //   title: "Dry Fruit Box",
  //   shortDescription: "IML dry fruit box with premium print quality and moisture-aware fit.",
  //   heroText: "Gift-ready dry fruit packaging with premium finish and strong retail presence.",
  //   description:
  //     "Designed for gifting and festive retail, this Dry Fruit Box supports neat assortments, compartment options, and brand-forward presentation.",
  //   category: "Thermoforming",
  //   material: "PP with IML film",
  //   badges: ["Gift Packaging", "IML Decor", "Seasonal Bestseller"],
  //   specifications: [
  //     { label: "Assortment Format", value: "2 to 6 compartment options" },
  //     { label: "Capacity", value: "200 g to 800 g" },
  //     { label: "Surface", value: "Gloss premium print" },
  //     { label: "Lid", value: "Rigid click-fit lid" },
  //   ],
  //   heroImage: "/images/sweetbox/750.jpg",
  //   gallery: [
  //     { label: "2 compartment", image: "/images/sweetbox/500ml.jpg" },
  //     { label: "4 compartment", image: "/images/sweetbox/750.jpg" },
  //     { label: "6 compartment", image: "/images/sweetbox/1000.jpg" },
  //   ],
  //   variants: ["2 compartment", "4 compartment", "6 compartment"],
  //   features: [...commonFoodFeatures, "Premium IML Surface"],
  //   applications: ["Festive Gifts", "Dry Fruit Retail", "Corporate Hampers", "Premium Combo Packs"],
  //   seo: {
  //     title: "IML Dry Fruit Box Manufacturer | GDK Packaging",
  //     description: "Premium dry fruit box solutions with IML decoration for festive and premium gifting programs.",
  //     keywords: ["dry fruit box", "iml dry fruit packaging", "gift box for dry fruits", "premium dry fruit container"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["premium-sweet-box", "mithai-tray", "mono-carton"],
  // }),
  // buildProduct({
  //   slug: "mithai-tray",
  //   title: "Mithai Tray",
  //   shortDescription: "Hygienic tray design for assorted mithai sets with elegant presentation.",
  //   heroText: "Structured tray layout that keeps sweets protected, presentable, and gifting-ready.",
  //   description:
  //     "Mithai Tray formats are optimized for sweet assortments where shape retention, neat compartmenting, and festive retail appearance matter.",
  //   category: "Thermoforming",
  //   material: "Food-grade PP",
  //   badges: ["Assortment Ready", "Festive Retail", "Premium Finish"],
  //   specifications: [
  //     { label: "Tray Layout", value: "Segmented cavity options" },
  //     { label: "Capacity", value: "250 g to 1 kg mix packs" },
  //     { label: "Pairing", value: "Sleeve and box compatible" },
  //     { label: "Color", value: "Gold, white, custom shades" },
  //   ],
  //   heroImage: "/images/sweetbox/1250.jpg",
  //   gallery: [
  //     { label: "8 cavity", image: "/images/sweetbox/500ml.jpg" },
  //     { label: "12 cavity", image: "/images/sweetbox/1000.jpg" },
  //     { label: "16 cavity", image: "/images/sweetbox/1250.jpg" },
  //   ],
  //   variants: ["8 cavity", "12 cavity", "16 cavity"],
  //   features: [...commonFoodFeatures, "Premium Retail Finish"],
  //   applications: ["Mithai Assortments", "Festival Launches", "Gift Combo Inserts", "Counter Display Packs"],
  //   seo: {
  //     title: "Mithai Tray for Assorted Sweets | GDK Packaging",
  //     description: "Professional mithai tray options for sweet assortments and premium festive packaging.",
  //     keywords: ["mithai tray", "sweet tray packaging", "assorted sweets tray", "festival sweet tray"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["premium-sweet-box", "dry-fruit-box", "cookies-tray"],
  // }),
  buildProduct({
    slug: "corrugated-box",
    title: "Corrugated Box",
    shortDescription: "Heavy-duty corrugated box for transit safety and industrial dispatch.",
    heroText: "Strong outer-case packaging built for stacking, shipping, and warehouse handling.",
    description:
      "Our corrugated boxes are developed for tertiary and e-commerce transport use with dependable compression strength and custom print options.",
    category: "Printed Products",
    material: "Kraft corrugated board",
    badges: ["Transit Grade", "Custom Print", "Export Ready"],
    specifications: [
      { label: "Ply Options", value: "3 ply, 5 ply, 7 ply" },
      { label: "Burst Strength", value: "As per shipment requirement" },
      { label: "Print", value: "1-3 color flexo print" },
      { label: "Use Case", value: "Transit and e-commerce" },
    ],
    heroImage: "/images/printedproduct/rui.jpg",
    gallery: [
      { label: "3 ply", image: "/images/printedproduct/rui.jpg" },
      { label: "5 ply", image: "/images/printedproduct/astharui.jpg" },
      { label: "7 ply", image: "/images/printedproduct/allrounder.jpg" },
    ],
    variants: ["3 ply", "5 ply", "7 ply"],
    features: ["Durable", "Stack Strength", "Custom Branding Available", "Bulk Supply Ready", "Sustainable Paperboard"],
    applications: ["E-commerce Dispatch", "Industrial Shipping", "Warehouse Storage", "Export Packing"],
    seo: {
      title: "Corrugated Box Manufacturer | GDK Packaging",
      description: "Corrugated transit boxes with custom sizing, print options, and shipment-ready performance.",
      keywords: ["corrugated box", "shipping box", "industrial carton", "custom corrugated packaging"],
    },
    cta: defaultCta,
    relatedProducts: ["shipping-box", "duplex-box", "retail-box"],
  }),
  buildProduct({
    slug: "duplex-box",
    title: "Duplex Box",
    shortDescription: "Printed duplex board box for consumer products and shelf-ready packaging.",
    heroText: "Clean print surface and premium structure for brand-driven retail packs.",
    description:
      "Duplex Box solutions combine print quality and structural reliability for FMCG, personal care, and food-adjacent product packaging.",
    category: "Printed Products",
    material: "Duplex board",
    badges: ["Retail Ready", "Offset Print", "Custom Die-cut"],
    specifications: [
      { label: "Board GSM", value: "250 to 450 gsm" },
      { label: "Print", value: "CMYK + spot color options" },
      { label: "Finish", value: "Matte, gloss, UV, foil" },
      { label: "Style", value: "Straight and reverse tuck" },
    ],
    heroImage: "/images/printedproduct/super.jpg",
    gallery: [
      { label: "Matte finish", image: "/images/printedproduct/super.jpg" },
      { label: "UV finish", image: "/images/printedproduct/burstchoco.jpg" },
      { label: "Foil accent", image: "/images/printedproduct/treatpink.jpg" },
    ],
    variants: ["Straight tuck", "Reverse tuck", "Lock bottom"],
    features: ["Durable", "Custom Branding Available", "Premium Print", "Die-cut Flexibility", "Bulk Supply Ready"],
    applications: ["FMCG Packaging", "Personal Care Boxes", "Dry Food Cartons", "Retail Display Packs"],
    seo: {
      title: "Duplex Printed Box Supplier | GDK Packaging",
      description: "Duplex printed boxes with premium finish options for retail and FMCG packaging applications.",
      keywords: ["duplex box", "printed duplex carton", "retail board box", "custom duplex packaging"],
    },
    cta: defaultCta,
    relatedProducts: ["mono-carton", "retail-box", "corrugated-box"],
  }),
  buildProduct({
    slug: "mono-carton",
    title: "Mono Carton",
    shortDescription: "Folding mono carton with premium print quality for consumer-facing products.",
    heroText: "A classic branded carton format for clean shelf communication and product protection.",
    description:
      "Mono Carton solutions are developed for product launches and regular retail SKUs that need consistent print quality and precise conversion.",
    category: "Printed Products",
    material: "FBB / SBS board",
    badges: ["Premium Shelf Look", "High Print Fidelity", "Fast Turnaround"],
    specifications: [
      { label: "Board Type", value: "FBB / SBS / Duplex" },
      { label: "Printing", value: "Offset multicolor" },
      { label: "Finishes", value: "AQ, UV, foil, emboss" },
      { label: "Pack Style", value: "Auto lock / tuck-end" },
    ],
    heroImage: "/images/printedproduct/amulmasti.jpg",
    gallery: [
      { label: "Pharma style", image: "/images/printedproduct/amulmasti.jpg" },
      { label: "Cosmetic style", image: "/images/printedproduct/meethadahi.jpg" },
      { label: "Food style", image: "/images/printedproduct/burst.jpg" },
    ],
    variants: ["Straight tuck", "Reverse tuck", "Auto lock"],
    features: ["Custom Branding Available", "Durable", "Premium Print", "Barcode Ready", "Bulk Supply Ready"],
    applications: ["OTC Products", "Cosmetic Packaging", "Nutraceutical Boxes", "Dry Food Retail"],
    seo: {
      title: "Mono Carton Printing | GDK Packaging",
      description: "High-quality mono cartons for consumer products with custom structures and finishes.",
      keywords: ["mono carton", "printed folding carton", "retail carton packaging", "custom mono cartons"],
    },
    cta: defaultCta,
    relatedProducts: ["duplex-box", "retail-box", "dry-fruit-box"],
  }),
  buildProduct({
    slug: "retail-box",
    title: "Retail Box",
    shortDescription: "Branded retail box designed for premium shelf visibility and unboxing appeal.",
    heroText: "Purpose-built retail packaging that communicates quality from first glance.",
    description:
      "Retail Box formats support modern branding with custom geometry, structural integrity, and print enhancement options for market differentiation.",
    category: "Printed Products",
    material: "Paperboard / microflute",
    badges: ["Shelf Impact", "Brand Focused", "Custom Shapes"],
    specifications: [
      { label: "Structure", value: "Die-cut custom formats" },
      { label: "Finish", value: "UV, matte, gloss, foil" },
      { label: "Insert Options", value: "Paper and thermoform inserts" },
      { label: "Ideal Quantity", value: "Mid to high volume runs" },
    ],
    heroImage: "/images/printedproduct/treatpink.jpg",
    gallery: [
      { label: "Window patch", image: "/images/printedproduct/treatpink.jpg" },
      { label: "Foil box", image: "/images/printedproduct/cremicadigest.jpg" },
      { label: "Premium rigid look", image: "/images/printedproduct/nutrichoice.jpg" },
    ],
    variants: ["Window box", "Sleeve box", "Top-bottom box"],
    features: ["Custom Branding Available", "Premium Print", "Durable", "Bulk Supply Ready", "Design Assistance"],
    applications: ["Retail Launches", "Gift Products", "Consumer Electronics Accessories", "D2C Packaging"],
    seo: {
      title: "Custom Retail Box Manufacturer | GDK Packaging",
      description: "Custom printed retail boxes for premium shelf display and brand-focused product presentation.",
      keywords: ["retail box", "custom retail packaging", "printed retail cartons", "premium product box"],
    },
    cta: defaultCta,
    relatedProducts: ["mono-carton", "duplex-box", "shipping-box"],
  }),
  buildProduct({
    slug: "shipping-box",
    title: "Shipping Box",
    shortDescription: "Reliable shipping box for secure logistics, e-commerce, and long-route transport.",
    heroText: "Transit-optimized box design for safe delivery and efficient warehouse handling.",
    description:
      "Shipping Box solutions are optimized for secondary and tertiary packaging where durability, label clarity, and stack integrity matter.",
    category: "Printed Products",
    material: "Corrugated kraft board",
    badges: ["E-commerce Ready", "Transit Tested", "Bulk Production"],
    specifications: [
      { label: "Ply", value: "3 ply / 5 ply / 7 ply" },
      { label: "Compression", value: "Configured per load profile" },
      { label: "Surface", value: "Label + flexo print support" },
      { label: "Closure", value: "Tape / glue / lock design" },
    ],
    heroImage: "/images/printedproduct/astharui.jpg",
    gallery: [
      { label: "E-commerce size", image: "/images/printedproduct/rui.jpg" },
      { label: "Export size", image: "/images/printedproduct/astharui.jpg" },
      { label: "Heavy duty", image: "/images/printedproduct/allrounder.jpg" },
    ],
    variants: ["Standard shipper", "Heavy duty shipper", "E-commerce shipper"],
    features: ["Durable", "Bulk Supply Ready", "Custom Branding Available", "Stack Strength", "Sustainable Paperboard"],
    applications: ["E-commerce Logistics", "B2B Dispatch", "Warehouse Transfer", "Export Packaging"],
    seo: {
      title: "Shipping Box Supplier | GDK Packaging",
      description: "Shipping boxes for e-commerce and industrial logistics with custom ply and print options.",
      keywords: ["shipping box", "ecommerce box", "corrugated shipping cartons", "bulk shipping packaging"],
    },
    cta: defaultCta,
    relatedProducts: ["corrugated-box", "retail-box", "duplex-box"],
  }),
  buildProduct({
    slug: "pcb-tray",
    title: "PCB Tray",
    shortDescription: "Anti-static PCB tray designed for circuit board handling and assembly flow.",
    heroText: "Dimensional stability and ESD protection for high-value PCB movement.",
    description:
      "PCB Tray variants are engineered for safe handling of bare and assembled boards with repeatable cavity precision and stackable workflow compatibility.",
    category: "ESD Trays",
    material: "APET / HIPS conductive blend",
    badges: ["ESD Certified", "Automation Friendly", "Custom Cavity"],
    specifications: [
      { label: "Surface Resistivity", value: "10^6 to 10^9 Ohm/sq" },
      { label: "Gauge", value: "0.4 mm to 1.2 mm" },
      { label: "Stacking", value: "Interlock and anti-slip design" },
      { label: "Tooling", value: "In-house tool room support" },
    ],
    heroImage: "/images/esdtray/esdtray.jpg",
    gallery: [
      { label: "Bare board tray", image: "/images/esdtray/esdtray.jpg" },
      { label: "Assembly tray", image: "/images/esdtray/esdtray.jpg" },
      { label: "Interlock tray", image: "/images/esdtray/esdtray.jpg" },
    ],
    variants: ["Standard PCB", "Deep PCB", "Interlock PCB"],
    features: [...commonTrayFeatures],
    applications: ["PCB Assembly", "SMT Line Feeding", "Quality Hold", "Inter-plant Transport"],
    applicationsDescription: "Used in high-control electronics environments where static damage risk must stay minimal.",
    seo: {
      title: "PCB ESD Tray Manufacturer | GDK Packaging",
      description: "Custom anti-static PCB trays for assembly, storage, and secure movement of sensitive boards.",
      keywords: ["pcb tray", "esd pcb tray", "anti static pcb packaging", "electronics tray"],
    },
    cta: defaultCta,
    relatedProducts: ["component-tray", "ic-tray", "stackable-esd-tray"],
  }),
  // buildProduct({
  //   slug: "component-tray",
  //   title: "Component Tray",
  //   shortDescription: "Static-safe component tray for delicate parts and precision assemblies.",
  //   heroText: "Engineered cavity layouts to protect small electronic components in transit and storage.",
  //   description:
  //     "Component Tray designs are produced with consistent cavity geometry and anti-static behavior to improve traceability and handling confidence.",
  //   category: "ESD Trays",
  //   material: "Conductive APET / rPET",
  //   badges: ["Static Safe", "Cavity Precision", "Reusable"],
  //   specifications: [
  //     { label: "Component Range", value: "SMD, connectors, modules" },
  //     { label: "Tray Depth", value: "Custom as per part profile" },
  //     { label: "Material", value: "Conductive APET / rPET" },
  //     { label: "Reuse Cycle", value: "Multi-trip capable" },
  //   ],
  //   heroImage: "/images/esdtray/esdtray.jpg",
  //   gallery: [
  //     { label: "Micro components", image: "/images/esdtray/esdtray.jpg" },
  //     { label: "Connector tray", image: "/images/esdtray/esdtray.jpg" },
  //     { label: "Deep cavity", image: "/images/esdtray/esdtray.jpg" },
  //   ],
  //   variants: ["Fine pitch", "Medium component", "Deep cavity"],
  //   features: [...commonTrayFeatures],
  //   applications: ["Electronic Components", "Assembly Kitting", "Warehouse Binning", "Line-side Feeding"],
  //   seo: {
  //     title: "ESD Component Tray Supplier | GDK Packaging",
  //     description: "Precision ESD component trays with custom cavity layouts for safe electronics part handling.",
  //     keywords: ["component tray", "esd component tray", "anti static tray", "electronics part tray"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["pcb-tray", "ic-tray", "stackable-esd-tray"],
  // }),
  // buildProduct({
  //   slug: "ic-tray",
  //   title: "IC Tray",
  //   shortDescription: "IC carrier tray designed for semiconductor-safe handling and batch control.",
  //   heroText: "High-accuracy anti-static tray for IC protection from production to dispatch.",
  //   description:
  //     "IC Tray configurations are tailored for integrated circuits and semiconductor parts where electrostatic safety and positional stability are mission-critical.",
  //   category: "ESD Trays",
  //   material: "Conductive HIPS / APET",
  //   badges: ["Semiconductor Safe", "Dimensional Accuracy", "Tooling Support"],
  //   specifications: [
  //     { label: "Target Components", value: "ICs, memory chips, controllers" },
  //     { label: "Resistivity", value: "10^6 to 10^9 Ohm/sq" },
  //     { label: "Tolerance", value: "Tight cavity consistency" },
  //     { label: "Compatibility", value: "Automation and manual lines" },
  //   ],
  //   heroImage: "/images/esdtray/esdtray.jpg",
  //   gallery: [
  //     { label: "Chip matrix", image: "/images/esdtray/esdtray.jpg" },
  //     { label: "Controller tray", image: "/images/esdtray/esdtray.jpg" },
  //     { label: "Semiconductor tray", image: "/images/esdtray/esdtray.jpg" },
  //   ],
  //   variants: ["Matrix cavity", "Strip cavity", "Hybrid cavity"],
  //   features: [...commonTrayFeatures],
  //   applications: ["Semiconductor Packaging", "IC Storage", "Line Feeding", "Sensitive Component Movement"],
  //   seo: {
  //     title: "IC ESD Tray Manufacturer | GDK Packaging",
  //     description: "Anti-static IC trays for semiconductor components with precise cavity and stack design.",
  //     keywords: ["ic tray", "semiconductor tray", "esd ic tray", "anti static chip tray"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["pcb-tray", "component-tray", "stackable-esd-tray"],
  // }),
  // buildProduct({
  //   slug: "stackable-esd-tray",
  //   title: "Stackable ESD Tray",
  //   shortDescription: "Modular stackable ESD tray for efficient storage and intra-plant logistics.",
  //   heroText: "Space-efficient anti-static tray system for repetitive production movement.",
  //   description:
  //     "Stackable ESD Tray programs are developed for plants handling recurring SKUs where vertical storage efficiency and tray alignment are crucial.",
  //   category: "ESD Trays",
  //   material: "Conductive rPET / HIPS",
  //   badges: ["Stacking System", "Static Protection", "Reusable Program"],
  //   specifications: [
  //     { label: "Stack Type", value: "Positive lock stack geometry" },
  //     { label: "Use Cycle", value: "Reusable multiple cycles" },
  //     { label: "Material Option", value: "Conductive rPET / HIPS" },
  //     { label: "Design Support", value: "Custom cavity + stack height" },
  //   ],
  //   heroImage: "/images/esdtray/esdtray.jpg",
  //   gallery: [
  //     { label: "Interlock stack", image: "/images/esdtray/esdtray.jpg" },
  //     { label: "Logistics stack", image: "/images/esdtray/esdtray.jpg" },
  //     { label: "Tray nest", image: "/images/esdtray/esdtray.jpg" },
  //   ],
  //   variants: ["Low stack", "Medium stack", "High stack"],
  //   features: [...commonTrayFeatures],
  //   applications: ["Warehouse Storage", "Line-side Buffer", "Intra-plant Logistics", "Component Dispatch"],
  //   seo: {
  //     title: "Stackable ESD Tray Solutions | GDK Packaging",
  //     description: "Stackable anti-static trays for electronics manufacturing with reusable, space-saving design.",
  //     keywords: ["stackable esd tray", "anti static stack tray", "electronics logistics tray", "reusable esd tray"],
  //   },
  //   cta: defaultCta,
  //   relatedProducts: ["pcb-tray", "component-tray", "ic-tray"],
  // }),
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

export function getProductsBySlugs(slugs: string[]): ProductData[] {
  const productMap = new Map(productsData.map((product) => [product.slug, product]));
  return slugs.map((slug) => productMap.get(slug)).filter((product): product is ProductData => Boolean(product));
}

export function getRelatedProducts(slug: string, limit = 3): ProductData[] {
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
