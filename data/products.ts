export type ProductCategory = "Audio" | "Monitors" | "Mice" | "Keyboards";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  colors: string[];
  inStock: boolean;
  image?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Gaming Headset",
    category: "Audio",
    price: 40,
    oldPrice: 45,
    rating: 5,
    reviews: 12,
    colors: ["#ffffff", "#3b82f6", "#ef4444"],
    inStock: true,
    image: "/images/products/wireless-gaming-headset.webp",
  },
  {
    id: 2,
    name: "Studio Gaming Headphones",
    category: "Audio",
    price: 25,
    oldPrice: 40,
    rating: 5,
    reviews: 8,
    colors: ["#111827", "#3b82f6", "#ef4444"],
    inStock: true,
    image :"/images/products/studio-gaming-headphones.webp",
  },
  {
    id: 3,
    name: "27-inch Gaming Monitor",
    category: "Monitors",
    price: 80,
    oldPrice: 90,
    rating: 4,
    reviews: 21,
    colors: ["#111827", "#3b82f6"],
    inStock: true,
    image: "/images/products/27-inch-gaming-monitor.webp",
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    category: "Mice",
    price: 30,
    oldPrice: 50,
    rating: 5,
    reviews: 33,
    colors: ["#ef4444", "#111827"],
    inStock: true,
    image: "/images/products/wireless-gaming-mouse.webp",
  },
  {
    id: 5,
    name: "Lightweight Gaming Mouse",
    category: "Mice",
    price: 30,
    oldPrice: 40,
    rating: 4,
    reviews: 17,
    colors: ["#6b7280", "#ef4444", "#3b82f6"],
    inStock: false,
    image: "/images/products/lightweight-gaming-mouse.webp",
  },
  {
    id: 6,
    name: "Mechanical Gaming Keyboard",
    category: "Keyboards",
    price: 70,
    oldPrice: 80,
    rating: 5,
    reviews: 41,
    colors: ["#3b82f6", "#ef4444", "#ffffff"],
    inStock: true,
    image: "/images/products/mechanical-gaming-keyboard.webp",
  },
  {
    id: 7,
    name: "Stereo Gaming Speakers",
    category: "Audio",
    price: 55,
    rating: 4,
    reviews: 9,
    colors: ["#111827", "#22c55e"],
    inStock: true,
    image: "/images/products/stereo-gaming-speakers.webp",
  },
  {
    id: 8,
    name: "27-inch Curved Monitor",
    category: "Monitors",
    price: 120,
    oldPrice: 150,
    rating: 5,
    reviews: 26,
    colors: ["#111827"],
    inStock: true,
    image: "/images/products/27-inch-curved-monitor.webp",
  },
  {
    id: 9,
    name: "Silent Click Gaming Mouse",
    category: "Mice",
    price: 22,
    rating: 4,
    reviews: 14,
    colors: ["#ffffff", "#111827"],
    inStock: true,
    image: "/images/products/silent-click-gaming-mouse.webp",
  },
  {
    id: 10,
    name: "RGB Backlit Keyboard",
    category: "Keyboards",
    price: 90,
    oldPrice: 110,
    rating: 5,
    reviews: 52,
    colors: ["#111827", "#ef4444", "#22c55e"],
    inStock: false,
    image: "/images/products/rgb-backlit-keyboard.webp",
  },
  {
    id: 11,
    name: "Surround Sound Headset",
    category: "Audio",
    price: 65,
    rating: 4,
    reviews: 11,
    colors: ["#ffffff", "#3b82f6"],
    inStock: true,
    image: "/images/products/surround-sound-headset.webp",
  },
  {
    id: 12,
    name: "24-inch Gaming Monitor",
    category: "Monitors",
    price: 95,
    oldPrice: 105,
    rating: 4,
    reviews: 19,
    colors: ["#111827", "#ef4444"],
    inStock: true,
    image: "/images/products/24-inch-gaming-monitor.webp",
  },
];

export const CATEGORIES = ["All", "Audio", "Monitors", "Mice", "Keyboards"] as const;

export const SORT_OPTIONS = [
  { value: "alpha-asc", label: "Alphabetically, A-Z" },
  { value: "alpha-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
] as const;

export const COLOR_FILTERS = ["#ffffff", "#111827", "#3b82f6", "#ef4444", "#22c55e", "#6b7280"];
