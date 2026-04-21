export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  year: string;
  upcoming?: boolean;
  services: string[];
  overview: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  gallery: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "pearl-ui-ux-app",
    title: "Pearl UI/UX App",
    description:
      "A refined mobile experience focused on clarity, rhythm, and effortless navigation.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hands holding a smartphone showing a clean app interface",
    year: "2025",
    services: ["Product design", "Design systems", "Prototyping"],
    overview:
      "Pearl is a lifestyle companion app where calm aesthetics meet dependable usability. The goal was to make complex flows feel light, with typography and spacing doing the heavy lifting.",
    challenge:
      "Users needed quick access to multiple modules without feeling overwhelmed. Early concepts skewed decorative; the product needed restraint and hierarchy.",
    solution:
      "We introduced a modular layout grid, consistent 8px rhythm, and a soft neutral palette punctuated by gold accents for primary actions. Motion was kept purposeful—micro-interactions only where they aid comprehension.",
    outcomes: [
      "Higher task completion in usability tests",
      "Reduced visual noise across 12+ core screens",
      "A scalable component library for future features",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
        alt: "Mobile device with UI mockups",
      },
      {
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=80",
        alt: "Design workspace with sketches",
      },
    ],
  },
  {
    slug: "kalab-coffee-branding",
    title: "Kalab Coffee Branding",
    description:
      "Warm identity system, packaging rhythm, and digital touchpoints for an emerging roastery.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Coffee cups on a wooden table",
    year: "2024",
    services: ["Brand strategy", "Visual identity", "Packaging"],
    overview:
      "Kalab needed a presence that felt artisanal yet scalable—something that could live on bags, signage, and social without losing warmth.",
    challenge:
      "The market is crowded with typographic sameness. Kalab wanted distinction without gimmicks, honoring Ethiopian coffee heritage with a contemporary silhouette.",
    solution:
      "A bespoke wordmark, restrained serif pairing, and a duotone palette anchored in deep espresso with gold foil accents. Patterns were derived from roast curves for subtle storytelling.",
    outcomes: [
      "Cohesive brand kit across print and digital",
      "Packaging templates ready for seasonal variants",
      "Guidelines for photography and tone of voice",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
        alt: "Coffee beans close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
        alt: "Cafe interior atmosphere",
      },
    ],
  },
  {
    slug: "digital-menu-system",
    title: "Digital Menu System",
    description:
      "Fast, accessible menus for hospitality—optimized for tablets and low-light venues.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Tablet showing ordering interface",
    year: "2024",
    services: ["UX architecture", "Frontend build", "Content design"],
    overview:
      "A tablet-first menu platform that helps guests browse quickly while giving venues control over pricing, modifiers, and seasonal rotations.",
    challenge:
      "Venues needed updates in minutes, not days. Staff turnover meant the interface had to be obvious on day one.",
    solution:
      "Role-based admin, drag-and-drop sections, and a guest UI with large tap targets, high contrast modes, and skeleton loading for flaky Wi‑Fi.",
    outcomes: [
      "Average order time reduced in pilot locations",
      "Accessibility checks baked into component specs",
      "Modular theming for multi-location brands",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
        alt: "Restaurant table setting",
      },
      {
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
        alt: "Fine dining plating",
      },
    ],
  },
  {
    slug: "driving-school-website",
    title: "Driving School Website",
    description:
      "Trust-led marketing site with clear programs, pricing, and conversion-focused CTAs.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Car on an open road at sunset",
    year: "2023",
    services: ["Web design", "Content strategy", "Development"],
    overview:
      "A driving school needed credibility online—parents and first-time learners comparing options in seconds.",
    challenge:
      "Legacy content was dense and inconsistent. Mobile traffic was majority, but bounce rates were high on program pages.",
    solution:
      "Information architecture rebuilt around learner journeys, with scannable cards, instructor profiles, and transparent pricing modules. Performance budgets kept LCP tight.",
    outcomes: [
      "Clearer inquiry funnels with fewer form fields",
      "Improved mobile readability and tap targets",
      "SEO-friendly structure for local discovery",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1489827904760-d24cdbb54a7d?auto=format&fit=crop&w=1400&q=80",
        alt: "Car dashboard detail",
      },
      {
        src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80",
        alt: "City traffic scene",
      },
    ],
  },
  {
    slug: "construction-management-system",
    title: "Construction Management System",
    description:
      "An upcoming platform that unifies critical workflows and modular components—scheduling, resources, documents, and field updates in one coherent system.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Construction site with steel framework and cranes",
    year: "2026",
    upcoming: true,
    services: ["Product strategy", "UX architecture", "System design"],
    overview:
      "This product is in active design: a construction management system that connects the most important parts of the job—planning, execution, and communication—while treating each subsystem as a composable module teams can adopt incrementally.",
    challenge:
      "Construction teams juggle fragmented tools: spreadsheets, chat threads, and paper trails. The risk is another heavy “do everything” app that nobody adopts.",
    solution:
      "A modular architecture with clear ownership per domain (e.g. schedules, RFIs, assets, crews) and shared primitives—permissions, notifications, audit trails, and dashboards—so teams can integrate what they need first, then expand without rework.",
    outcomes: [
      "Composable modules for core construction workflows",
      "Shared UI patterns for speed and training on-site",
      "Roadmap for phased rollout aligned to real job sites",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
        alt: "Architect reviewing plans on site",
      },
      {
        src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
        alt: "Engineering and safety equipment on construction site",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
