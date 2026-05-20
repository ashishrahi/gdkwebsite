"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CareerOpening } from "@/lib/data/careers";

type CareerApplyContextValue = {
  isOpen: boolean;
  selectedOpening: CareerOpening | null;
  openApplyModal: (opening?: CareerOpening | null) => void;
  closeApplyModal: () => void;
  setApplyModalOpen: (open: boolean) => void;
};

const CareerApplyContext = createContext<CareerApplyContextValue | null>(null);

export function CareerApplyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpening, setSelectedOpening] = useState<CareerOpening | null>(
    null,
  );

  const openApplyModal = useCallback((opening?: CareerOpening | null) => {
    setSelectedOpening(opening ?? null);
    setIsOpen(true);
  }, []);

  const closeApplyModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setApplyModalOpen = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedOpening(null);
    }
  }, []);

  const value = useMemo<CareerApplyContextValue>(
    () => ({
      isOpen,
      selectedOpening,
      openApplyModal,
      closeApplyModal,
      setApplyModalOpen,
    }),
    [closeApplyModal, isOpen, openApplyModal, selectedOpening, setApplyModalOpen],
  );

  return (
    <CareerApplyContext.Provider value={value}>
      {children}
    </CareerApplyContext.Provider>
  );
}

export function useCareerApply() {
  const context = useContext(CareerApplyContext);

  if (!context) {
    throw new Error("useCareerApply must be used within CareerApplyProvider");
  }

  return context;
}
