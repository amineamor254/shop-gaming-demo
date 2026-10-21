import type { Metadata } from "next";
import CheckoutPage from "@/components/Checkout/page";

export const metadata: Metadata = { title: "Checkout" };

/** Renders the checkout route using the shared checkout page component. */
export default function Page() {
  return <CheckoutPage />;
}
