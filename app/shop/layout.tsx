import type { Metadata } from "next";

export const metadata :Metadata = {
  title: "Shop the Best Electric Joint Roller - Puffy Roller",
  description:
    "Buy Puffy Roller - the top-rated automatic joint roller and herb grinder. Perfect for dry herb, fast rolling, and 420 sessions on the go.",
  openGraph: {
    title: "Top 420 Gadget - Shop Puffy Roller Now",
    description:
      "Shop now for the best electric joint roller and weed grinder combo. Beginner-friendly, compact, and built for perfect joints in seconds.",
    url: "https://puffyroll.com/shop",
    siteName: "Puffy Roller",
    images: [],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best Joint Roller for Weed - Puffy Roller",
    description:
      "Get the best 420 gadget today. Puffy Roller grinds and rolls for you, making smooth, clean joints every time.",
    images: [],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
