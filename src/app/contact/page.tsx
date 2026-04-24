"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, MessageSquare, Phone, Users } from "lucide-react";
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
    console.log({
      type: "contact-enquiry",
      ...values,
    });
    toast.success("Message sent successfully");
    reset();
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground">
          Tell us about your packaging requirements and our team will get back to you.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Send an Enquiry</h2>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <label htmlFor="contact-name" className="inline-flex items-center gap-1.5 text-sm font-medium">
                <Users className="h-4 w-4 text-[#f26a21]" />
                Name
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  className="pl-9"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
              </div>
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-phone" className="inline-flex items-center gap-1.5 text-sm font-medium">
                <Phone className="h-4 w-4 text-[#f26a21]" />
                Phone
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="contact-phone"
                  placeholder="+91 98765 43210"
                  className="pl-9"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
              </div>
              {errors.phone ? (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-message" className="inline-flex items-center gap-1.5 text-sm font-medium">
                <MessageSquare className="h-4 w-4 text-[#f26a21]" />
                Message
              </label>
              <div className="relative">
                <MessageSquare className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="contact-message"
                  placeholder="Share your product requirements, quantity, and timeline."
                  className="min-h-28 pl-9"
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
              </div>
              {errors.message ? (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              ) : null}
            </div>

            <div className="pt-1">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">Company Info</h2>
            <div className="grid gap-4 text-sm">
              <div>
                <p className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-[#f26a21]" />
                  Address
                </p>
                <p className="text-muted-foreground">
                  GDK Packaging Pvt. Ltd.
                  <br />
                  42 Industrial Estate Road
                  <br />
                  Pune, Maharashtra 411001
                </p>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <Phone className="h-4 w-4 text-[#f26a21]" />
                  Phone
                </p>
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary">
                  +91 98765 43210
                </a>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <Mail className="h-4 w-4 text-[#f26a21]" />
                  Email
                </p>
                <a
                  href="mailto:sales@gdkpackaging.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  sales@gdkpackaging.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Google Map</h3>
            <div className="flex h-48 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
              Map placeholder (embed Google Map here)
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
