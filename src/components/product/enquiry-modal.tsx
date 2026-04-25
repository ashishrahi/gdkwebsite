"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EnquiryModalProps = {
  productName: string;
};

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Phone must contain at least 10 digits",
    }),
  message: z.string().optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

export function EnquiryModal({ productName }: EnquiryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: EnquiryFormValues) => {
    void values;
    void productName;

    toast.success("Enquiry submitted");
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex h-9 items-center justify-center rounded-lg bg-orange-400 px-4 text-sm font-semibold text-white! shadow-[0_10px_22px_rgba(242,106,33,0.25)] transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Enquire Now
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-5 p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl leading-tight">
            Enquiry for {productName}
          </DialogTitle>
          <DialogDescription>
            Share your details and our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label htmlFor="enquiry-name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="enquiry-name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="enquiry-phone" className="text-sm font-medium">
              Phone
            </label>
            <Input
              id="enquiry-phone"
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="enquiry-message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="enquiry-message"
              placeholder="Tell us your quantity, timeline, and packaging requirements."
              className="min-h-28"
              aria-invalid={Boolean(errors.message)}
              {...register("message")}
            />
            {errors.message ? (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            ) : null}
          </div>

          <DialogFooter className="mt-1 sm:justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
