import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";

type ProductApplicationsProps = {
  applications: string[];
  description?: string;
};

export function ProductApplications({ applications, description }: ProductApplicationsProps) {
  return (
    <section aria-labelledby="product-applications" className="space-y-5">
      <div className="space-y-2">
        <h2
          id="product-applications"
          className="text-h3 text-ds-text-strong"
        >
          Applications
        </h2>
        <p className="text-sm text-ds-text-muted">
          {description ?? "Used across food service, retail, and industrial packing."}
        </p>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2">
        {applications.map((application, index) => (
          <li
            key={application}
            className={cn(
              cardSurfaceVariants({ variant: "minimal" }),
              "flex gap-4 rounded-xl bg-ds-surface-muted px-5 py-4 text-sm text-ds-text-body"
            )}
          >
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--secondary)_12%,white)] text-xs font-semibold text-[var(--secondary)]">
              {index + 1}
            </span>
            <span className="leading-6">{application}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
