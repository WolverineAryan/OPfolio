import type { Metadata } from "next";
import { Inter, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Pranav A. Thormise — Full Stack Developer & UI/UX Designer",
  description: "Pranav A. Thormise — TE Computer Engineering student, full stack developer, UI/UX designer, and co-founder of REKRAFT. Building premium MERN stack, Kotlin, and AI applications.",
  openGraph: {
    title: "Pranav A. Thormise — Full Stack Developer & UI/UX Designer",
    description: "Portfolio of Pranav A. Thormise. Crafting premium digital products with MERN Stack, Kotlin, and AI/ML.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 600,
        alt: "Pranav A. Thormise",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
