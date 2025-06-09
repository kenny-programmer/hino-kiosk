"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { getModelData, Model } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, CreditCard, Truck, ArrowLeft } from "lucide-react";
import { ComparisonButton } from "@/components/comparison-button";
import { ComparisonFloatingBar } from "@/components/comparison-floating-bar";
import Link from "next/link";

export default function ModelPage() {
  const pathname = usePathname();
  const router = useRouter();
  const pathParts = pathname.split("/");
  const series = pathParts[pathParts.length - 2] || "";
  const modelId = pathParts[pathParts.length - 1] || "";

  const [model, setModel] = useState<Model | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const modelData = getModelData(series, modelId);
    setModel(modelData);
  }, [series, modelId]);

  if (!model) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  const isBusOrPUV = series === "buses" || series === "puvs";

  const handleAddToCart = () => {
    addToCart({
      id: `${series}-${modelId}`,
      type: isBusOrPUV ? (series === "buses" ? "bus" : "puv") : "chassis",
      name: model.name,
      series: series,
      model: modelId,
      price: model.price,
      image: model.image,
      specifications: model.specifications,
      selectedBody: undefined,
    });

    toast({
      title: "Added to cart",
      description: "Your selection has been added to the cart",
    });
  };

  const handleBuyChassisOnly = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleViewBodies = () => {
    router.push(`/products/${series}/${modelId}/bodies`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/products/${series}`}
          className="inline-flex items-center text-red-600 hover:text-red-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>
            Back to{" "}
            {series.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative h-80 md:h-96 w-full mb-6 border rounded-lg overflow-hidden">
            <Image
              src={model.image || "/placeholder.svg"}
              alt={model.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-red-600">{model.name}</h1>
          {model.description && (
            <p className="text-black mb-6">{model.description}</p>
          )}

          <div className="border rounded-lg p-6 mb-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4 text-black">
              Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
              {Object.entries(model.specifications || {}).map(
                ([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="font-medium text-black">{key}: </span>
                    <span className="text-black">{String(value)}</span>
                  </div>
                )
              )}
              {typeof model.airconditioned === "boolean" && (
                <div className="border-b pb-2">
                  <span className="font-medium text-black">
                    Airconditioned:{" "}
                  </span>
                  <span className="text-black">
                    {model.airconditioned ? "Yes" : "No"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-black">Engine</h2>
            <p className="text-black">
              {model.engine || "Standard Hino Engine"}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-black">Price</h2>
            <p className="text-3xl font-bold text-red-600">
              ₱{model.price.toLocaleString()}
            </p>
          </div>

          {!isBusOrPUV ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700 text-white md:text-base py-3 text-lg flex items-center justify-center"
                  onClick={handleBuyChassisOnly}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy Chassis Only
                </Button>

                <Button
                  className="border-2 border-red-600 bg-white text-red-600 hover:bg-red-50 py-3 text-lg flex items-center justify-center"
                  onClick={handleViewBodies}
                >
                  <Truck className="mr-2 h-5 w-5" />
                  View Bodies
                </Button>
              </div>

              <ComparisonButton
                item={{
                  id: `${series}-${modelId}`,
                  type: "chassis",
                  name: model.name,
                  series: series,
                  model: modelId,
                  price: model.price,
                  image: model.image,
                  specifications: model.specifications,
                  engine: model.engine,
                  bodyType: model.bodyType,
                }}
                className="w-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg flex items-center justify-center"
                  onClick={handleBuyChassisOnly}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>
              </div>

              <ComparisonButton
                item={{
                  id: `${series}-${modelId}`,
                  type: isBusOrPUV
                    ? series === "buses"
                      ? "bus"
                      : "puv"
                    : "chassis",
                  name: model.name,
                  series: series,
                  model: modelId,
                  price: model.price,
                  image: model.image,
                  specifications: model.specifications,
                  engine: model.engine,
                }}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
      <ComparisonFloatingBar />
    </div>
  );
}
