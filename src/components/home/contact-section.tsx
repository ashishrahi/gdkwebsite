"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactRows = [
  {
    title: "Email",
    value: "sales@gdkpackaging.com",
    href: "mailto:sales@gdkpackaging.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+91 9889271007",
    href: "tel:+919889271007",
    icon: Phone,
  },
  {
    title: "Address",
    value: "26/59 Birhana Road, Kanpur - 208001",
    href: "https://maps.google.com/?q=26/59%20Birhana%20Road,%20Kanpur%20-%20208001",
    icon: MapPin,
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
  "w-full rounded-xl !bg-white text-black placeholder:text-slate-500 border border-slate-300 px-5 shadow-sm appearance-none focus:!bg-white focus:text-black focus:border-[var(--secondary)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--secondary)_20%,white)] outline-none";

export function ContactSection() {
  const {
    register,
    handleSubmit,
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

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
  };

  const getFieldClassName = (hasError: boolean, sizeClass: string) =>
    `${fieldBaseClass} ${sizeClass} ${hasError ? "border-red-400" : ""}`;

  return (
    <section
      id="contact"
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-slate-50 py-24"
      aria-label="Contact section"
    >
      <div className="mx-auto w-full max-w-7xl space-y-14 px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-flex rounded-full border border-[color:color-mix(in_srgb,var(--brand-accent)_25%,transparent)] bg-[color:color-mix(in_srgb,var(--brand-accent)_12%,white)] px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--brand-accent)]">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Contact Us Today
          </h2>
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            Let&apos;s discuss how we can help with your packaging needs
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                Let&apos;s Start a Conversation
              </h3>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                Our team is ready to help you find the perfect packaging solution for
                your business.
              </p>
            </div>

            <div className="space-y-4">
              {contactRows.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.title === "Address" ? "_blank" : undefined}
                    rel={item.title === "Address" ? "noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    <span className="inline-flex rounded-xl bg-[var(--secondary)] p-3 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="space-y-1">
                      <span className="block text-base font-semibold text-[var(--secondary)]">
                        {item.title}
                      </span>
                      <span className="block text-sm leading-6 text-slate-600 sm:text-base">
                        {item.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
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

          <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur sm:p-10">
            <form className="contact-form space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-slate-800 font-semibold text-sm mb-2">
                  Name <span className="text-[var(--brand-red)]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  aria-invalid={!!errors.name}
                  className={getFieldClassName(!!errors.name, "h-14")}
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name?.message ? (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.name.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-address" className="text-slate-800 font-semibold text-sm mb-2">
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
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.address.message}</p>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-city" className="text-slate-800 font-semibold text-sm mb-2">
                    City <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-city"
                    type="text"
                    aria-invalid={!!errors.city}
                    className={getFieldClassName(!!errors.city, "h-14")}
                    placeholder="Enter city"
                    {...register("city")}
                  />
                  {errors.city?.message ? (
                    <p className="mt-1 text-sm text-red-500 font-medium">{errors.city.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-zip" className="text-slate-800 font-semibold text-sm mb-2">
                    Zip Code <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-zip"
                    type="text"
                    aria-invalid={!!errors.zipCode}
                    className={getFieldClassName(!!errors.zipCode, "h-14")}
                    placeholder="Enter zip code"
                    {...register("zipCode")}
                  />
                  {errors.zipCode?.message ? (
                    <p className="mt-1 text-sm text-red-500 font-medium">{errors.zipCode.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-mobile" className="text-slate-800 font-semibold text-sm mb-2">
                    Mobile <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-mobile"
                    type="tel"
                    aria-invalid={!!errors.mobile}
                    className={getFieldClassName(!!errors.mobile, "h-14")}
                    placeholder="Enter mobile number"
                    {...register("mobile")}
                  />
                  {errors.mobile?.message ? (
                    <p className="mt-1 text-sm text-red-500 font-medium">{errors.mobile.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-slate-800 font-semibold text-sm mb-2">
                    Email <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    aria-invalid={!!errors.email}
                    className={getFieldClassName(!!errors.email, "h-14")}
                    placeholder="Enter email address"
                    {...register("email")}
                  />
                  {errors.email?.message ? (
                    <p className="mt-1 text-sm text-red-500 font-medium">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-product" className="text-slate-800 font-semibold text-sm mb-2">
                  Select Product <span className="text-[var(--brand-red)]">*</span>
                </label>
                <select
                  id="contact-product"
                  aria-invalid={!!errors.product}
                  className={getFieldClassName(!!errors.product, "h-14")}
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
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.product.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-comments" className="text-slate-800 font-semibold text-sm mb-2">
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
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.comments.message}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
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
