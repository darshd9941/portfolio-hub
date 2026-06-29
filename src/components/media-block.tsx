import type { PortfolioMedia } from "@/data/portfolio";
import Image from "next/image";

export function MediaBlock({ media, controls = false }: { media: PortfolioMedia; controls?: boolean }) {
  if (media.type === "video") {
    return (
      <video autoPlay={!controls} controls={controls} muted={!controls} loop={!controls} playsInline preload="metadata" poster={media.poster} aria-label={media.alt}>
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }
  return <span className="image-frame"><Image src={media.src} alt={media.alt} fill sizes="(max-width: 900px) 100vw, 50vw" /></span>;
}
