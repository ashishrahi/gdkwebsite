import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const stockStyles = product.inStock
    ? "bg-secondary/15 text-secondary"
    : "bg-muted text-muted-foreground";
  const productHref = `/products/${product.slug}`;

  return (
    <Link
      href={productHref}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`View details for ${product.name}`}
    >
      <Card className="overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
        <div className="relative h-44 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle>{product.name}</CardTitle>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stockStyles}`}>
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>
          <CardDescription>{product.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
        <CardFooter className="justify-between">
          <span className="text-base font-semibold text-foreground">${product.price.toFixed(2)}</span>
          <span className="text-sm font-semibold text-primary">View details</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
