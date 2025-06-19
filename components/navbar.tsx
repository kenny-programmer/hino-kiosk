// components/navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, BarChart2 } from "lucide-react"; // Import the comparison icon
import { useCart } from "@/context/cart-context";
import { useComparison } from "@/context/comparison-context"; // --- 1. IMPORT USECOMPARISON ---
import { Button } from "./ui/button"; // Import Button for consistent styling

export default function Navbar() {
  const { cart } = useCart();
  const { comparisonItems } = useComparison(); // --- 2. GET COMPARISON ITEMS ---

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/hino-logo.png"
            alt="Hino Logo"
            width={100}
            height={40}
          />
        </Link>

        {/* Action Icons Group */}
        <div className="flex items-center space-x-4">
          {/* --- 3. DYNAMIC COMPARISON BUTTON --- */}
          {comparisonItems.length > 0 && (
            <Link href="/comparison" passHref>
              <Button variant="outline" className="relative hidden sm:flex">
                <BarChart2 className="h-5 w-5 mr-2" />
                Compare
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {comparisonItems.length}
                </span>
              </Button>
              {/* Icon-only button for smaller screens */}
              <Button
                variant="ghost"
                size="icon"
                className="relative sm:hidden"
              >
                <BarChart2 className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {comparisonItems.length}
                </span>
              </Button>
            </Link>
          )}

          {/* Cart Link */}
          <Link href="/cart" className="flex items-center">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-black" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {totalCartItems}
                </span>
              )}
            </Button>
            <span className="ml-2 hidden text-black font-medium sm:block">
              Cart
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
