import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "China Explained - Grand Tour 2026",
  description: "A cinematic journey through China's geography, culture, and incredible destinations. Explore our grand tour route across 8 amazing cities.",
  keywords: ["China", "Travel", "Geography", "Culture", "Asia", "Grand Tour", "Shanghai", "Beijing", "Chengdu"],
  authors: [{ name: "China Explained Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "China Explained - Grand Tour 2026",
    description: "A cinematic journey through Middle Kingdom's diverse geography and rich culture",
    url: "https://china-explained.com",
    siteName: "China Explained",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "China Explained - Grand Tour 2026",
    description: "A cinematic journey through China's geography, culture, and destinations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${lora.variable} ${inter.variable} antialiased bg-inkBlack text-ricePaper font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
