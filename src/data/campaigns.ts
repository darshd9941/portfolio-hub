export type Campaign = {
  slug: string;
  title: string;
  subtitle: string;
  images: string[];
  category: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
};

export const campaigns: Campaign[] = [
  {
    slug: "bedsheets",
    title: "Urbanspace Bedsheet Collection",
    subtitle: "Product catalog ads for premium bedsheets",
    category: "Product Ads",
    images: [
      "/graphics/bedsheets/1.webp",
      "/graphics/bedsheets/2.webp",
      "/graphics/bedsheets/3.webp",
      "/graphics/bedsheets/4.webp",
    ],
    problem:
      "Urbanspace needed to showcase their premium bedsheet range to a wider audience online. Existing product photos lacked the visual punch needed to stand out in crowded e-commerce feeds and social media timelines.",
    solution:
      "We designed a series of clean, lifestyle-driven product ads that highlight texture, color, and comfort. Each creative was optimized for both Instagram feeds and Google Display Network placements, with consistent branding across all formats.",
    impact:
      "The campaign drove a significant uplift in click-through rates across Meta and Google platforms, helping Urbanspace establish a recognizable visual identity for their bedsheet line.",
    tags: ["Product Photography", "E-commerce", "Meta Ads", "Google Display"],
  },
  {
    slug: "curtains",
    title: "Embroidered Curtain Series",
    subtitle: "Digital campaign for luxury curtain line",
    category: "Digital Campaign",
    images: [
      "/graphics/curtains/1.webp",
      "/graphics/curtains/2.webp",
      "/graphics/curtains/3.webp",
    ],
    problem:
      "Urbanspace's embroidered curtain range needed a premium digital presence that matched the craftsmanship of the product. Previous creatives didn't convey the luxury feel customers experience in-store.",
    solution:
      "We shot and designed a series of close-up detail ads that emphasize the embroidery work and fabric quality. The warm, editorial-style lighting creates an aspirational feel while keeping the product front and center.",
    impact:
      "The curtain campaign became one of Urbanspace's highest-performing ad sets, with engagement rates well above industry benchmarks for home decor brands.",
    tags: ["Luxury Branding", "Product Photography", "Social Media Ads"],
  },
  {
    slug: "winter",
    title: "Winter Comforter Campaign",
    subtitle: "Seasonal ads for comforter range",
    category: "Seasonal Campaign",
    images: [
      "/graphics/winter/1.webp",
      "/graphics/winter/2.webp",
      "/graphics/winter/3.webp",
      "/graphics/winter/4.webp",
    ],
    problem:
      "Urbanspace needed to capitalize on the winter season demand for comforters and blankets. The challenge was creating urgency and warmth in the visuals during the peak buying window.",
    solution:
      "We designed a cozy, winter-themed ad series with rich textures and warm color palettes. Each creative focused on the comfort and warmth angle, with clear pricing and offer callouts to drive conversions.",
    impact:
      "The winter campaign helped Urbanspace capture seasonal demand early, with the comforter line becoming a top seller during the November-February period.",
    tags: ["Seasonal Marketing", "Conversion Ads", "Meta Ads"],
  },
  {
    slug: "fresh-bedsheets",
    title: "Fresh Bedsheet Launch",
    subtitle: "January 2025 new collection launch",
    category: "Product Launch",
    images: [
      "/graphics/fresh-bedsheets/1.webp",
      "/graphics/fresh-bedsheets/2.webp",
      "/graphics/fresh-bedsheets/3.webp",
      "/graphics/fresh-bedsheets/4.webp",
      "/graphics/fresh-bedsheets/5.webp",
    ],
    problem:
      "Launching a new bedsheet collection in January meant competing with post-holiday sale fatigue. Urbanspace needed fresh, clean creatives that felt distinct from the winter campaign.",
    solution:
      "We designed a 'fresh start' themed campaign with bright, airy visuals that contrast the heavy winter aesthetic. The clean layout and vibrant colors signaled a new season and new collection.",
    impact:
      "The launch campaign successfully re-engaged dormant customers and drove strong first-week sales for the new collection.",
    tags: ["Product Launch", "Creative Direction", "Campaign Design"],
  },
  {
    slug: "diwali",
    title: "Diwali Special Collection",
    subtitle: "Festive season campaign for home decor",
    category: "Festival Campaign",
    images: [
      "/graphics/diwali/1.webp",
      "/graphics/diwali/2.webp",
      "/graphics/diwali/3.webp",
      "/graphics/diwali/4.webp",
    ],
    problem:
      "Diwali is the biggest home decor buying season in India. Urbanspace needed festive creatives that felt celebratory without being generic — standing out among hundreds of competing Diwali sale ads.",
    solution:
      "We designed a 'Dil Wali Diwali' (Diwali from the heart) themed campaign with traditional motifs blended into modern layouts. Multiple format variations ensured the campaign worked across Instagram, Facebook, and WhatsApp.",
    impact:
      "The Diwali campaign became Urbanspace's most-shared organic content, with customers using the creatives as festive greetings — extending reach far beyond paid media.",
    tags: ["Festival Marketing", "Multi-format Design", "WhatsApp Ads"],
  },
  {
    slug: "payday",
    title: "Payday Sale Campaign",
    subtitle: "Promotional sale creatives across product lines",
    category: "Sale Campaign",
    images: [
      "/graphics/payday/1.webp",
      "/graphics/payday/2.webp",
      "/graphics/payday/3.webp",
      "/graphics/payday/4.webp",
      "/graphics/payday/5.webp",
    ],
    problem:
      "Urbanspace runs monthly payday sales but the creatives were becoming repetitive. They needed fresh designs each month that still maintained brand recognition while driving urgency.",
    solution:
      "We created a modular design system for sale ads — consistent typography and layout with rotating hero products and color accents. Each month feels new but unmistakably Urbanspace.",
    impact:
      "The payday sale became a reliable revenue driver, with the consistent design system reducing creative production time by 60% while maintaining strong conversion rates.",
    tags: ["Sale Campaigns", "Design Systems", "Conversion Optimization"],
  },
  {
    slug: "blinds",
    title: "Window Blinds Launch",
    subtitle: "Product launch campaign for blinds & shades",
    category: "Product Launch",
    images: [
      "/graphics/blinds/1.webp",
      "/graphics/blinds/2.webp",
      "/graphics/blinds/3.webp",
    ],
    problem:
      "Urbanspace was expanding into window blinds — a new product category for them. They needed launch creatives that established credibility in a space dominated by specialized brands.",
    solution:
      "We designed clean, modern product ads that position Urbanspace blinds as a premium yet accessible choice. The focus on light control and room ambiance resonates with the target audience.",
    impact:
      "The blinds launch campaign successfully introduced the new product line, generating strong initial sales and establishing Urbanspace as a credible player in the window treatments category.",
    tags: ["New Category Launch", "Product Design", "Brand Extension"],
  },
  {
    slug: "sheer-curtains",
    title: "Sheer Digital Printed Curtains",
    subtitle: "Product showcase for printed sheer curtain line",
    category: "Product Showcase",
    images: [
      "/graphics/sheer-curtains/1.webp",
      "/graphics/sheer-curtains/2.webp",
      "/graphics/sheer-curtains/3.webp",
      "/graphics/sheer-curtains/4.webp",
    ],
    problem:
      "Sheer curtains are difficult to photograph well — the translucency and print details often get lost in digital ads. Urbanspace needed creatives that capture the delicate beauty of the product.",
    solution:
      "We used natural lighting and close-up photography to showcase the print details and light-filtering properties. The lifestyle context helps customers visualize the product in their own homes.",
    impact:
      "The sheer curtain campaign achieved the highest save rate of any Urbanspace Instagram ad, indicating strong purchase intent from the audience.",
    tags: ["Product Photography", "Instagram Ads", "Home Decor"],
  },
  {
    slug: "fitted-bedsheets",
    title: "Fitted Bedsheet Branding",
    subtitle: "Product branding for fitted sheet line",
    category: "Branding",
    images: [
      "/graphics/fitted-bedsheets/1.webp",
      "/graphics/fitted-bedsheets/2.webp",
      "/graphics/fitted-bedsheets/3.webp",
    ],
    problem:
      "Fitted bedsheets are a niche product that most customers don't actively search for. Urbanspace needed to educate the market while building brand recognition for their fitted sheet range.",
    solution:
      "We designed a branding-focused campaign that highlights the convenience and quality of fitted sheets. Clean product shots with clear benefit callouts help customers understand the value proposition.",
    impact:
      "The fitted bedsheet campaign established a distinct visual identity for the product line, contributing to steady organic growth in the category.",
    tags: ["Product Branding", "Education Marketing", "Niche Products"],
  },
  {
    slug: "gold-foil-curtains",
    title: "Gold Foil Digital Curtain Series",
    subtitle: "Premium digital and gold foil printed curtains",
    category: "Premium Line",
    images: [
      "/graphics/gold-foil-curtains/1.webp",
      "/graphics/gold-foil-curtains/2.webp",
      "/graphics/gold-foil-curtains/3.webp",
    ],
    problem:
      "Urbanspace's gold foil curtain line is their most premium offering. The marketing needed to convey luxury and exclusivity while remaining accessible to the target demographic.",
    solution:
      "We designed a premium-feel campaign with rich gold accents and sophisticated layouts. The close-up shots highlight the gold foil detail and craftsmanship that justifies the premium price point.",
    impact:
      "The gold foil campaign attracted a higher-value customer segment, with average order values significantly above the brand's standard curtain line.",
    tags: ["Premium Marketing", "Luxury Positioning", "High-AOV Products"],
  },
  {
    slug: "story-ads",
    title: "Instagram Story Ads",
    subtitle: "Vertical story-format ad creatives",
    category: "Social Media",
    images: [
      "/graphics/story-ads/1.webp",
      "/graphics/story-ads/2.webp",
      "/graphics/story-ads/3.webp",
    ],
    problem:
      "Urbanspace's horizontal and square ad creatives didn't translate well to Instagram Stories format. They needed vertical-native designs that feel organic in the Stories feed.",
    solution:
      "We designed a series of vertical-first story ads with bold text overlays, swipe-up CTAs, and product showcases optimized for the 9:16 format. The designs feel native to the Stories environment.",
    impact:
      "Story ads became one of Urbanspace's top-performing placements, with completion rates significantly higher than repurposed feed creatives.",
    tags: ["Instagram Stories", "Vertical Design", "Social Media"],
  },
  {
    slug: "september",
    title: "September 2025 Collection",
    subtitle: "Monthly product drop creatives",
    category: "Monthly Drop",
    images: [
      "/graphics/september/1.webp",
      "/graphics/september/2.webp",
      "/graphics/september/3.webp",
    ],
    problem:
      "Urbanspace needed a fresh set of creatives for their September product drop that would stand out from the ongoing festive season noise in the market.",
    solution:
      "We designed a clean, minimal campaign that lets the products speak for themselves. The understated design approach differentiated Urbanspace from the loud festive creatives flooding the market.",
    impact:
      "The September drop campaign maintained strong engagement despite competing with larger festive campaigns, proving the power of differentiated creative direction.",
    tags: ["Monthly Campaign", "Minimal Design", "Product Focus"],
  },
  {
    slug: "tofy",
    title: "Tofy Bedsheet Ads",
    subtitle: "E-commerce product listing ads",
    category: "E-commerce",
    images: [
      "/graphics/tofy/1.webp",
      "/graphics/tofy/2.webp",
      "/graphics/tofy/3.webp",
    ],
    problem:
      "Urbanspace needed optimized creatives for their Tofy bedsheet line that work across multiple e-commerce platforms — each with different size requirements and design guidelines.",
    solution:
      "We designed platform-specific ad creatives that maintain brand consistency while meeting each platform's technical requirements. Clean product shots with clear pricing drive direct conversions.",
    impact:
      "The Tofy campaign achieved strong ROAS across Flipkart and Amazon advertising, helping Urbanspace establish a solid e-commerce presence beyond their own website.",
    tags: ["E-commerce", "Marketplace Ads", "Multi-platform"],
  },
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}
