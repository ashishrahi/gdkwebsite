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
<<<<<<< Updated upstream
      className={`grid min-w-0 max-w-md gap-5 md:max-w-2xl ${
        single ? "w-full max-w-full grid-cols-1 sm:w-fit" : "w-full grid-cols-1 sm:grid-cols-2"
=======
      className={`grid max-w-md gap-5 md:max-w-2xl min-w-0 ${
        single ? "grid-cols-1 w-fit" : "grid-cols-2 w-full"
>>>>>>> Stashed changes
      }`}
    >
      {certifications.map((item, index) => (
        <CertificationCard key={item.pdf} item={item} index={index} />
      ))}
    </div>
  );
}
