import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop the Best Electric Joint Roller - Puffy Roller",
  description:
    "Buy Puffy Roller - the top-rated automatic joint roller and herb grinder. Perfect for dry herb, fast rolling, and 420 sessions on the go.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/icon.png",
      type: "image/png",
    },
  },
  openGraph: {
    title: "Top 420 Gadget - Shop Puffy Roller Now",
    description:
      "Shop now for the best electric joint roller and weed grinder combo. Beginner-friendly, compact, and built for perfect joints in seconds.",
    url: "https://puffyroll.com/shop",
    siteName: "Puffy Roller",
    images: [
      {
        url: "https://puffyroll.com/icon.png",
        width: 512,
        height: 512,
        alt: "Puffy Roller Product",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best Joint Roller for Weed - Puffy Roller",
    description:
      "Get the best 420 gadget today. Puffy Roller grinds and rolls for you, making smooth, clean joints every time.",
    images: [
      {
        url: "https://puffyroll.com/icon.png",
        width: 512,
        height: 512,
        alt: "Puffy Roller Product",
      },
    ],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
