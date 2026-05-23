"use client";

import Image from "next/image";

import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

export type CertificationItem = {
  readonly image: string;
  readonly pdf: string;
};

type CertificationCardProps = {
  item: CertificationItem;
  index: number;
};

export function CertificationCard({
  item,
  index,
}: CertificationCardProps) {
  const { image, pdf } = item;

  return (
    <div className="relative min-w-0 w-full max-w-[560px] overflow-visible">
      <a
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          cardSurfaceVariants({
            variant: "interactive",
            padding: "sm",
          }),
          "relative block w-full rounded-xl p-4 sm:w-full",
        )}
      >
        <div className="flex h-[min(24.5rem,calc(100vh-3rem))] min-h-60 w-full items-center justify-center">
          <Image
            src={image}
            alt={`Certification ${index + 1}`}
            width={1000}
            height={500}
            sizes="(min-width: 1024px) 560px, 95vw"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </a>
    </div>
  );
}
