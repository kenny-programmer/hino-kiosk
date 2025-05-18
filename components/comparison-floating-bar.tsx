"use client";

import { useComparison } from "@/context/comparison-context";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ComparisonFloatingBar() {
  const { comparisonItems, removeFromComparison, clearComparison } =
    useComparison();
  const pathname = usePathname();

  // Don't show on comparison page or if no items
  if (pathname === "/comparison" || comparisonItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 py-3 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-black mr-4">
              Compare ({comparisonItems.length}):
            </span>
            <div className="flex items-center space-x-2">
              {comparisonItems.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-gray-100 rounded p-1 w-16 h-16"
                >
                  <button
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => removeFromComparison(item.id)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              className="text-red-600 border-red-600"
            >
              Clear All
            </Button>

            <Link href="/comparison">
              <Button className="bg-red-600 hover:bg-red-700">
                Compare Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
