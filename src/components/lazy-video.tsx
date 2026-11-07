"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  poster?: string;
  label?: string;
  /** Show player controls instead of silently looping. */
  controls?: boolean;
};

/**
 * A video that downloads nothing but its poster until it scrolls near the
 * screen. Looping background videos play only while visible and pause when
 * scrolled away; visitors who prefer reduced motion just see the poster.
 * Videos with controls load only when the visitor presses play.
 */
export function LazyVideo({ src, poster, label, controls = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || controls) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) {
            video.src = src;
          }
          video.play().catch(() => {
            // Autoplay can be refused (e.g. data saver); the poster stays visible.
          });
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, controls]);

  if (controls) {
    return <video ref={ref} src={src} poster={poster} controls playsInline preload="none" aria-label={label} />;
  }

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-label={label} />;
}
