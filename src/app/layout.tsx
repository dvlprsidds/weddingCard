import type { Metadata } from "next";
import { Cinzel, Great_Vibes, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Wedding of Siddu & Shyamala | You are Invited",
  description: "Together with their families, Siddu & Shyamala cordially invite you to join their magical union. Experience their love story, event itineraries, 3D envelope opening, and luxury celebration in Lokapura.",
  keywords: ["Siddu and Shyamala Wedding", "Wedding Invitation", "Indian Wedding", "Cinematic Wedding Card", "Lokapura Wedding"],
  authors: [{ name: "Siddu & Shyamala" }],
  openGraph: {
    title: "The Wedding of Siddu & Shyamala",
    description: "Experience the premium cinematic wedding invitation of Siddu & Shyamala. Tap to open the royal card.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-amber-500/30 selection:text-amber-200">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>" />
      </head>
      <body
        className={`${cinzel.variable} ${greatVibes.variable} ${montserrat.variable} antialiased bg-[#0c0305] text-stone-100 overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
