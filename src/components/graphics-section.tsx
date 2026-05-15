"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { initAudio, playTick, playHover, startAmbient, stopAmbient } from "@/lib/sounds";
import { campaigns } from "@/data/campaigns";

const scatterOffsets = [
  { x: -200, y: -140, r: -12, xS: -100, yS: -80 },
  { x: -60, y: -170, r: 8, xS: -30, yS: -90 },
  { x: 100, y: -150, r: -6, xS: 50, yS: -80 },
  { x: 210, y: -110, r: 15, xS: 100, yS: -60 },
  { x: -160, y: 30, r: 10, xS: -80, yS: 20 },
  { x: 50, y: 50, r: -14, xS: 25, yS: 30 },
];

export function GraphicsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioInitedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, slug: string) => {
      if (hoveredId !== slug) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [hoveredId],
  );

  useEffect(() => {
    const handler = () => {
      if (!audioInitedRef.current) {
        initAudio();
        audioInitedRef.current = true;
      }
    };
    window.addEventListener("scroll", handler, { once: true, passive: true });
    window.addEventListener("click", handler, { once: true });
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    if (!soundEnabled || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAmbient();
        else stopAmbient();
      },
      { threshold: 0.3 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    if (!audioInitedRef.current) {
      initAudio();
      audioInitedRef.current = true;
    }
    setSoundEnabled((prev) => !prev);
  }, []);

  const handleMouseEnterCampaign = useCallback(
    (slug: string) => {
      setHoveredId(slug);
      if (soundEnabled) playHover();
    },
    [soundEnabled],
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-[#f5f0e8]/10 bg-[#0b0b0b] px-4 py-14 sm:px-8 sm:py-20"
      id="graphics"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-16 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc] sm:text-sm">
              Visual work
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-[0.98] text-[#f5f0e8] sm:mt-4 sm:text-5xl lg:text-7xl">
              Ad campaigns & visual storytelling.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#bdb4aa] sm:mt-5 sm:max-w-2xl sm:text-lg sm:leading-8">
              Hover to preview, click to explore the full story behind each campaign.
            </p>
          </div>
          <button
            onClick={toggleSound}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-[#f5f0e8]/18 bg-[#f5f0e8]/7 px-4 font-mono text-xs uppercase tracking-[0.12em] text-[#bdb4aa] transition hover:border-[#6affcc] hover:text-[#6affcc]"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {soundEnabled ? "Sound on" : "Sound off"}
          </button>
        </div>

        <div className="flex flex-col">
          {campaigns.map((campaign, index) => {
            const isHovered = hoveredId === campaign.slug;

            return (
              <a
                key={campaign.slug}
                href={`/graphics/${campaign.slug}`}
                className="group relative cursor-default select-none"
                onMouseEnter={() => handleMouseEnterCampaign(campaign.slug)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => handleMouseMove(e, campaign.slug)}
              >
                <div className="flex items-center gap-3 py-4 sm:gap-6 sm:py-7">
                  <span className="font-mono text-xs text-[#ff8b70] sm:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`text-lg font-semibold transition-colors duration-300 sm:text-2xl lg:text-3xl ${
                      isHovered ? "text-[#6affcc]" : "text-[#f5f0e8]"
                    }`}
                  >
                    {campaign.title}
                  </h3>
                  <span className="ml-auto hidden font-mono text-xs uppercase tracking-[0.1em] text-[#8d867e] sm:block">
                    {campaign.category}
                  </span>
                  <span
                    className={`text-xl transition-all duration-300 ${
                      isHovered
                        ? "translate-x-0 translate-y-0 opacity-100 text-[#6affcc]"
                        : "-translate-x-2 translate-y-2 opacity-0"
                    }`}
                  >
                    ↗
                  </span>
                </div>

                <div
                  className={`h-px w-full transition-colors duration-300 ${
                    isHovered ? "bg-[#6affcc]/40" : "bg-[#f5f0e8]/10"
                  }`}
                />

                {isHovered && (
                  <div
                    className="pointer-events-none absolute z-50"
                    style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%, -50%)" }}
                  >
                    {campaign.images.map((src, i) => {
                      const offset = scatterOffsets[i % scatterOffsets.length];
                      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                      const x = isMobile ? offset.xS : offset.x;
                      const y = isMobile ? offset.yS : offset.y;
                      const w = isMobile ? 100 : 170;
                      const h = isMobile ? 130 : 220;
                      if (soundEnabled) {
                        setTimeout(() => playTick(), i * 70);
                      }
                      return (
                        <div
                          key={`${campaign.slug}-${i}`}
                          className="absolute left-0 top-0 overflow-hidden rounded-md shadow-[0_8px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                          style={{
                            width: w,
                            height: h,
                            animation: `thumbPopIn 0.4s ${i * 70}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
                            transform: `translate(${x}px, ${y}px) rotate(${offset.r}deg)`,
                          }}
                        >
                          <img
                            src={src}
                            alt={`${campaign.title} — ad creative ${i + 1}`}
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
