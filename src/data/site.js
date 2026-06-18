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

export const commandTicker = {
  label: "Incoming Transmission",
  phrase:
    "SYSTEMS NOMINAL · PRIVATE ROUTES SECURED · BACKUPS VERIFIED · C-7-4 PROTOCOL DROID ONLINE · HOME ASSISTANT PRIVATE ACTIVE · THE ROCK STANDING BY",
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
    title: "C-7-4 Protocol Droid",
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
  {
    label: "Route Matrix",
    value: "View planned domains and access levels",
    href: "#routes",
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
    method: "Netlify",
  },
  {
    domain: "home-tracker.jorgesotocoder.com",
    service: "Home Tracker Frontend",
    access: "Public",
    status: "Live",
    method: "Netlify",
  },
  {
    domain: "api.home-tracker.jorgesotocoder.com",
    service: "Home Tracker API",
    access: "Public API",
    status: "Live",
    method: "Reverse Proxy",
  },
  {
    domain: "c74.jorgesotocoder.com",
    service: "C-7-4 Protocol Droid",
    access: "Restricted",
    status: "Private Active",
    method: "Tailscale-only Open WebUI",
  },
  {
    domain: "home-assistant.jorgesotocoder.com",
    service: "Home Assistant",
    access: "Restricted",
    status: "Private Active",
    method: "Tailscale-only Home Assistant",
  },
  {
    domain: "status.jorgesotocoder.com",
    service: "Status / Monitoring",
    access: "Restricted",
    status: "Private Active",
    method: "Tailscale-only status page",
  },
  {
    domain: "media.jorgesotocoder.com",
    service: "Media Services",
    access: "Restricted",
    status: "Future",
    method: "Access Gate Required",
  },
  {
    domain: "Unraid / pgAdmin / PostgreSQL",
    service: "Admin + Database Tools",
    access: "Internal",
    status: "Never Public",
    method: "Internal Only",
  },
];

export const restrictedChecklist = [
  "Access gate selected before activation",
  "HTTPS confirmed on the route",
  "Private service tested from approved devices",
  "Admin tools remain internal-only",
  "Public portal link enabled only after validation",
];

export const securityDirectives = [
  {
    code: "PUBLIC",
    title: "Public routes",
    detail: "Open project and application links that are safe for general access.",
  },
  {
    code: "RESTRICTED",
    title: "Protected routes",
    detail: "Private systems require approved access control. Tailscale-only services remain off the public portal.",
  },
  {
    code: "INTERNAL",
    title: "Internal-only systems",
    detail: "Unraid, pgAdmin, PostgreSQL, and admin tools remain off the public portal.",
  },
];

export const monitoringCoverage = [
  {
    label: "Public Services",
    detail: "Command Portal and Home Tracker are monitored for availability.",
  },
  {
    label: "Protected API",
    detail: "Home Tracker API is monitored from public and internal paths.",
  },
  {
    label: "Private Infrastructure",
    detail: "TheRock, Uptime Kuma, C-7-4 Protocol Droid, and Home Assistant are monitored through private access.",
  },
  {
    label: "Alerts",
    detail: "Email notifications are enabled for service failures.",
  },
];

export const activationQueue = [
  {
    order: "01",
    title: "Status / Monitoring",
    route: "Private Tailscale status page",
    priority: "Active",
    detail: "Uptime Kuma is online through Tailscale with a private read-only status page and email alerts enabled.",
  },
  {
    order: "02",
    title: "C-7-4 Protocol Droid",
    route: "Private Tailscale assistant interface",
    priority: "Active",
    detail: "Open WebUI and Ollama are online through Tailscale, monitored by Uptime Kuma, and not publicly exposed.",
  },
  {
    order: "03",
    title: "Home Assistant",
    route: "Private Tailscale smart home access",
    priority: "Active",
    detail: "Home Assistant OS is online through Tailscale, monitored by Uptime Kuma, and not publicly exposed.",
  },
  {
    order: "04",
    title: "Media Services",
    route: "media.jorgesotocoder.com",
    priority: "Future",
    detail: "Keep queued until the private routing model is proven stable.",
  },
];

export const backupCoverage = [
  {
    label: "Home Assistant",
    detail: "Automatic encrypted backups are stored outside the Home Assistant VM.",
  },
  {
    label: "Recovery Kit",
    detail: "The emergency recovery kit is saved outside Home Assistant.",
  },
  {
    label: "Private Storage",
    detail: "Primary backups are written to protected private storage.",
  },
  {
    label: "Restore Runbooks",
    detail: "Multiple recovery procedures are documented for core restore operations.",
  },
];