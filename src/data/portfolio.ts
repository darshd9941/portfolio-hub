export type PortfolioMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

export type Track = "motion" | "campaign" | "systems";

export type PortfolioProject = {
  slug: string;
  /** Short clip name used on the timeline, e.g. "Curtain Theory". */
  name: string;
  /** Which timeline track the project sits on. */
  track: Track;
  client: string;
  /** Delivery format shown on badges, e.g. "9:16 · reel". */
  format: string;
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  hero: PortfolioMedia;
  media: PortfolioMedia[];
  services: string[];
  challenge: string;
  approach: string;
  contribution: string;
  accent: "orange" | "lime" | "blue" | "pink";
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "rakhi-gifting-system",
    name: "Rakhi gifting system",
    track: "campaign",
    client: "Urban Space",
    format: "1:1 · 6 frames",
    title: "A Rakhi campaign built like a small world",
    eyebrow: "Campaign system / Urban Space",
    year: "2026",
    summary:
      "A six-part gifting story that turns a bedsheet collection into a warm, useful Rakhi present instead of another product tile shouting into the void.",
    hero: {
      type: "image",
      src: "/portfolio/rakhi/02.png",
      alt: "Urban Space Rakhi gifting campaign bedroom visual",
    },
    media: [
      { type: "image", src: "/portfolio/rakhi/01.png", alt: "Rakhi gifting campaign opening frame" },
      { type: "image", src: "/portfolio/rakhi/03.png", alt: "Rakhi gifting campaign product frame" },
      { type: "image", src: "/portfolio/rakhi/04.png", alt: "Rakhi gifting lifestyle frame" },
      { type: "image", src: "/portfolio/rakhi/05.png", alt: "Rakhi delivery campaign frame" },
      { type: "image", src: "/portfolio/rakhi/06.png", alt: "Rakhi gifting campaign closing frame" },
    ],
    services: ["Creative direction", "Campaign design", "AI image production", "Art direction"],
    challenge:
      "Make a familiar home-textile product feel emotionally relevant to Rakhi while keeping the product, gifting box and room styling believable across every frame.",
    approach:
      "I treated the set as one visual narrative: warm editorial light, a restrained cream-and-maroon system, recurring gift-box cues and copy that progresses from problem to payoff.",
    contribution:
      "Concept development, image direction, product-fidelity checks, layout system, copy hierarchy and final multi-format campaign assembly.",
    accent: "orange",
  },
  {
    slug: "dreamy-aesthetic-reel",
    name: "Dreamy aesthetic",
    track: "motion",
    client: "Urban Space",
    format: "9:16 · 00:26",
    title: "A dreamy edit with an actual pulse",
    eyebrow: "Motion edit / Social campaign",
    year: "2026",
    summary:
      "A vertical reel combining generated scenes, floral transitions and a soft editorial rhythm for a home-decor audience.",
    hero: {
      type: "video",
      src: "/portfolio/video/dreamy-aesthetic.mp4",
      poster: "/portfolio/still/dreamy.jpg",
      alt: "Dreamy aesthetic Urban Space vertical reel",
    },
    media: [
      {
        type: "video",
        src: "/portfolio/video/dreamy-aesthetic.mp4",
        poster: "/portfolio/still/dreamy.jpg",
        alt: "Dreamy aesthetic reel playback",
      },
    ],
    services: ["Premiere Pro", "Edit direction", "AI video", "Sound-led pacing"],
    challenge:
      "Turn a collection of visually different shots into one coherent, save-worthy reel without letting the AI seams become the main character.",
    approach:
      "The edit uses repeated floral shapes, soft match cuts and controlled pacing to make separate assets feel like one continuous dream rather than a folder being played in alphabetical order.",
    contribution:
      "Concept, shot selection, generation direction, edit, pacing, transition design and delivery variants.",
    accent: "pink",
  },
  {
    slug: "curtain-theory",
    name: "Curtain Theory",
    track: "motion",
    client: "Urban Space",
    format: "9:16 · reel",
    title: "One curtain. One room. One suspiciously strong vibe.",
    eyebrow: "Social video / Curtain Theory",
    year: "2026",
    summary:
      "A creator-style vertical ad that turns a product explanation into a playful point of view instead of a fabric specification lecture.",
    hero: {
      type: "video",
      src: "/portfolio/video/curtain-theory.mp4",
      poster: "/portfolio/still/curtain.jpg",
      alt: "Curtain Theory social video",
    },
    media: [
      {
        type: "video",
        src: "/portfolio/video/curtain-theory.mp4",
        poster: "/portfolio/still/curtain.jpg",
        alt: "Curtain Theory campaign video playback",
      },
      { type: "image", src: "/graphics/curtains/2.webp", alt: "Curtain campaign still" },
      { type: "image", src: "/graphics/curtains/3.webp", alt: "Curtain campaign product still" },
    ],
    services: ["Premiere Pro", "Concept", "Creator-style edit", "Performance creative"],
    challenge:
      "Explain why a curtain changes a room while keeping the format native to short-form social rather than producing a glossy commercial nobody believes.",
    approach:
      "The video is structured around a sharp POV hook, human delivery, product proof and quick visual escalation. It behaves like content first and an ad second.",
    contribution:
      "Hook development, visual direction, AI-assisted footage, edit structure and final social delivery.",
    accent: "blue",
  },
  {
    slug: "payday-offer-film",
    name: "Payday",
    track: "motion",
    client: "Urban Space",
    format: "4:5 · campaign film",
    title: "Making an offer feel larger than a red price badge",
    eyebrow: "Motion campaign / Payday",
    year: "2026",
    summary:
      "A compact campaign film built from product imagery, expressive reactions and offer reveals for a multi-product payday promotion.",
    hero: {
      type: "video",
      src: "/portfolio/video/payday.mp4",
      poster: "/portfolio/still/payday.jpg",
      alt: "Urban Space payday promotional film",
    },
    media: [
      {
        type: "video",
        src: "/portfolio/video/payday.mp4",
        poster: "/portfolio/still/payday.jpg",
        alt: "Payday campaign film playback",
      },
      { type: "image", src: "/graphics/payday/2.webp", alt: "Payday campaign square creative" },
      { type: "image", src: "/graphics/payday/4.webp", alt: "Payday campaign offer creative" },
    ],
    services: ["Premiere Pro", "Motion design", "Campaign adaptation", "Performance creative"],
    challenge:
      "Communicate several offers quickly without turning the film into a supermarket loudspeaker with easing curves.",
    approach:
      "The sequence builds curiosity before revealing the promotion, using reaction, scale changes and product rhythm to make the offer feel like an event.",
    contribution:
      "Edit, motion timing, offer hierarchy, asset preparation and campaign-format adaptation.",
    accent: "lime",
  },
  {
    slug: "creative-automation",
    name: "Creative tools",
    track: "systems",
    client: "Independent",
    format: "Code · ongoing",
    title: "Tools for the part nobody puts in the moodboard",
    eyebrow: "Creative systems / Independent builds",
    year: "Ongoing",
    summary:
      "Small tools for captions, rough cuts, image QA, brand consistency and the repetitive production work that quietly eats an afternoon.",
    hero: {
      type: "image",
      src: "/graphics-03.jpg",
      alt: "Creative automation tools collage",
    },
    media: [
      { type: "image", src: "/graphics-01.jpg", alt: "Creative systems interface study" },
      { type: "image", src: "/graphics-02.jpg", alt: "Creative workflow interface study" },
      { type: "image", src: "/graphics-03.jpg", alt: "Creative automation interface study" },
    ],
    services: ["Workflow design", "Prototyping", "Adobe automation", "AI tooling"],
    challenge:
      "Creative work loses energy when the same exports, checks, captions and handoffs must be rebuilt for every project.",
    approach:
      "I prototype focused tools around real production pain: smaller interfaces, explicit rules and outputs that fit the software people already use.",
    contribution:
      "Product thinking, interface design, prompt systems, code prototypes and relentless hostility toward avoidable repetition.",
    accent: "orange",
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
