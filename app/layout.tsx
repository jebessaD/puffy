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
    "The Puffy Roller is the ultimate automatic joint roller and herb grinder combo designed for fast, smooth, and consistent rolls. This electric weed roller is compact, portable, and easy to use — perfect for beginners and pros alike. Say goodbye to hand rolling and messy grinds with this all-in-one weed rolling machine. Ideal for home or on-the-go use, the Puffy Roller pairs perfectly with top-rated 420 accessories like rolling trays, pre-rolled cones, filter tips, smell-proof bags, and stash containers. Whether you're searching for the best joint roller, weed grinder, or smoking kit, this device delivers quality and convenience. Great for dry herbs, it's a must-have for any cannabis smoker, stoner gear collection, or smoking setup. Order now for fast shipping and premium performance.",
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
