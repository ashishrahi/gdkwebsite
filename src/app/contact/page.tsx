"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Phone must contain at least 10 digits",
    }),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    void values;
    toast.success("Message sent successfully");
    reset();
  };

  return (
    <main className="bg-[#f8fafc] pt-36 pb-20 md:pt-44">
      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex rounded-full border border-neutral-800 px-6 py-2 text-xs font-semibold tracking-[0.35em] uppercase">
            Get In Touch
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">Contact Us Today</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600">
            Let&apos;s discuss how we can help with your packaging needs.
          </p>
        </div>

        <div className="mt-20 grid items-start gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Let&apos;s Start a Conversation</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
              Our team is ready to help you find the perfect packaging solution for your business.
            </p>

            <div className="mt-10 space-y-6">
              <div className="rounded-[28px] border border-neutral-200 bg-white px-7 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Email</p>
                    <a
                      href="mailto:sales@gdkpackaging.com"
                      className="text-2xl font-semibold text-neutral-900 hover:text-orange-500"
                    >
                      sales@gdkpackaging.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white px-7 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Phone</p>
                    <a href="tel:+919876543210" className="text-2xl font-semibold text-neutral-900 hover:text-orange-500">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white px-7 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Address</p>
                    <p className="text-xl leading-8 font-semibold text-neutral-900">
                      GDK Packaging Pvt. Ltd.
                      <br />
                      42 Industrial Estate Road
                      <br />
                      Pune, Maharashtra 411001
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white px-7 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                    <FaWhatsapp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">WhatsApp</p>
                    <a
                      href="https://wa.me/919889271007"
                      target="_blank"
                      rel="noreferrer"
                      className="text-2xl font-semibold text-neutral-900 hover:text-[#25D366]"
                    >
                      +91 98892 71007
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 h-[340px] overflow-hidden rounded-[28px] border border-neutral-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps?q=26/59%20Birhana%20Road%20Kanpur%20208001&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="GDK Packaging location map"
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Send an Enquiry</h2>
            <form className="mt-8 grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="contact-name" className="mb-3 block text-base font-semibold text-neutral-800">
                  Name
                </label>
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  className="h-14 rounded-2xl px-5 text-lg !bg-white !text-neutral-900 bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-3 block text-base font-semibold text-neutral-800">
                  Phone
                </label>
                <Input
                  id="contact-phone"
                  placeholder="+91 98765 43210"
                  className="h-14 rounded-2xl px-5 text-lg !bg-white !text-neutral-900 bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="mt-2 text-sm text-destructive">{errors.phone.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-3 block text-base font-semibold text-neutral-800">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Share your product requirements, quantity, and timeline."
                  className="min-h-[160px] rounded-2xl px-5 pt-4 text-lg !bg-white !text-neutral-900 bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="mt-2 text-sm text-destructive">{errors.message.message}</p>
                ) : null}
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 h-16 w-full rounded-2xl bg-orange-500 text-lg font-semibold text-white shadow-[0_16px_35px_rgba(249,115,22,0.35)] transition-all hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
