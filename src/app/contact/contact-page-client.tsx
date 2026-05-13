"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  cardIconClassNames,
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import { useSendLead } from "@/hooks/useSendLead";
import { getAllProducts } from "@/lib/products-data";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Phone must contain at least 10 digits",
    }),
  company: z.string().trim().min(1, "Company is required"),
  product: z.string().trim().min(1, "Product is required"),
  quantity: z.string().trim().min(1, "Quantity is required"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactFieldBase = cn(
  "w-full rounded-xl border border-input bg-white px-4 text-base text-ds-text-strong shadow-sm",
  "placeholder:text-ds-text-subtle md:px-5 md:text-sm",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  "focus-visible:border-ring focus-visible:bg-white focus-visible:ring-4",
  "focus-visible:ring-[color:color-mix(in_srgb,var(--ring)_22%,transparent)]",
  "aria-invalid:border-[var(--brand-red)] aria-invalid:ring-4 aria-invalid:ring-[color:color-mix(in_srgb,var(--brand-red)_18%,transparent)]",
  "aria-invalid:focus-visible:border-[var(--brand-red)] aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:ring-[color:color-mix(in_srgb,var(--brand-red)_22%,transparent)]",
);

const contactInputClassName = cn(
  contactFieldBase,
  "min-h-[48px] py-3 md:h-[52px] md:min-h-0 md:py-0",
);

const contactTextareaClassName = cn(
  contactFieldBase,
  "min-h-[140px] resize-none py-3 sm:min-h-[160px] sm:py-4",
);

const contactInfoCardClassName = cn(
  cardSurfaceVariants({ variant: "minimal", padding: "default" }),
  "flex items-start gap-5 bg-white shadow-ds-card-medium hover:shadow-ds-card-medium",
);

type ContactPageClientProps = {
  productFromQuery: string;
};

export default function ContactPageClient({ productFromQuery }: ContactPageClientProps) {
  const products = useMemo(() => getAllProducts(), []);
  const { sendLead } = useSendLead();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      product: "",
      quantity: "",
      message: "",
    },
  });

  useEffect(() => {
    const q = productFromQuery.trim();
    if (!q) return;
    const match =
      products.find((p) => p.slug === q) ??
      products.find((p) => p.title.toLowerCase() === q.toLowerCase());
    if (match) setValue("product", match.slug, { shouldDirty: false, shouldValidate: false });
  }, [productFromQuery, products, setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await sendLead({
        ...values,
        type: "CONTACT",
      });
      toast.success("Message sent successfully");
      reset();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <main className="bg-ds-surface-muted">
      <section className="ds-page-shell flex flex-col gap-12" aria-label="Contact GDK Packaging">
        <div className="ds-section-header">
          <span className="ds-eyebrow">
            GET IN TOUCH
          </span>
          <h1 className="text-h1 text-ds-text-strong">
            Contact Us Today
          </h1>
          <p className="text-body-lg text-ds-text-body">
            Let&apos;s discuss how we can help with your packaging needs.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="flex flex-col gap-9 lg:gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-h3 text-ds-text-strong">
                Let&apos;s Start a Conversation
              </h2>
              <p className="max-w-xl text-body text-ds-text-body">
                Our team is ready to help you find the perfect packaging solution for your business.
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
              <div className={contactInfoCardClassName}>
                <span className={cn(cardIconClassNames.inverse, "p-3")}>
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="text-base font-semibold text-ds-text-muted">Email</p>
                  <a
                    href="mailto:sales@gdkpackaging.com"
                    className="block text-sm leading-6 text-ds-text-strong transition-colors duration-200 ease-out hover:text-[var(--primary)] sm:text-base"
                  >
                    sales@gdkpackaging.com
                  </a>
                </div>
              </div>

              <div className={contactInfoCardClassName}>
                <span className={cn(cardIconClassNames.inverse, "p-3")}>
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="text-base font-semibold text-ds-text-muted">Phone</p>
                  <div className="flex flex-col gap-1.5">
                    <a
                      href="tel:+919889471453"
                      className="block text-sm leading-6 text-ds-text-strong transition-colors duration-200 ease-out hover:text-[var(--primary)] sm:text-base"
                    >
                      +91 98894 71453 (CRM)
                    </a>
                    <a
                      href="tel:+919889471454"
                      className="block text-sm leading-6 text-ds-text-strong transition-colors duration-200 ease-out hover:text-[var(--primary)] sm:text-base"
                    >
                      +91 98894 71454 (Sales Executive)
                    </a>
                    <a
                      href="tel:+919889471452"
                      className="block text-sm leading-6 text-ds-text-strong transition-colors duration-200 ease-out hover:text-[var(--primary)] sm:text-base"
                    >
                      +91 98894 71452 (Senior Sales Executive)
                    </a>
                  </div>
                </div>
              </div>

              <div className={contactInfoCardClassName}>
                <span className={cn(cardIconClassNames.inverse, "p-3")}>
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="text-base font-semibold text-ds-text-muted">Address</p>
                  <p className="text-sm leading-6 text-ds-text-strong sm:text-base">
                    GDK Packaging Pvt. Ltd.
                    <br />
                    26/59 Birhana Road
                    <br />
                    Kanpur - 208001
                  </p>
                </div>
              </div>

              <div className={contactInfoCardClassName}>
                <span className={cn(cardIconClassNames.inverse, "p-3")}>
                  <FaWhatsapp className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="text-base font-semibold text-ds-text-muted">WhatsApp</p>
                  <a
                    href="https://wa.me/919889471453"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm leading-6 text-ds-text-strong transition-colors duration-200 ease-out hover:text-[var(--primary)] sm:text-base"
                  >
                    +91 98894 71453 (CRM)
                  </a>
                </div>
              </div>
            </div>

            <div className={cn(cardSurfaceVariants({ variant: "elevated" }), "rounded-ds-card-lg")}>
              <iframe
                src="https://www.google.com/maps?q=26/59%20Birhana%20Road%20Kanpur%20208001&output=embed"
                className="h-64 w-full border-0 sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="GDK Packaging location map"
              />
            </div>
          </div>

          <div id="contact-form" className={cn(cardSurfaceVariants({ variant: "elevated", padding: "xl" }), "scroll-mt-28 rounded-ds-card-lg bg-white/95 backdrop-blur-sm")}>
            <h2 className="text-h3 text-ds-text-strong">Request a Quote</h2>
            <form
              className="contact-form mt-7 space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="space-y-2.5">
                <label htmlFor="contact-name" className="block text-sm font-semibold text-ds-text-muted">
                  Name
                </label>
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-ds-text-muted">
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-ds-text-muted">
                  Phone
                </label>
                <Input
                  id="contact-phone"
                  placeholder="+91 98894 71453"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-company" className="block text-sm font-semibold text-ds-text-muted">
                  Company
                </label>
                <Input
                  id="contact-company"
                  placeholder="Company name"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.company)}
                  {...register("company")}
                />
                {errors.company ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.company.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-product" className="block text-sm font-semibold text-ds-text-muted">
                  Product
                </label>
                <select
                  id="contact-product"
                  className={cn(contactInputClassName, "cursor-pointer appearance-auto")}
                  aria-invalid={Boolean(errors.product)}
                  {...register("product")}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                    </option>
                  ))}
                </select>
                {errors.product ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.product.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-quantity" className="block text-sm font-semibold text-ds-text-muted">
                  Quantity
                </label>
                <Input
                  id="contact-quantity"
                  placeholder="e.g. 1000 units"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.quantity)}
                  {...register("quantity")}
                />
                {errors.quantity ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.quantity.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-ds-text-muted">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Share your product requirements, quantity, and timeline."
                  className={contactTextareaClassName}
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-sm font-medium text-[var(--brand-red)]" role="alert">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-xl px-6 text-sm font-semibold shadow-(--ds-shadow-button-primary) transition-[transform,box-shadow,opacity] duration-200 ease-out active:translate-y-px disabled:shadow-none"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
