// Layout component to wrap around your pages.
// This component should provide a common layout (e.g., header, footer) for your pages.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Puffy - Your One-Stop Shop",
  description: "Discover our collection of premium products",
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

        <Toaster />
      </body>
    </html>
  );
}
