import type { ComponentType } from "react";
import { Clock, Cpu, Trophy } from "lucide-react";

export const FEATURED_PRODUCT = {
  name: "Pro Gaming PC",
  image: "/images/hero/pro-gaming-pc.webp",
  price: 1499,
  monthlyPrice: 125,
  stats: [
    { icon: Trophy, value: "240+", label: "Builds delivered" },
    { icon: Cpu, value: "Next-gen", label: "Latest GPUs" },
    { icon: Clock, value: "24", label: "Months warranty" },
  ] satisfies {
    icon: ComponentType<{ className?: string }>;
    value: string;
    label: string;
  }[],
  specs: ["High-end GPU", "8-Core CPU", "32GB DDR5"],
};
