"use client";

import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const heroSlides = [
  {
    src: "/images/hero/hero1.webp",
    mobileSrc: "/images/hero/mobile-hero1.webp",
    tabletSrc: "/images/hero/tablet_hero1.webp",
    alt: "GDK Packaging manufacturing and industrial packaging facility",
    position: "object-[58%_46%] sm:object-[52%_46%] lg:object-[50%_46%]",
  },
  {
    src: "/images/hero/hero2.webp",
    mobileSrc: "/images/hero/mobilehero2.webp",
    tabletSrc: "/images/hero/tablethero2.webp",
    alt: "Industrial packaging production line with premium quality control",
    position: "object-[55%_42%] sm:object-[50%_42%]",
  },
] as const;

export function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop
      speed={1200}
      autoplay={{
        delay: 5200,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      allowTouchMove={false}
      className="absolute inset-0 h-full w-full overflow-hidden [&_.swiper-slide]:h-full [&_.swiper-slide]:w-full [&_.swiper-wrapper]:h-full [&_.swiper-wrapper]:w-full"
    >
      {heroSlides.map((slide, index) => (
        <SwiperSlide key={slide.src} className="relative h-full w-full overflow-hidden bg-brand-green-deep">
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 767px)" srcSet={slide.mobileSrc} type="image/webp" />
            <source media="(min-width: 768px) and (max-width: 1024px)" srcSet={slide.tabletSrc} type="image/webp" />
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              quality={100}
              sizes="100vw"
              className={`object-cover ${slide.position}`}
            />
          </picture>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
