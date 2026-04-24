import { ProductCard } from "@/components/product/product-card";
import { mockProducts } from "@/lib/data/products";

export default function ProductsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Our Products</h1>
        <p className="text-muted-foreground">
          Explore our industrial-grade packaging products built for performance.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
