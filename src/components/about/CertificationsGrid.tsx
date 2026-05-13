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
      className={`grid max-w-md gap-5 md:max-w-2xl min-w-0 ${
        single ? "grid-cols-1 w-fit" : "grid-cols-2 w-full"
      }`}
    >
      {certifications.map((item, index) => (
        <CertificationCard key={item.pdf} item={item} index={index} />
      ))}
    </div>
  );
}
