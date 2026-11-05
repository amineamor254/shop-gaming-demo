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
  content?: string[];
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
    content: [
      "A processor's neural engine is designed to handle small machine learning tasks directly on the chip. These tasks may include organizing workloads, recognizing patterns, or assisting features that benefit from local processing.",
      "Dedicated AI hardware can reduce the need to send data to another processor, though it does not automatically make every application faster. Software must include instructions that use the specialized component.",
      "For everyday computing, the overall benefit depends on scheduling, memory, cooling, and how well applications are written. It is useful to compare complete-system results rather than focus on a single hardware label.",
      "Readers evaluating a new processor should look for published workloads that resemble their own use. Balanced CPU, graphics, memory, and storage performance usually matters more than any one feature in isolation.",
    ],
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
    content: [
      "Planning a new PC starts with the main use case and a realistic budget. Games, creative software, and general productivity place different demands on the processor, graphics hardware, memory, and storage.",
      "Before buying parts, check the compatibility of the processor socket, motherboard chipset, memory type, cooler clearance, case size, and power supply. A parts list is easier to assemble when each component fits both physically and electrically.",
      "Good airflow is often more important than cosmetic hardware. Positive cable management, unobstructed vents, and consistent fan direction help components stay within their intended temperatures.",
      "During assembly, work on a clean surface and follow the manuals supplied with each part. Test the system outside the case before final installation, then enter the firmware to confirm temperatures and fan behavior.",
    ],
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
    content: [
      "Air coolers transfer heat from the processor to a metal heatsink and move it away with one or more fans. Their simple construction makes them dependable, relatively easy to maintain, and compatible with many cases.",
      "Liquid coolers circulate coolant through a radiator, tubes, and a water block. They can move heat away from the processor efficiently, but they also add pumps, fittings, and radiator size requirements to the system.",
      "Noise depends on fan speed, radiator or heatsink design, and how the cooling system is tuned. A larger, slower-spinning fan may be quieter than a smaller fan working at a high speed.",
      "The best choice should account for case clearance, memory height, radiator space, maintenance, and the desired noise level. Processor power draw and local room temperature also affect real-world results.",
    ],
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
    content: [
      "Performance starts with a system that has enough headroom for the software it runs. Keeping drivers and operating-system updates current can also prevent known compatibility and stability problems.",
      "Resolution and render scale have a large effect on graphics workload. Reducing output quality or disabling demanding effects may improve frame consistency on hardware that is close to the game's requirements.",
      "Background applications can consume memory, processor time, and network capacity. Close software that is not needed, then repeat a controlled test so changes can be compared under similar conditions.",
      "Frame-rate results should be reviewed together with frame-time measurements. A stable experience depends on consistent delivery, not only on a high average number from one short run.",
    ],
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
    content: [
      "NVMe solid-state drives connect through the motherboard's PCIe interface, while older storage generations use different PCIe link speeds. Sequential transfer ratings describe sustained data movement, not every part of normal use.",
      "Loading time is influenced by compression, storage speed, memory capacity, processor speed, and how software organizes assets. A newer drive may be faster for large transfers without changing everyday application starts dramatically.",
      "Most modern motherboards support current NVMe formats, but slot availability and PCIe lane sharing vary by model. Review the board manual because graphics cards or additional devices may affect available bandwidth.",
      "Capacity, endurance, warranty, thermals, and sustained performance are useful selection criteria. Keeping some free space and backing up important files are practical habits regardless of storage generation.",
    ],
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
  },
];
