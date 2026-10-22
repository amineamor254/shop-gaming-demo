import type { Metadata } from "next";
import AuthPage from "@/components/Auth/page";

export const metadata: Metadata = { title: "Sign in" };

export default function Page() {
  return <AuthPage />;
}