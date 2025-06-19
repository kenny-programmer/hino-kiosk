// app/products/[series]/page.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { getSeriesData, type Series, type Model } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import { ComparisonButton } from "@/components/comparison-button";

export default function SeriesPage() {
  const pathname = usePathname();
  const series = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [seriesData, setSeriesData] = useState<Series | null>(null);

  useEffect(() => {
    if (series) {
      const data = getSeriesData(series);
      setSeriesData(data);
    }
  }, [series]);

  if (!seriesData) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-red-600 hover:text-red-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back to All Product Series</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-black">{seriesData.title}</h1>
      <p className="text-lg mb-8 text-gray-700">{seriesData.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {seriesData.models.map((model: Model) => (
          <div
            key={model.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <Link href={`/products/${series}/${model.id}`} className="block">
              <div className="relative h-64 w-full">
                <Image
                  src={model.image || "/placeholder.svg"}
                  alt={model.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold mb-2 text-red-600">
                {model.name}
              </h2>
              <p className="text-black mb-4 flex-grow">{model.description}</p>

              <div className="space-y-2 mb-6">
                {model.airconditioned !== undefined && (
                  <div className="flex justify-between items-start text-sm border-b border-gray-200 pb-2">
                    <span className="text-gray-600 mr-2">Airconditioned</span>
                    <span className="font-semibold text-gray-800 text-right">
                      {model.airconditioned ? "Yes" : "No"}
                    </span>
                  </div>
                )}
                {Object.entries(model.specifications || {})
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-start text-sm border-b border-gray-200 pb-2 last:border-b-0"
                    >
                      <span className="text-gray-600 mr-2">{key}</span>
                      <span className="font-semibold text-gray-800 text-right">
                        {String(value)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* --- CORRECTED ACTION BAR --- */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center gap-4">
                <Link
                  href={`/products/${series}/${model.id}`}
                  className="flex-1"
                >
                  {/* The primary button is now red */}
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    View Details
                  </Button>
                </Link>

                {/* The secondary "Compare" button is now separate and uses our component */}
                <ComparisonButton item={model} variant="outline" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
