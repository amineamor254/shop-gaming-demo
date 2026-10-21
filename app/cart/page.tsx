import type { Metadata } from "next";
import CartPage from "@/components/Cart/page";

export const metadata: Metadata = { title: "Shopping Cart" };

/** Renders the cart route using the shared cart page component. */
export default function Page() {
  return <CartPage />;
}
