export const site = {
  name: "DetectVision",
  tagline: "A Real-Time AI Operating System for Businesses",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://detectvision.ai",
  description:
    "DetectVision helps business owners make smarter decisions in real time, bringing everything that keeps your business running, from day-to-day operations to smart cameras and delivery robots, into one private, secure AI system.",
  email: "info@renrobots.com",
  phone: "+1 (778) 654-6374",
  phoneHref: "tel:+17786546374",
  offices: [
    { city: "Vancouver", address: "5220 - 4000 No. 3 Road, Richmond, BC V6X 0J8" },
    { city: "Toronto", address: "340 Ferrier St #1, Markham, ON L3R 2Z5" },
  ],
};

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About us" },
] as const;
