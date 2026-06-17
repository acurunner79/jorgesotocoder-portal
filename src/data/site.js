export const profile = {
  name: "Jorge Soto",
  title: "Developer · Homelab Builder · Automation Tinkerer",
  summary:
    "I build practical tools, self-hosted systems, smart home dashboards, and personal applications that connect software with real-world workflows.",
  highlights: [
    "React / Vite applications",
    "Self-hosted infrastructure",
    "Home automation systems",
    "PostgreSQL-backed apps",
    "AI assistant experiments",
  ],
};

export const featuredProjects = [
  {
    title: "Home Tracker",
    status: "Live",
    description:
      "A home project tracking app for organizing materials, images, progress stages, and project details.",
    link: "https://home-tracker.jorgesotocoder.com",
    linkLabel: "Open Home Tracker",
  },
  {
    title: "Command Portal",
    status: "Live",
    description:
      "The central landing page for jorgesotocoder.com, serving as a launch point for public projects and applications.",
    link: "https://jorgesotocoder.com",
    linkLabel: "View Portal",
  },
  {
    title: "C-7-4 Core",
    status: "In Development",
    description:
      "A private assistant project focused on local AI, automation, memory, voice interaction, and homelab integration.",
    link: "#apps",
    linkLabel: "View App Directory",
  },
  {
    title: "Homelab Systems",
    status: "Private",
    description:
      "Self-hosted infrastructure powering databases, applications, smart home services, media tools, and automation.",
    link: "#apps",
    linkLabel: "View Systems",
  },
];

export const contactLinks = [
  {
    label: "GitHub",
    value: "View repositories and code",
    href: "https://github.com/acurunner79",
    external: true,
  },
  {
    label: "Projects",
    value: "Jump to featured work",
    href: "#projects",
    external: false,
  },
  {
    label: "Applications",
    value: "Open the app directory",
    href: "#apps",
    external: false,
  },
];

export const accessLevels = [
  {
    label: "Public",
    description: "Open project or application link.",
    tone: "public",
  },
  {
    label: "Restricted",
    description: "Protected system. Access requires approved private routing.",
    tone: "restricted",
  },
  {
    label: "Internal",
    description: "Homelab-only service. Not exposed through the public portal.",
    tone: "internal",
  },
];

export const routeMatrix = [
  {
    domain: "jorgesotocoder.com",
    service: "Command Portal",
    access: "Public",
    status: "Live",
  },
  {
    domain: "home-tracker.jorgesotocoder.com",
    service: "Home Tracker Frontend",
    access: "Public",
    status: "Live",
  },
  {
    domain: "api.home-tracker.jorgesotocoder.com",
    service: "Home Tracker API",
    access: "Public API",
    status: "Live",
  },
  {
    domain: "c74.jorgesotocoder.com",
    service: "C-7-4 Assistant Interface",
    access: "Restricted",
    status: "Planned",
  },
  {
    domain: "ha.jorgesotocoder.com",
    service: "Home Assistant",
    access: "Restricted",
    status: "Planned",
  },
  {
    domain: "status.jorgesotocoder.com",
    service: "Status / Monitoring",
    access: "Restricted",
    status: "Planned",
  },
  {
    domain: "media.jorgesotocoder.com",
    service: "Media Services",
    access: "Restricted",
    status: "Future",
  },
  {
    domain: "Unraid / pgAdmin / PostgreSQL",
    service: "Admin + Database Tools",
    access: "Internal",
    status: "Never Public",
  },
];