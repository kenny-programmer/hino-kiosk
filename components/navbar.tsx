"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-900 bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/hino-logo.png"
            alt="Hino Logo"
            width={100}
            height={40}
            className="ml-2"
          />
        </Link>
        <Link href="/cart" className="flex items-center mr-2">
          <ShoppingCart className="h-6 w-6 text-black" />
          {totalItems > 0 && (
            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
          <span className="ml-2 text-black font-medium">Cart</span>
        </Link>
      </div>
    </header>
  );
}
