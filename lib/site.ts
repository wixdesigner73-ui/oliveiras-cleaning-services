// Single source of truth for business facts and service copy.
// Contact details come from the client brief. Services are the four categories
// proposed in the brief and are NOT yet verified against the Yelp profile
// (Yelp blocked automated access) — confirm or edit before launch.

export const BUSINESS = {
  name: "Oliveira's Cleaning Services",
  contact: "Viviana Supple",
  phone: "(786) 449-5993",
  phoneHref: "tel:+17864495993",
  email: "suppleviviana79@gmail.com",
  location: "Kendall, Miami, Florida",
  yelp: "https://www.yelp.com/biz/oliveiras-cleaning-services-kendall?osq=Cleaning+Service",
};

export type SceneKey = "living" | "kitchen" | "empty" | "office" | "bathroom" | "bedroom";

export type Service = {
  id: string; // anchor id on the Services page + ?service= value on Contact
  num: string;
  label: string; // short selector label
  title: string; // full title
  scene: SceneKey;
  eyebrow: string;
  headline: string[]; // lines of the hero headline
  blurb: string;
  highlights: [string, string, string];
  cta: string;
  // theme tokens used by the hero + service sections
  bg1: string;
  bg2: string;
  accent: string;
  ink: string;
  inkSoft: string;
  dark: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "residential-cleaning",
    num: "01",
    label: "Residential",
    title: "Residential Cleaning",
    scene: "living",
    eyebrow: "Residential Cleaning",
    headline: ["A Beautiful Home", "Begins With a", "Perfect Clean."],
    blurb:
      "Living rooms, bedrooms, kitchens and bathrooms, cared for with attention to detail so your home feels calm, fresh and welcoming.",
    highlights: ["Living areas & bedrooms", "Kitchens & bathrooms", "Shaped around your home"],
    cta: "Get a Free Quote",
    bg1: "#F4ECDD",
    bg2: "#E2CFA9",
    accent: "#9C7B3F",
    ink: "#1F2A25",
    inkSoft: "rgba(31,42,37,.68)",
    dark: false,
  },
  {
    id: "deep-cleaning",
    num: "02",
    label: "Deep Clean",
    title: "Deep Cleaning",
    scene: "kitchen",
    eyebrow: "Deep Cleaning",
    headline: ["A Deeper Clean.", "A Remarkable", "Difference."],
    blurb:
      "A more thorough, detail-focused clean for the places that need extra attention — surfaces, fixtures, corners and built-up grime.",
    highlights: ["Kitchen & bathroom detail", "Built-up marks & grime", "Surfaces, fixtures, corners"],
    cta: "Request a Deep Clean Quote",
    bg1: "#0F2D27",
    bg2: "#1B4A3E",
    accent: "#CBB38B",
    ink: "#F8F5EE",
    inkSoft: "rgba(248,245,238,.72)",
    dark: true,
  },
  {
    id: "move-in-move-out",
    num: "03",
    label: "Move-In / Out",
    title: "Move-In / Move-Out Cleaning",
    scene: "empty",
    eyebrow: "Move-In / Move-Out Cleaning",
    headline: ["A Fresh Beginning", "Deserves a", "Beautiful Space."],
    blurb:
      "Whether you are arriving or leaving, we help an empty space feel clean, bright and ready for what comes next.",
    highlights: ["Empty homes & apartments", "Floors, windows & surfaces", "Ready for the next chapter"],
    cta: "Plan Your Move-Out Clean",
    bg1: "#C9D3C2",
    bg2: "#DCD2BF",
    accent: "#5F6F56",
    ink: "#1E2B24",
    inkSoft: "rgba(30,43,36,.7)",
    dark: false,
  },
  {
    id: "office-cleaning",
    num: "04",
    label: "Office",
    title: "Office Cleaning",
    scene: "office",
    eyebrow: "Office Cleaning",
    headline: ["Exceptional Spaces.", "Lasting", "Impressions."],
    blurb:
      "Polished workspaces that welcome clients and colleagues — glass, desks and common areas kept clear and well maintained.",
    highlights: ["Desks & workstations", "Glass & shared areas", "A polished first impression"],
    cta: "Request an Office Quote",
    bg1: "#1C2321",
    bg2: "#2B4744",
    accent: "#A9C4BC",
    ink: "#F4F1EA",
    inkSoft: "rgba(244,241,234,.72)",
    dark: true,
  },
];

export const ROOMS: {
  id: string;
  scene: SceneKey;
  label: string;
  title: string;
  blurb: string;
  focus: string[];
  bg1: string;
  bg2: string;
  accent: string;
  dark: boolean;
}[] = [
  {
    id: "living",
    scene: "living",
    label: "Living Room",
    title: "The living room",
    blurb: "The space where everyone gathers, kept comfortable and inviting.",
    focus: ["Sofas, tables & surfaces", "Floors & rugs", "Windows & light fixtures"],
    bg1: "#F1E7D5",
    bg2: "#DCC79F",
    accent: "#8F6F34",
    dark: false,
  },
  {
    id: "kitchen",
    scene: "kitchen",
    label: "Kitchen",
    title: "The kitchen",
    blurb: "Where a home works hardest, cleaned with care and attention.",
    focus: ["Countertops & backsplash", "Appliance exteriors", "Sinks, fixtures & floors"],
    bg1: "#0F2D27",
    bg2: "#1D4B3F",
    accent: "#CBB38B",
    dark: true,
  },
  {
    id: "bathroom",
    scene: "bathroom",
    label: "Bathroom",
    title: "The bathroom",
    blurb: "A clean, fresh space that feels like a quiet retreat.",
    focus: ["Tile, tub & shower", "Mirrors & vanities", "Fixtures & floors"],
    bg1: "#D7DFD6",
    bg2: "#B6C5B6",
    accent: "#41594C",
    dark: false,
  },
  {
    id: "bedroom",
    scene: "bedroom",
    label: "Bedroom",
    title: "The bedroom",
    blurb: "Calm, restful rooms that are a pleasure to come home to.",
    focus: ["Surfaces & furniture", "Floors & corners", "Windows & fixtures"],
    bg1: "#E9DFD2",
    bg2: "#CDBBA3",
    accent: "#7B6445",
    dark: false,
  },
  {
    id: "office",
    scene: "office",
    label: "Office",
    title: "The office",
    blurb: "Workspaces that look composed and professional every day.",
    focus: ["Desks & workstations", "Glass & partitions", "Shared areas & floors"],
    bg1: "#1C2321",
    bg2: "#2B4744",
    accent: "#A9C4BC",
    dark: true,
  },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/services/", label: "Services" },
  { href: "/contact/", label: "Contact" },
];

// Genuine customer reviews ONLY. Leave empty until real reviews are copied
// from the Yelp profile (name as shown on Yelp, rating, text, date). While
// empty, the testimonials section is not rendered.
export type Review = { name: string; rating: number; text: string; date?: string; source?: string };
export const REVIEWS: Review[] = [];
