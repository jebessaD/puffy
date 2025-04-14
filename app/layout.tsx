import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Puffy - Vibe high, stay fly",
  description:
    "Discover the best electric joint roller and herb grinder combo. Puffy Roller is the top 420 gadget for effortless, clean, and perfect rolls every time.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/icon",
      type: "image/png",
    },
  },
  openGraph: {
    title: "Top Electric Joint Roller - Puffy Roller",
    description:
      "Looking for the best way to roll joints? Puffy Roller is a compact, automatic joint roller and weed grinder loved by beginners and pros.",
    url: "https://puffyroll.com",
    siteName: "Puffy Roller",
    images: [
      {
        url: "https://puffyroll.com/icon",
        width: 512,
        height: 512,
        alt: "Puffy Roller Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best Herb Grinder & Roller - Puffy Roller",
    description:
      "The ultimate 420 smoking accessory. Get perfect joints fast with the best electric grinder and roller in one.",
    images: ["https://puffyroll.com/icon"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 min-h-screen antialiased`}
      >
        <Navbar />
        <main className="">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
