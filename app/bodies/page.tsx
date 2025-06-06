"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { bodyCategories, getAllBodies } from "@/lib/data";
import { Eye } from "lucide-react";
import { ComparisonButton } from "@/components/comparison-button";
import { ComparisonFloatingBar } from "@/components/comparison-floating-bar";

export default function BodiesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [allBodies, setAllBodies] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchedCategories = bodyCategories;
    const bodies = getAllBodies();

    setCategories(fetchedCategories);
    setAllBodies(bodies);
  }, []);

  const filteredBodies =
    selectedCategory === "all"
      ? allBodies
      : allBodies.filter(
          (body) =>
            body.id.includes(selectedCategory.toLowerCase()) ||
            body.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-black">Truck Bodies</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="border rounded-lg overflow-hidden sticky top-20">
            <h2 className="text-xl font-bold p-4 border-b bg-gray-50 text-black">
              Body Categories
            </h2>

            <div className="divide-y">
              <button
                className={`w-full text-left p-4 ${
                  selectedCategory === "all"
                    ? "bg-red-600 text-white"
                    : "text-black"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left p-4 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white"
                      : "text-black"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBodies.length > 0 ? (
              filteredBodies.map((body) => (
                <div
                  key={body.id}
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={body.image || "/placeholder.svg"}
                      alt={body.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-red-600">
                      {body.name}
                    </h3>
                    <p className="text-sm text-black mb-4 line-clamp-2">
                      {body.description}
                    </p>
                    <p className="font-bold text-black mb-4">
                      ₱{body.price.toLocaleString()}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      <Link href={`/bodies/${body.id}`}>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center">
                          <Eye className="mr-2 h-5 w-5" />
                          View Details
                        </Button>
                      </Link>

                      <ComparisonButton
                        item={{
                          id: `body-${body.id}`,
                          type: "body",
                          name: body.name,
                          price: body.price,
                          image: body.image,
                          specifications: body.specifications,
                          compatibleSeries: body.compatibleSeries,
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-lg text-black">
                  No bodies found for this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComparisonFloatingBar />
    </div>
  );
}
