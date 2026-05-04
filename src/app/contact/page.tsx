import ContactPageClient from "./contact-page-client";

function productFromSearchParams(product: string | string[] | undefined): string {
  if (typeof product === "string") return product.trim();
  if (Array.isArray(product) && product[0]) return String(product[0]).trim();
  return "";
}

type ContactPageProps = {
  searchParams: Promise<{ product?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const q = await searchParams;
  return <ContactPageClient productFromQuery={productFromSearchParams(q.product)} />;
}
