"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { getSeriesData } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function SeriesPage() {
  const pathname = usePathname();
  const series = pathname.split("/").pop() || "";

  const [seriesData, setSeriesData] = useState<any>(null);

  useEffect(() => {
    const data = getSeriesData(series);
    setSeriesData(data);
  }, [series]);

  if (!seriesData) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  const isBusOrPUV = series === "buses" || series === "puvs";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-red-600 hover:text-red-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back to Products</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-black">{seriesData.title}</h1>
      <p className="text-lg mb-8 text-black">{seriesData.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {seriesData.models.map((model: any) => (
          <div
            key={model.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 w-full">
              <Image
                src={model.image || "/placeholder.svg"}
                alt={model.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-red-600">
                {model.name}
              </h2>
              {model.description && (
                <p className="text-black mb-4">{model.description}</p>
              )}

              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.entries(model.specifications || {})
                  .slice(0, 4)
                  .map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-black">{key}: </span>
                      <span className="text-black">{String(value)}</span>
                    </div>
                  ))}
              </div>

              <Link href={`/products/${series}/${model.id}`}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
