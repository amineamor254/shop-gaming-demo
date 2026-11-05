export const SITE = {
  name: "Your Brand",
  logoText: "BRAND",
  tagline: "Store",
  description: "Discover custom gaming PCs built for performance, reliability, and play.",
  footerDescription:
    "Custom gaming PCs built for performance and tested for victory. Top-tier FPS, zero lag, zero compromise.",
  titleTemplate: "Your Brand | Gaming PC Store",
  contact: {
    email: "hello@example.com",
    phone: "+1 555 010 0100",
    address: "123 Main Street, Your City, Country",
    country: "Your Country",
  },
  hours: [
    { days: "Mon - Fri", time: "09:00 - 18:00" },
    { days: "Saturday", time: "10:00 - 16:00" },
    { days: "Sunday", time: "Closed" },
  ],
  socialLinks: {
    facebook: { label: "Facebook", href: "" },
    instagram: { label: "Instagram", href: "" },
    x: { label: "X", href: "" },
    youtube: { label: "YouTube", href: "" },
  },
  currencySymbol: "$",
  financeMonths: 12,
} as const;
