import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      <head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');`}
          {`@import url('https://fonts.googleapis.com/css2?family=Lugrasimo&display=swap');`}
         {`@import url('https://fonts.googleapis.com/css2?family=Story+Script&display=swap');`}
        </style>
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-sans antialiased text-slate-800 bg-stone-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
