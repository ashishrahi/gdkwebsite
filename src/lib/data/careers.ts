export type CareerOpening = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  tags: string[];
};

function buildCareerOpening(
  opening: Omit<CareerOpening, "id">,
): CareerOpening {
  return {
    ...opening,
    id: opening.slug,
  };
}

export const careerOpenings: CareerOpening[] = [
  buildCareerOpening({
    slug: "packaging-product-manager",
    title: "Packaging Product Manager",
    department: "Product & Strategy",
    location: "Kanpur, India",
    type: "Full-time",
    experience: "7+ years",
    description:
      "Lead product planning, market research, and packaging innovation for food-safe, ESD, and printed product lines.",
    tags: ["Leadership", "Packaging", "Go-to-market"],
  }),
  buildCareerOpening({
    slug: "manufacturing-quality-engineer",
    title: "Manufacturing Quality Engineer",
    department: "Quality Assurance",
    location: "Kanpur, India",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Define quality systems, lead audits, and improve process controls across thermoforming and assembly operations.",
    tags: ["Quality", "ISO", "Lean"],
  }),
  buildCareerOpening({
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Sales & Customer Success",
    location: "Kanpur, India",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Drive new customer relationships, proposal development, and packaged solution selling for industrial and retail clients.",
    tags: ["Sales", "B2B", "Packaging"] ,
  }),
  buildCareerOpening({
    slug: "supply-chain-coordinator",
    title: "Supply Chain Coordinator",
    department: "Operations",
    location: "Kanpur, India",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Coordinate materials planning, vendor management and shipment readiness for high-volume packaging production.",
    tags: ["Logistics", "Planning", "Operations"],
  }),
];

export function getCareerOpeningBySlug(slug: string) {
  return careerOpenings.find((opening) => opening.slug === slug);
}

export function getOpenCareerPositions() {
  return careerOpenings;
}
