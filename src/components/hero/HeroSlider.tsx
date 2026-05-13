"use client";

import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const heroSlides = [
  {
    src: "/hero/hero1.webp",
    alt: "GDK Packaging manufacturing and industrial packaging facility",
    position: "object-center",
  },
  {
    src: "/hero/hero2.webp",
    alt: "Industrial packaging production line with premium quality control",
    position: "object-center",
  },
  {
    src: "/hero/hero3.webp",
    alt: "Modern packaging materials prepared for enterprise supply",
    position: "object-center",
  },
  {
    src: "/hero/hero4.webp",
    alt: "High-performance packaging manufacturing environment",
    position: "object-center",
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
      className="absolute inset-0 h-full w-full"
    >
      {heroSlides.map((slide, index) => (
        <SwiperSlide key={slide.src} className="relative h-full w-full overflow-hidden bg-brand-green-deep">
          <Image
            src={slide.src}
            alt=""
            fill
            quality={95}
            sizes="100vw"
            aria-hidden="true"
            className={`scale-110 object-cover ${slide.position} blur-2xl brightness-[0.92] saturate-[1.08]`}
          />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            className={`object-cover ${slide.position} brightness-[1.08] contrast-[1.06] saturate-[1.12]`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
