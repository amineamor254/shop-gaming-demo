import type { ComponentType } from "react";
import {
  Cpu,
  Fan,
  Gauge,
  HardDrive,
  Headphones,
  Keyboard,
  Monitor,
  Zap,
} from "lucide-react";

export type Post = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags?: string[];
  featured?: boolean;
  icon: ComponentType<{ className?: string }>;
  gradient: string;
  image?: string;
};

export const POSTS: Post[] = [
  {
    id: 1,
    slug: "first-cpu-with-a-true-ai-core",
    category: "News",
    title: "First CPU with a true AI core",
    excerpt:
      "A new generation of processors adds a dedicated neural engine on the chip. It adapts to your workload, boosts the cores that matter and predicts what your game needs next, for smoother frame times and lower power use.",
    date: "Oct 12, 2026",
    readTime: "6 min read",
    tags: ["CPU", "AI", "NextGenTech"],
    featured: true,
    icon: Cpu,
    gradient: "from-brand-primary-500/30 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/first cpu with a true ai core.webp",
  },
  {
    id: 2,
    slug: "ultimate-pc-build-guide",
    category: "Guides",
    title: "The ultimate PC build guide",
    excerpt: "Our complete component guide for building the perfect rig to handle next-gen gaming.",
    date: "Oct 8, 2026",
    readTime: "9 min read",
    icon: Monitor,
    gradient: "from-brand-accent-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/The ultimate PC build guide.webp",
  },
  {
    id: 3,
    slug: "air-vs-liquid-cooling",
    category: "Hardware",
    title: "Air vs liquid cooling explained",
    excerpt: "Which cooler is right for your build? We compare noise, thermals and price.",
    date: "Oct 3, 2026",
    readTime: "5 min read",
    icon: Fan,
    gradient: "from-sky-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/Air vs liquid cooling explained.webp",
  },
  {
    id: 4,
    slug: "boost-your-fps",
    category: "Tips",
    title: "10 settings to boost your FPS",
    excerpt: "Simple tweaks that give you free performance without spending a cent.",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    icon: Gauge,
    gradient: "from-emerald-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/10 settings to boost your FPS.webp",
  },
  {
    id: 5,
    slug: "nvme-storage-explained",
    category: "Hardware",
    title: "NVMe storage: Gen3 vs Gen4",
    excerpt: "Do faster SSDs really change your loading times? Here are the real numbers.",
    date: "Sep 21, 2026",
    readTime: "5 min read",
    icon: HardDrive,
    gradient: "from-brand-primary-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/NVMe storage Gen3 vs Gen4.webp",
  },
  {
    id: 6,
    slug: "choosing-a-power-supply",
    category: "Guides",
    title: "How to choose a power supply",
    excerpt: "Wattage, efficiency and cables: everything you need to power your build safely.",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    icon: Zap,
    gradient: "from-brand-accent-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/How to choose a power supply.webp",
  },
  {
    id: 7,
    slug: "mechanical-keyboards-101",
    category: "Peripherals",
    title: "Mechanical keyboards 101",
    excerpt: "Linear, tactile or clicky? Find the switch type that matches your play style.",
    date: "Sep 9, 2026",
    readTime: "4 min read",
    icon: Keyboard,
    gradient: "from-sky-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/Mechanical keyboards 101.webp",
  },
  {
    id: 8,
    slug: "best-gaming-audio",
    category: "Peripherals",
    title: "Gaming audio that wins matches",
    excerpt: "Positional sound, clear mics and comfort: what to look for in a headset.",
    date: "Sep 2, 2026",
    readTime: "5 min read",
    icon: Headphones,
    gradient: "from-emerald-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/Gaming audio that wins matches.webp",
  },
  {
    id: 9,
    slug: "4k-monitors-worth-it",
    category: "Hardware",
    title: "Are 4K monitors worth it?",
    excerpt: "Refresh rate, resolution and price: choosing the display that fits your GPU.",
    date: "Aug 26, 2026",
    readTime: "6 min read",
    icon: Monitor,
    gradient: "from-brand-primary-500/25 via-[#0d1824] to-[#070d14]",
    image: "/images/blog/Are 4K monitors worth it.webp",
  },
];
