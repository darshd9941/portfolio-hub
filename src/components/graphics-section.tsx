"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { initAudio, playTick, playHover, startAmbient, stopAmbient } from "@/lib/sounds";

type Campaign = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
};

const campaigns: Campaign[] = [
  { id: 1, title: "Urbanspace Bedsheet Collection", subtitle: "Product catalog ads", images: ["/graphics/bedsheets/1.webp", "/graphics/bedsheets/2.webp", "/graphics/bedsheets/3.webp", "/graphics/bedsheets/4.webp"] },
  { id: 2, title: "Embroidered Curtain Series", subtitle: "Digital campaign for luxury curtains", images: ["/graphics/curtains/1.webp", "/graphics/curtains/2.webp", "/graphics/curtains/3.webp"] },
  { id: 3, title: "Winter Comforter Campaign", subtitle: "Seasonal comforter range", images: ["/graphics/winter/1.webp", "/graphics/winter/2.webp", "/graphics/winter/3.webp", "/graphics/winter/4.webp"] },
  { id: 4, title: "Festive Gift Box Packaging", subtitle: "Wedding & festive designs", images: ["/graphics/giftbox/1.webp", "/graphics/giftbox/2.webp"] },
  { id: 5, title: "Carpet Showcase", subtitle: "Carpet collection ads", images: ["/graphics/carpets/1.webp", "/graphics/carpets/2.webp", "/graphics/carpets/3.webp"] },
  { id: 6, title: "Google Ads Campaign", subtitle: "Performance marketing creatives", images: ["/graphics/google-ads/1.webp"] },
  { id: 7, title: "Instagram Story Ads", subtitle: "Social media creatives", images: ["/graphics/story-ads/1.webp", "/graphics/story-ads/2.webp", "/graphics/story-ads/3.webp"] },
  { id: 8, title: "Window Blinds Launch", subtitle: "Product launch campaign", images: ["/graphics/blinds/1.webp", "/graphics/blinds/2.webp", "/graphics/blinds/3.webp"] },
  { id: 9, title: "Payday Sale Campaign", subtitle: "Promotional sale creatives", images: ["/graphics/payday/1.webp", "/graphics/payday/2.webp", "/graphics/payday/3.webp"] },
  { id: 10, title: "Diwali Special Collection", subtitle: "Festive season campaign", images: ["/graphics/diwali/1.webp", "/graphics/diwali/2.webp", "/graphics/diwali/3.webp"] },
  { id: 11, title: "September 2025 Drop", subtitle: "Monthly product drop", images: ["/graphics/september/1.webp", "/graphics/september/2.webp", "/graphics/september/3.webp"] },
  { id: 12, title: "Tofy Bedsheet Ads", subtitle: "E-commerce listing ads", images: ["/graphics/tofy/1.webp", "/graphics/tofy/2.webp", "/graphics/tofy/3.webp"] },
];

const scatterOffsets = [
  { x: -200, y: -140, r: -12 },
  { x: -60, y: -170, r: 8 },
  { x: 100, y: -150, r: -6 },
  { x: 210, y: -110, r: 15 },
  { x: -160, y: 30, r: 10 },
  { x: 50, y: 50, r: -14 },
];

export function GraphicsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioInitedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, id: number) => {
      if (hoveredId !== id) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [hoveredId],
  );

  // Init audio on first interaction
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

  // Ambient sound when section is in view
  useEffect(() => {
    if (!soundEnabled || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAmbient();
        } else {
          stopAmbient();
        }
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
    (id: number) => {
      setHoveredId(id);
      if (soundEnabled) playHover();
    },
    [soundEnabled],
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-[#f5f0e8]/10 bg-[#0b0b0b] px-5 py-20 sm:px-8"
      id="graphics"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#6affcc]">
              Visual work
            </p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.98] text-[#f5f0e8] sm:text-7xl">
              Ad campaigns & visual storytelling.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#bdb4aa]">
              Hover to explore — each campaign reveals its creative work.
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
            const isHovered = hoveredId === campaign.id;

            return (
              <div
                key={campaign.id}
                className="group relative cursor-default select-none"
                onMouseEnter={() => handleMouseEnterCampaign(campaign.id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => handleMouseMove(e, campaign.id)}
              >
                <div className="flex items-center gap-6 py-7">
                  <span className="font-mono text-sm text-[#ff8b70]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                      isHovered ? "text-[#6affcc]" : "text-[#f5f0e8]"
                    }`}
                  >
                    {campaign.title}
                  </h3>
                  <span
                    className={`ml-auto text-xl transition-all duration-300 ${
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

                      // Play tick sound for each thumbnail
                      if (soundEnabled) {
                        setTimeout(() => playTick(), i * 70);
                      }

                      return (
                        <div
                          key={`${campaign.id}-${i}`}
                          className="absolute left-0 top-0 overflow-hidden rounded-md shadow-[0_8px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                          style={{
                            width: 170,
                            height: 220,
                            animation: `thumbPopIn 0.4s ${i * 70}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
                            transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.r}deg)`,
                          }}
                        >
                          <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
