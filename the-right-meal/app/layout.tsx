import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, Parisienne, Lugrasimo, Story_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const parisienne = Parisienne({ subsets: ["latin"], weight: "400", variable: "--font-parisienne" });
const lugrasimo = Lugrasimo({ subsets: ["latin"], weight: "400", variable: "--font-lugrasimo" });
const storyScript = Story_Script({ subsets: ["latin"], weight: "400", variable: "--font-story-script" });

export const metadata: Metadata = {
  title: "The Right Meal",
  description: "Track Your Plate, Master Your Budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${parisienne.variable} ${lugrasimo.variable} ${storyScript.variable} font-sans antialiased text-slate-800 bg-stone-50`}>
        <Navbar />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}

