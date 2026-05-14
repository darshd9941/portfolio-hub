"use client";

import { useState, useCallback } from "react";

type Campaign = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
};

const campaigns: Campaign[] = [
  { id: 1, title: "Urbanspace Bedsheet Collection", subtitle: "Product catalog ads", images: ["/graphics/bedsheets/1.jpg", "/graphics/bedsheets/2.jpg", "/graphics/bedsheets/3.jpg", "/graphics/bedsheets/4.jpg"] },
  { id: 2, title: "Embroidered Curtain Series", subtitle: "Digital campaign for luxury curtains", images: ["/graphics/curtains/1.jpg", "/graphics/curtains/2.jpg", "/graphics/curtains/3.jpg"] },
  { id: 3, title: "Winter Comforter Campaign", subtitle: "Seasonal comforter range", images: ["/graphics/winter/1.png", "/graphics/winter/2.png", "/graphics/winter/3.png", "/graphics/winter/4.png"] },
  { id: 4, title: "Festive Gift Box Packaging", subtitle: "Wedding & festive designs", images: ["/graphics/giftbox/1.jpg", "/graphics/giftbox/2.jpg"] },
  { id: 5, title: "Carpet Showcase", subtitle: "Carpet collection ads", images: ["/graphics/carpets/1.jpg", "/graphics/carpets/2.jpg", "/graphics/carpets/3.jpg"] },
  { id: 6, title: "Google Ads Campaign", subtitle: "Performance marketing creatives", images: ["/graphics/google-ads/1.jpg"] },
  { id: 7, title: "Instagram Story Ads", subtitle: "Social media creatives", images: ["/graphics/story-ads/1.jpg", "/graphics/story-ads/2.jpg", "/graphics/story-ads/3.jpg"] },
  { id: 8, title: "Window Blinds Launch", subtitle: "Product launch campaign", images: ["/graphics/blinds/1.png", "/graphics/blinds/2.png", "/graphics/blinds/3.png"] },
  { id: 9, title: "Payday Sale Campaign", subtitle: "Promotional sale creatives", images: ["/graphics/payday/1.jpg", "/graphics/payday/2.jpg", "/graphics/payday/3.jpg"] },
  { id: 10, title: "Diwali Special Collection", subtitle: "Festive season campaign", images: ["/graphics/diwali/1.jpg", "/graphics/diwali/2.jpg", "/graphics/diwali/3.jpg"] },
  { id: 11, title: "September 2025 Drop", subtitle: "Monthly product drop", images: ["/graphics/september/1.jpg", "/graphics/september/2.png", "/graphics/september/3.png"] },
  { id: 12, title: "Tofy Bedsheet Ads", subtitle: "E-commerce listing ads", images: ["/graphics/tofy/1.jpg", "/graphics/tofy/2.jpg", "/graphics/tofy/3.jpg"] },
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, id: number) => {
      if (hoveredId !== id) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [hoveredId],
  );

  return (
    <section className="border-y border-[#f5f0e8]/10 bg-[#0b0b0b] px-5 py-20 sm:px-8" id="graphics">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
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

        <div className="flex flex-col">
          {campaigns.map((campaign, index) => {
            const isHovered = hoveredId === campaign.id;

            return (
              <div
                key={campaign.id}
                className="group relative cursor-default select-none"
                onMouseEnter={() => setHoveredId(campaign.id)}
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

                {/* Thumbnails */}
                {isHovered && (
                  <div
                    className="pointer-events-none absolute z-50"
                    style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%, -50%)" }}
                  >
                    {campaign.images.map((src, i) => {
                      const offset = scatterOffsets[i % scatterOffsets.length];
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
