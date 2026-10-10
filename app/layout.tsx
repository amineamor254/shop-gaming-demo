import type { Metadata } from "next";
import { Geist, Geist_Mono,  Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
  
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MIAN Games",
  description: "MIAN Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} min-h-screen flex flex-col antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}