"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  poster?: string;
  label?: string;
  /** Show player controls instead of silently looping. */
  controls?: boolean;
  /** Moving the pointer across the video scrubs through it, like a playhead. */
  scrub?: boolean;
  className?: string;
};

/**
 * A video that downloads nothing but its poster until it scrolls near the
 * screen. Looping videos play only while visible and pause when scrolled
 * away; visitors who prefer reduced motion just see the poster. Videos with
 * controls load only when the visitor presses play.
 */
export function LazyVideo({ src, poster, label, controls = false, scrub = false, className }: LazyVideoProps) {
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

    let visible = false;
    let scrubbing = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!video.getAttribute("src")) {
            video.src = src;
          }
          if (!scrubbing) {
            video.play().catch(() => {
              // Autoplay can be refused (e.g. data saver); the poster stays visible.
            });
          }
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);

    // Hover-scrub only makes sense with a real pointer, not touch.
    const canScrub = scrub && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (event: PointerEvent) => {
      if (!video.duration) return;
      scrubbing = true;
      video.pause();
      const rect = video.getBoundingClientRect();
      const fraction = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      video.currentTime = fraction * video.duration;
    };
    const onLeave = () => {
      scrubbing = false;
      if (visible) {
        video.play().catch(() => {});
      }
    };
    if (canScrub) {
      video.addEventListener("pointermove", onMove);
      video.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observer.disconnect();
      video.removeEventListener("pointermove", onMove);
      video.removeEventListener("pointerleave", onLeave);
    };
  }, [src, controls, scrub]);

  if (controls) {
    return <video ref={ref} className={className} src={src} poster={poster} controls playsInline preload="none" aria-label={label} />;
  }

  return (
    <video
      ref={ref}
      className={[className, scrub ? "scrub" : ""].filter(Boolean).join(" ") || undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
