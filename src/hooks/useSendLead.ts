"use client";

import emailjs from "@emailjs/browser";
import { useCallback, useState } from "react";

export type LeadFormInput = {
  name?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  company?: string;
  product?: string;
  productName?: string;
  quantity?: string | number;
  address?: string;
  city?: string;
  zipCode?: string;
  message?: string;
  comments?: string;
  type?: string;
};

export type UseSendLeadOptions = {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

function buildTemplateParams(data: LeadFormInput): Record<string, string> {
  const phone = data.phone || data.mobile || "";
  const message = data.message || data.comments || "";
  const q = data.quantity;
  return {
    name: String(data.name ?? ""),
    phone: String(phone),
    mobile: String(data.mobile ?? ""),
    email: String(data.email ?? ""),
    company: String(data.company ?? ""),
    product: String(data.product ?? ""),
    productName: String(data.productName ?? ""),
    quantity: q === undefined || q === null ? "" : String(q),
    address: String(data.address ?? ""),
    city: String(data.city ?? ""),
    zipCode: String(data.zipCode ?? ""),
    message: String(message),
    comments: String(data.comments ?? ""),
    type: String(data.type ?? ""),
  };
}

export function useSendLead(options?: UseSendLeadOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendLead = useCallback(
    async (data: LeadFormInput) => {
      const serviceId = (
        options?.serviceId ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      )?.trim();
      const templateId = (
        options?.templateId ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      )?.trim();
      const publicKey = (
        options?.publicKey ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )?.trim();

      // TEMPORARY: remove after verifying EmailJS env loads in the browser
      console.log("[EmailJS] env check", {
        NEXT_PUBLIC_EMAILJS_SERVICE_ID: serviceId ? "set" : "missing",
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: templateId ? "set" : "missing",
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: publicKey ? "set" : "missing",
      });

      if (!serviceId || !templateId || !publicKey) {
        const missing: string[] = [];
        if (!serviceId) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
        if (!templateId) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
        if (!publicKey) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");

        const err = new Error(
          `EmailJS is not configured. Missing: ${missing.join(", ")}. Add these to .env.local in the project root, then restart the Next.js dev server (env is baked in at build/start).`,
        );
        setError(err);
        throw err;
      }

      setError(null);
      setLoading(true);
      try {
        await emailjs.send(
          serviceId,
          templateId,
          buildTemplateParams(data),
          publicKey,
        );
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options?.publicKey, options?.serviceId, options?.templateId],
  );

  return { sendLead, loading, error };
}
