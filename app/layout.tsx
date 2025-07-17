import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { ComparisonProvider } from "@/context/comparison-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hino Trucks Kiosk",
  description: "Customize and purchase Hino trucks",
  keywords: "Hino, Trucks, Commercial Vehicles, Customization",
  authors: [{ name: "Hino Motors Philippines" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This is the crucial fix to prevent browser extensions like Grammarly
    // from causing a hydration error that breaks the entire application.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#DC2626" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <ComparisonProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </ComparisonProvider>
        </CartProvider>
      </body>
    </html>
  );
}