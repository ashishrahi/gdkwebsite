import {
  CertificationCard,
  type CertificationItem,
} from "./CertificationCard";

type CertificationsGridProps = {
  certifications: readonly CertificationItem[];
};

export function CertificationsGrid({ certifications }: CertificationsGridProps) {
  const single = certifications.length === 1;
  return (
    <div
      className={`grid min-w-0 gap-5 ${
        single
          ? "w-full max-w-[560px] grid-cols-1"
          : "w-full max-w-2xl grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {certifications.map((item, index) => (
        <CertificationCard key={item.pdf} item={item} index={index} />
      ))}
    </div>
  );
}
