"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ENQUIRY_STORAGE_KEY = "gdk-enquiry-items";

export type EnquiryItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  variants?: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
  variantLabel?: string;
};

type EnquiryContextValue = {
  items: EnquiryItem[];
  count: number;
  hydrated: boolean;
  isDrawerOpen: boolean;
  isEnquiryModalOpen: boolean;
  recentlyAddedId: string | null;
  addItem: (item: EnquiryItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  isSelected: (id: string) => boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  openEnquiryModal: () => void;
  closeEnquiryModal: () => void;
  setEnquiryModalOpen: (open: boolean) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredEnquiryItem(value: unknown): value is EnquiryItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    typeof value.imageSrc === "string" &&
    typeof value.imageAlt === "string" &&
    typeof value.href === "string"
  );
}

function readStoredItems(): EnquiryItem[] {
  try {
    const raw = window.localStorage.getItem(ENQUIRY_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isStoredEnquiryItem);
  } catch {
    return [];
  }
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setItems((current) => {
        const stored = readStoredItems();
        if (!current.length) return stored;

        const merged = new Map(stored.map((item) => [item.id, item]));
        for (const item of current) {
          merged.set(item.id, item);
        }

        return Array.from(merged.values());
      });
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      if (items.length) {
        window.localStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(items));
      } else {
        window.localStorage.removeItem(ENQUIRY_STORAGE_KEY);
      }
    } catch {
      // Persistence failure should not block the enquiry workflow.
    }
  }, [hydrated, items]);

  useEffect(() => {
    if (!recentlyAddedId) return;

    const timeout = window.setTimeout(() => setRecentlyAddedId(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [recentlyAddedId]);

  const addItem = useCallback((item: EnquiryItem) => {
    setItems((current) => {
      if (current.some((existing) => existing.id === item.id)) {
        return current;
      }

      return [item, ...current];
    });
    setRecentlyAddedId(item.id);
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
    setRecentlyAddedId(null);

    try {
      window.localStorage.removeItem(ENQUIRY_STORAGE_KEY);
    } catch {
      // Persistence failure should not block the enquiry workflow.
    }
  }, []);

  const isSelected = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items],
  );

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const openEnquiryModal = useCallback(() => setIsEnquiryModalOpen(true), []);
  const closeEnquiryModal = useCallback(() => setIsEnquiryModalOpen(false), []);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      items,
      count: items.length,
      hydrated,
      isDrawerOpen,
      isEnquiryModalOpen,
      recentlyAddedId,
      addItem,
      removeItem,
      clearItems,
      isSelected,
      openDrawer,
      closeDrawer,
      setDrawerOpen: setIsDrawerOpen,
      openEnquiryModal,
      closeEnquiryModal,
      setEnquiryModalOpen: setIsEnquiryModalOpen,
    }),
    [
      addItem,
      clearItems,
      closeEnquiryModal,
      closeDrawer,
      hydrated,
      isEnquiryModalOpen,
      isDrawerOpen,
      isSelected,
      items,
      openEnquiryModal,
      openDrawer,
      recentlyAddedId,
      removeItem,
    ],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);

  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }

  return context;
}
