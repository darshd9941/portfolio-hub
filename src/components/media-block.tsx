import type { PortfolioMedia } from "@/data/portfolio";
import Image from "next/image";
import { LazyVideo } from "./lazy-video";

export function MediaBlock({ media, controls = false }: { media: PortfolioMedia; controls?: boolean }) {
  if (media.type === "video") {
    return (
      <LazyVideo src={media.src} poster={media.poster} label={media.alt} controls={controls} />
    );
  }
  return <span className="image-frame"><Image src={media.src} alt={media.alt} fill sizes="(max-width: 900px) 100vw, 50vw" /></span>;
}
