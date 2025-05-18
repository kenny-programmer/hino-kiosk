import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { ComparisonProvider } from "@/context/comparison-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hino Trucks Kiosk",
  description: "Customize and purchase Hino trucks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <ComparisonProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ComparisonProvider>
        </CartProvider>
      </body>
    </html>
  );
}
