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
  "w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-neutral-900 shadow-sm",
  "placeholder:text-neutral-400 md:px-5 md:text-sm",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  "focus-visible:border-[var(--secondary)] focus-visible:bg-white focus-visible:ring-4",
  "focus-visible:ring-[color:color-mix(in_srgb,var(--secondary)_20%,white)]",
  "aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/20",
  "aria-invalid:focus-visible:border-red-500 aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:ring-red-500/25",
);

const contactInputClassName = cn(
  contactFieldBase,
  "min-h-[44px] py-3 md:h-14 md:min-h-0 md:py-0",
);

const contactTextareaClassName = cn(
  contactFieldBase,
  "min-h-[140px] resize-none py-3 sm:min-h-[160px] sm:py-4",
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
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl bg-slate-50 px-6 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pt-36">
      <section className="space-y-12" aria-label="Contact GDK Packaging">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-accent)_25%,transparent)] bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] px-4 py-1 text-xs font-semibold tracking-[0.16em] text-neutral-500">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Contact Us Today
          </h1>
          <p className="text-base leading-7 text-neutral-600 sm:text-lg">
            Let&apos;s discuss how we can help with your packaging needs.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Let&apos;s Start a Conversation
              </h2>
              <p className="max-w-xl text-base leading-7 text-neutral-600">
                Our team is ready to help you find the perfect packaging solution for your business.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out hover:border-slate-300 hover:shadow-md">
                <span className="inline-flex shrink-0 rounded-xl bg-secondary/95 p-3 text-white transition-colors duration-200 ease-out">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-semibold text-neutral-500">Email</p>
                  <a
                    href="mailto:sales@gdkpackaging.com"
                    className="block text-sm leading-6 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 sm:text-base"
                  >
                    sales@gdkpackaging.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out hover:border-slate-300 hover:shadow-md">
                <span className="inline-flex shrink-0 rounded-xl bg-secondary/95 p-3 text-white transition-colors duration-200 ease-out">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-semibold text-neutral-500">Phone</p>
                  <div className="space-y-1">
                    <a
                      href="tel:+919889471453"
                      className="block text-sm leading-6 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 sm:text-base"
                    >
                      +91 98894 71453 (CRM)
                    </a>
                    <a
                      href="tel:+919889471454"
                      className="block text-sm leading-6 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 sm:text-base"
                    >
                      +91 98894 71454 (Sales Executive)
                    </a>
                    <a
                      href="tel:+919889471452"
                      className="block text-sm leading-6 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 sm:text-base"
                    >
                      +91 98894 71452 (Senior Sales Executive)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out hover:border-slate-300 hover:shadow-md">
                <span className="inline-flex shrink-0 rounded-xl bg-secondary/95 p-3 text-white transition-colors duration-200 ease-out">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-semibold text-neutral-500">Address</p>
                  <p className="text-sm leading-6 text-neutral-900 sm:text-base">
                    GDK Packaging Pvt. Ltd.
                    <br />
                    42 Industrial Estate Road
                    <br />
                    Pune, Maharashtra 411001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out hover:border-slate-300 hover:shadow-md">
                <span className="inline-flex shrink-0 rounded-xl bg-secondary/95 p-3 text-white transition-colors duration-200 ease-out">
                  <FaWhatsapp className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-semibold text-neutral-500">WhatsApp</p>
                  <a
                    href="https://wa.me/919889471453"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm leading-6 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 sm:text-base"
                  >
                    +91 98894 71453 (CRM)
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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

          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-8 shadow-md backdrop-blur-sm sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Request a Quote</h2>
            <form
              className="contact-form mt-6 space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-company" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.company.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-product" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.product.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-quantity" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.quantity.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-neutral-600">
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
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-xl px-6 text-sm font-semibold shadow-[0_8px_22px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition-[transform,box-shadow,opacity] duration-200 ease-out hover:shadow-[0_10px_26px_color-mix(in_srgb,var(--primary)_36%,transparent)] active:translate-y-px disabled:shadow-none md:h-12"
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
