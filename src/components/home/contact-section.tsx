"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  cardIconClassNames,
  cardSurfaceVariants,
} from "@/design-system/shadcn/card.variants";
import {
  SectionHeader,
  homeContentSpacingClassName,
} from "@/components/home/home-card-system";
import { useSendLead } from "@/hooks/useSendLead";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ContactRow =
  | {
      title: string;
      value: string;
      href: string;
      icon: LucideIcon | typeof FaWhatsapp;
    }
  | {
      title: "Phone";
      phoneLines: { href: string; text: string }[];
      icon: typeof Phone;
    };

const contactRows: ContactRow[] = [
  {
    title: "Email",
    value: "sales@gdkpackaging.com",
    href: "mailto:sales@gdkpackaging.com",
    icon: Mail,
  },
  {
    title: "Phone",
    phoneLines: [
      { href: "tel:+919889471453", text: "+91 98894 71453 (CRM)" },
      { href: "tel:+919889471454", text: "+91 98894 71454 (Sales Executive)" },
      { href: "tel:+919889471452", text: "+91 98894 71452 (Senior Sales Executive)" },
    ],
    icon: Phone,
  },
  {
    title: "Address",
    value: "26/59 Birhana Road, Kanpur - 208001",
    href: "https://maps.google.com/?q=26/59%20Birhana%20Road,%20Kanpur%20-%20208001",
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: "+91 98894 71453 (CRM)",
    href: "https://wa.me/919889471453",
    icon: FaWhatsapp,
  },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "Zip Code is required").max(10, "Invalid Zip Code"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Enter valid email"),
  product: z.string().min(1, "Please select a product"),
  comments: z.string().min(5, "Comments are required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fieldBaseClass =
  "w-full rounded-xl !bg-white text-ds-text-strong placeholder:text-ds-text-subtle border border-input px-5 leading-6 shadow-sm appearance-none focus:!bg-white focus:text-ds-text-strong focus:border-ring focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--ring)_22%,transparent)] outline-none";

const fieldLabelClass = "block text-sm font-semibold leading-5 text-ds-text-muted";
const contactCardTitleClass =
  "block m-0 max-w-full wrap-break-word text-base font-semibold leading-snug text-ds-text-muted";
const contactCardValueClass =
  "block m-0 max-w-full wrap-break-word text-sm leading-6 text-ds-text-strong sm:text-base";

export function ContactSection() {
  const { sendLead } = useSendLead();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      zipCode: "",
      mobile: "",
      email: "",
      product: "",
      comments: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendLead({
        ...data,
        type: "QUOTE",
      });
      toast.success("Message sent successfully");
      reset();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const getFieldClassName = (hasError: boolean, sizeClass: string) =>
    `${fieldBaseClass} ${sizeClass} ${hasError ? "border-[var(--brand-red)]" : ""}`;

  return (
    <section
      id="contact"
      className="mb-0 bg-ds-surface-muted py-ds-section-y"
      aria-label="Contact section"
    >
      <div className="ds-container">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact Us Today"
          description="Let's discuss how we can help with your packaging needs"
        />

        <div className={`grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 ${homeContentSpacingClassName}`}>
          <div className="flex flex-col gap-9 lg:gap-10">
            <SectionHeader
              eyebrow="Contact Details"
              title="Let's Start a Conversation"
              description="Our team is ready to help you find the perfect packaging solution for your business."
              align="left"
              titleLevel="h3"
            />

            <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
              {contactRows.map((item) => {
                const Icon = item.icon;

                if ("phoneLines" in item) {
                  return (
                    <div
                      key={item.title}
                      className={cn(
                        cardSurfaceVariants({ variant: "minimal", padding: "default" }),
                        "mb-0 flex items-start gap-5 bg-white shadow-ds-card-medium hover:shadow-ds-card-medium"
                      )}
                    >
                      <span className={cn(cardIconClassNames.inverse, "p-3")}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <span className={contactCardTitleClass}>
                          {item.title}
                        </span>
                        {item.phoneLines.map((line) => (
                          <a
                            key={line.href}
                            href={line.href}
                            className={cn(contactCardValueClass, "hover:text-[var(--primary)]")}
                          >
                            {line.text}
                          </a>
                        ))}
                      </span>
                    </div>
                  );
                }

                const linkItem = item;
                return (
                  <a
                    key={linkItem.title}
                    href={linkItem.href}
                    target={linkItem.title === "Address" ? "_blank" : undefined}
                    rel={linkItem.title === "Address" ? "noreferrer" : undefined}
                    className={cn(
                      cardSurfaceVariants({ variant: "minimal", padding: "default" }),
                      "group mb-0 flex items-start gap-5 bg-white shadow-ds-card-medium hover:shadow-ds-card-medium"
                    )}
                  >
                    <span className={cn(cardIconClassNames.inverse, "p-3")}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className={contactCardTitleClass}>
                        {linkItem.title}
                      </span>
                      <span className={cn(contactCardValueClass, "group-hover:text-[var(--primary)]")}>
                        {linkItem.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className={cn(cardSurfaceVariants({ variant: "elevated" }), "rounded-ds-card-lg bg-white")}>
              <iframe
                title="GDK Packaging location map"
                src="https://www.google.com/maps?q=26/59%20Birhana%20Road,%20Kanpur%20-%20208001&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div id="contact-form" className={cn(cardSurfaceVariants({ variant: "elevated", padding: "xl" }), "scroll-mt-28 rounded-ds-card-lg bg-white backdrop-blur")}>
            <form className="contact-form space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2.5">
                <label htmlFor="contact-name" className={fieldLabelClass}>
                  Name <span className="text-[var(--brand-red)]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  aria-invalid={!!errors.name}
                  className={getFieldClassName(!!errors.name, "h-[52px]")}
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name?.message ? (
                  <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.name.message}</p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-address" className={fieldLabelClass}>
                  Address <span className="text-[var(--brand-red)]">*</span>
                </label>
                <textarea
                  id="contact-address"
                  rows={3}
                  aria-invalid={!!errors.address}
                  className={getFieldClassName(!!errors.address, "min-h-[160px] py-4 resize-none")}
                  placeholder="Enter your address"
                  {...register("address")}
                />
                {errors.address?.message ? (
                  <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.address.message}</p>
                ) : null}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2.5">
                  <label htmlFor="contact-city" className={fieldLabelClass}>
                    City <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-city"
                    type="text"
                    aria-invalid={!!errors.city}
                  className={getFieldClassName(!!errors.city, "h-[52px]")}
                    placeholder="Enter city"
                    {...register("city")}
                  />
                  {errors.city?.message ? (
                    <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.city.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="contact-zip" className={fieldLabelClass}>
                    Zip Code <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-zip"
                    type="text"
                    aria-invalid={!!errors.zipCode}
                  className={getFieldClassName(!!errors.zipCode, "h-[52px]")}
                    placeholder="Enter zip code"
                    {...register("zipCode")}
                  />
                  {errors.zipCode?.message ? (
                    <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.zipCode.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2.5">
                  <label htmlFor="contact-mobile" className={fieldLabelClass}>
                    Mobile <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-mobile"
                    type="tel"
                    aria-invalid={!!errors.mobile}
                  className={getFieldClassName(!!errors.mobile, "h-[52px]")}
                    placeholder="Enter mobile number"
                    {...register("mobile")}
                  />
                  {errors.mobile?.message ? (
                    <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.mobile.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="contact-email" className={fieldLabelClass}>
                    Email <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    aria-invalid={!!errors.email}
                  className={getFieldClassName(!!errors.email, "h-[52px]")}
                    placeholder="Enter email address"
                    {...register("email")}
                  />
                  {errors.email?.message ? (
                    <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-product" className={fieldLabelClass}>
                  Select Product <span className="text-[var(--brand-red)]">*</span>
                </label>
                <select
                  id="contact-product"
                  aria-invalid={!!errors.product}
                  className={getFieldClassName(!!errors.product, "h-[52px]")}
                  {...register("product")}
                >
                  <option value="" disabled>
                    Select Product*
                  </option>
                  <option value="PET Hinged Box">PET Hinged Box</option>
                  <option value="PET Container">PET Container</option>
                  <option value="PET Sauce Container">PET Sauce Container</option>
                  <option value="PP Sweet Box">PP Sweet Box</option>
                  <option value="PP Meal Box">PP Meal Box</option>
                  <option value="PP Container">PP Container</option>
                  <option value="PP Cookies Tray">PP Cookies Tray</option>
                  <option value="Printed Products">Printed Products</option>
                </select>
                {errors.product?.message ? (
                  <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.product.message}</p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="contact-comments" className={fieldLabelClass}>
                  Comments <span className="text-[var(--brand-red)]">*</span>
                </label>
                <textarea
                  id="contact-comments"
                  rows={5}
                  aria-invalid={!!errors.comments}
                  className={getFieldClassName(!!errors.comments, "min-h-[160px] py-4 resize-none")}
                  placeholder="Enter your comments"
                  {...register("comments")}
                />
                {errors.comments?.message ? (
                  <p className="mt-1 text-sm text-[var(--brand-red)] font-medium">{errors.comments.message}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--brand-accent)] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
