import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Puffy Roller - Top Electric Joint Roller for Smokers",
  description:
    "Learn why Puffy Roller is the best compact electric joint roller and weed grinder. Built for real smokers who want smooth, clean sessions.",
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
    title: "Meet the Best 420 Gadget - Puffy Roller",
    description:
      "At Puffy Roller, we're all about effortless smoking. Discover our story and how we created the best joint roller and grinder combo.",
    url: "https://puffyroll.com/about",
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
    title: "About Puffy Roller - Best Herb Grinder & Roller",
    description:
      "Get to know the brand behind the top-rated automatic joint roller. Perfect for dry herb smokers who want clean, quick puffs.",
    images: ["https://puffyroll.com/icon"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
