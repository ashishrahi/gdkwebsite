import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "pr-1001",
    slug: "industrial-packing-tape",
    name: "Industrial Packing Tape",
    description: "High-tensile tape built for heavy-duty carton sealing.",
    price: 129.99,
    category: "Adhesives",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pr-1002",
    slug: "stretch-film-roll",
    name: "Stretch Film Roll",
    description: "Durable wrap that stabilizes pallet loads in transit.",
    price: 89.5,
    category: "Wrapping",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pr-1003",
    slug: "eco-kraft-box-set",
    name: "Eco Kraft Box Set",
    description: "Reinforced recyclable shipping boxes for e-commerce.",
    price: 149.0,
    category: "Boxes",
    inStock: false,
    imageUrl:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=1000&q=80",
  },
];
