import { CareerApplyButton } from "@/components/career/career-apply-button";
import type { CareerOpening } from "@/lib/data/careers";

type ApplyNowButtonProps = {
  opening: CareerOpening;
  className?: string;
};

export function ApplyNowButton({ opening, className }: ApplyNowButtonProps) {
  return (
    <CareerApplyButton opening={opening} className={className}>
      Apply Now
    </CareerApplyButton>
  );
}
