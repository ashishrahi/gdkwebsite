"use client";

import Image from "next/image";
import { FaFilePdf } from "react-icons/fa6"
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type CertificationItem = {
  readonly image: string;
  readonly pdf: string;
};

type CertificationCardProps = {
  item: CertificationItem;
  index: number;
};

/** Target width range ~350–450px; clamped to viewport */
const PREVIEW_MAX_W = 420;
const PREVIEW_MIN_W = 350;
const PREVIEW_PAD = 16;
const PREVIEW_GAP = 16;
const PREVIEW_MARGIN = 12;
const LG_MIN = 1024;

type PreviewLayout = {
  box: Pick<CSSProperties, "left" | "top" | "width" | "height">;
  innerHeight: number;
};

function computePreviewLayout(rect: DOMRect): PreviewLayout {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const available = vw - PREVIEW_MARGIN * 2;
  let previewW = Math.min(PREVIEW_MAX_W, available);
  if (available >= PREVIEW_MIN_W) {
    previewW = Math.max(PREVIEW_MIN_W, previewW);
  }

  const maxInnerByVh = vh - PREVIEW_MARGIN * 2 - PREVIEW_PAD * 2;
  const idealInner = Math.max(160, Math.round(previewW * 0.52));
  const innerH = Math.min(idealInner, Math.max(0, maxInnerByVh));
  const previewH = innerH + PREVIEW_PAD * 2;
  const isLg = vw >= LG_MIN;

  let left: number;
  let top: number;

  if (isLg) {
    left = rect.right + PREVIEW_GAP;
    top = rect.top + rect.height / 2 - previewH / 2;

    if (left + previewW > vw - PREVIEW_MARGIN) {
      left = rect.left - previewW - PREVIEW_GAP;
    }
    if (left < PREVIEW_MARGIN) {
      left = Math.max(
        PREVIEW_MARGIN,
        Math.min(
          rect.left + rect.width / 2 - previewW / 2,
          vw - previewW - PREVIEW_MARGIN,
        ),
      );
      top = rect.top - previewH - PREVIEW_GAP;
      if (top < PREVIEW_MARGIN) {
        top = rect.bottom + PREVIEW_GAP;
      }
    }
  } else {
    left = rect.left + rect.width / 2 - previewW / 2;
    left = Math.max(
      PREVIEW_MARGIN,
      Math.min(left, vw - previewW - PREVIEW_MARGIN),
    );
    top = rect.top - previewH - PREVIEW_GAP;
    if (top < PREVIEW_MARGIN) {
      top = rect.bottom + PREVIEW_GAP;
    }
    if (top + previewH > vh - PREVIEW_MARGIN) {
      top = Math.max(PREVIEW_MARGIN, vh - previewH - PREVIEW_MARGIN);
    }
  }

  top = Math.max(
    PREVIEW_MARGIN,
    Math.min(top, vh - previewH - PREVIEW_MARGIN),
  );

  return {
    box: {
      width: previewW,
      height: previewH,
      top,
      left,
    },
    innerHeight: innerH,
  };
}

export function CertificationCard({ item, index }: CertificationCardProps) {
  const { image, pdf } = item;
  const rootRef = useRef<HTMLDivElement>(null);
  const [renderPreview, setRenderPreview] = useState(false);
  const [previewOpaque, setPreviewOpaque] = useState(false);
  const [previewLayout, setPreviewLayout] = useState<PreviewLayout | null>(
    null,
  );

  const updatePreviewPosition = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    setPreviewLayout(computePreviewLayout(el.getBoundingClientRect()));
  }, []);

  const showPreview = useCallback(() => {
    updatePreviewPosition();
    setRenderPreview(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPreviewOpaque(true));
    });
  }, [updatePreviewPosition]);

  const hidePreview = useCallback(() => {
    setPreviewOpaque(false);
  }, []);

  useEffect(() => {
    if (!renderPreview || !previewOpaque) return;
    const onViewportChange = () => updatePreviewPosition();
    window.addEventListener("scroll", onViewportChange, true);
    window.addEventListener("resize", onViewportChange);
    return () => {
      window.removeEventListener("scroll", onViewportChange, true);
      window.removeEventListener("resize", onViewportChange);
    };
  }, [renderPreview, previewOpaque, updatePreviewPosition]);

  const previewNode =
    renderPreview && previewLayout ? (
      <div
        aria-hidden
        className="pointer-events-none fixed z-50 overflow-visible rounded-xl border border-border bg-white p-4 shadow-2xl shadow-black/20 transition-opacity duration-200 ease-out"
        style={{
          ...previewLayout.box,
          opacity: previewOpaque ? 1 : 0,
        }}
        onTransitionEnd={(e) => {
          if (e.propertyName === "opacity" && !previewOpaque) {
            setRenderPreview(false);
            setPreviewLayout(null);
          }
        }}
      >
        <div
          className="flex w-full items-center justify-center overflow-visible"
          style={{ height: previewLayout.innerHeight }}
        >
          <Image
            src={image}
            alt=""
            width={840}
            height={320}
            sizes="(min-width: 1024px) 420px, 90vw"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    ) : null;

  return (
    <div ref={rootRef} className="relative min-w-0 overflow-visible">
      <a
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-fit rounded-xl border border-border bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105"
        onMouseEnter={showPreview}
        onMouseLeave={hidePreview}
      >
        <div className="flex items-center justify-center">
          <Image
            src={image}
            alt={`Certification ${index + 1}`}
            width={280}
            height={80}
            className="h-auto w-auto max-h-[120px] object-contain"
          />
        </div>
        <span
          className="absolute top-2 right-2 z-10 rounded-md bg-white/90 p-1 shadow-sm backdrop-blur"
          aria-label="View Certificate PDF"
        >
          <FaFilePdf  className="h-4 w-4 text-red-400" aria-hidden />
        </span>
      </a>

      {typeof document !== "undefined" && previewNode
        ? createPortal(previewNode, document.body)
        : null}
    </div>
  );
}
