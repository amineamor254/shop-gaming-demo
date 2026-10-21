import type { Metadata } from "next";
import CheckoutPage from "@/components/Checkout/page";

export const metadata: Metadata = { title: "Checkout" };

export default function Page() {
  return <CheckoutPage />;
}