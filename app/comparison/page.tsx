"use client";

import { useComparison } from "@/context/comparison-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";

export default function ComparisonPage() {
  const { comparisonItems, removeFromComparison, clearComparison } =
    useComparison();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      type: item.type,
      name: item.name,
      series: item.series,
      model: item.model,
      price: item.price,
      image: item.image,
      specifications: item.specifications,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  // Get all unique specification keys from all items
  const allSpecKeys = new Set<string>();
  comparisonItems.forEach((item) => {
    if (item.specifications) {
      Object.keys(item.specifications).forEach((key) => allSpecKeys.add(key));
    }
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/products" className="flex items-center text-red-600 mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-black">Product Comparison</h1>
      </div>

      {comparisonItems.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-black">
            No items to compare
          </h2>
          <p className="text-gray-600 mb-6">
            Add items to comparison to see them side by side
          </p>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              className="text-red-600 border-red-600"
              onClick={clearComparison}
            >
              Clear All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border bg-gray-50 p-4 text-left text-black w-1/5">
                    Feature
                  </th>
                  {comparisonItems.map((item) => (
                    <th
                      key={item.id}
                      className="border bg-gray-50 p-4 text-black"
                    >
                      <div className="relative">
                        <button
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={() => removeFromComparison(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Product Image */}
                <tr>
                  <td className="border p-4 font-medium text-black">Image</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="border p-4 text-center">
                      <div className="relative h-40 w-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Product Name */}
                <tr>
                  <td className="border p-4 font-medium text-black">Name</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="border p-4">
                      <h3 className="font-bold text-red-600">{item.name}</h3>
                    </td>
                  ))}
                </tr>

                {/* Product Type */}
                <tr>
                  <td className="border p-4 font-medium text-black">Type</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="border p-4">
                      <span className="capitalize">{item.type}</span>
                    </td>
                  ))}
                </tr>

                {/* Product Price */}
                <tr>
                  <td className="border p-4 font-medium text-black">Price</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="border p-4">
                      <span className="font-bold">
                        ₱{item.price.toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Engine (for chassis only) */}
                {comparisonItems.some((item) => item.engine) && (
                  <tr>
                    <td className="border p-4 font-medium text-black">
                      Engine
                    </td>
                    {comparisonItems.map((item) => (
                      <td key={item.id} className="border p-4">
                        {item.engine || "-"}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Compatible Series (for bodies only) */}
                {comparisonItems.some((item) => item.compatibleSeries) && (
                  <tr>
                    <td className="border p-4 font-medium text-black">
                      Compatible With
                    </td>
                    {comparisonItems.map((item) => (
                      <td key={item.id} className="border p-4">
                        {item.compatibleSeries ? (
                          <div className="flex flex-wrap gap-1">
                            {item.compatibleSeries.map((series: string) => (
                              <span
                                key={series}
                                className="bg-gray-100 text-black px-2 py-1 rounded-full text-xs"
                              >
                                {series.replace("-", " ").toUpperCase()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Specifications */}
                <tr className="bg-gray-50">
                  <td
                    colSpan={comparisonItems.length + 1}
                    className="border p-4 font-bold text-black"
                  >
                    Specifications
                  </td>
                </tr>

                {Array.from(allSpecKeys).map((key) => (
                  <tr key={key}>
                    <td className="border p-4 font-medium text-black">{key}</td>
                    {comparisonItems.map((item) => (
                      <td key={item.id} className="border p-4">
                        {item.specifications && item.specifications[key]
                          ? item.specifications[key]
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Add to Cart */}
                <tr>
                  <td className="border p-4 font-medium text-black">Actions</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="border p-4">
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
