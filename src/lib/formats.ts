import { sizeOf } from "@/data/image-sizes";

const RATIOS: [string, number][] = [
  ["9:16", 9 / 16],
  ["4:5", 4 / 5],
  ["1:1", 1],
  ["3:2", 3 / 2],
  ["16:9", 16 / 9],
  ["1.91:1", 1.91],
];

/** Closest social aspect-ratio name for a width × height, e.g. 1080×1350 → "4:5". */
export function ratioName(width: number, height: number) {
  const r = width / height;
  return RATIOS.reduce((best, cur) => (Math.abs(cur[1] - r) < Math.abs(best[1] - r) ? cur : best))[0];
}

/** Aspect-ratio name for an image in public/graphics. */
export function ratioOf(src: string) {
  const [w, h] = sizeOf(src);
  return ratioName(w, h);
}

/** "graphics/winter/2.webp" → "winter_02.webp" — how a file would read in a project bin. */
export function binName(src: string) {
  const parts = src.split("/");
  const file = parts.pop() ?? "";
  const folder = parts.pop() ?? "";
  const [stem, ext] = file.split(".");
  return `${folder}_${stem.padStart(2, "0")}.${ext}`;
}
