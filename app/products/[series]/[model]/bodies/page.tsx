"use client";

import { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import {
  getModelData,
  getBodyCategories,
  getCompatibleBodies,
} from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, CreditCard, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BodiesPage() {
  const pathname = usePathname();
  const router = useRouter();
  const pathParts = pathname.split("/");
  const series = pathParts[pathParts.length - 3] || "";
  const modelId = pathParts[pathParts.length - 2] || "";

  const [model, setModel] = useState<any>(null);
  const [bodyCategories, setBodyCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [compatibleBodies, setCompatibleBodies] = useState<any[]>([]);
  const [selectedBody, setSelectedBody] = useState<any>(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const modelData = getModelData(series, modelId);
    const categories = getBodyCategories();
    const bodies = getCompatibleBodies(series, modelId) || [];

    setModel(modelData);
    setBodyCategories(categories);
    setCompatibleBodies(bodies);
  }, [series, modelId]);

  if (!model) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  const customBody = {
    id: "custom-body",
    name: "Custom Body",
    description: "Customize your own body according to your specifications",
    image: "/images/hino-logo.png",
    price: 0,
    isCustom: true,
  };

  const handleAddBodyToCart = () => {
    if (!selectedBody) {
      toast({
        title: "No body selected",
        description: "Please select a body first",
        variant: "destructive",
      });
      return;
    }

    // Add chassis to cart
    addToCart({
      id: `${series}-${modelId}`,
      type: "chassis",
      name: model.name,
      series: series,
      model: modelId,
      price: model.price,
      image: model.image,
      specifications: model.specifications,
    });

    // Add body to cart
    addToCart({
      id: `body-${selectedBody.id}`,
      type: "body",
      name: selectedBody.name,
      price: selectedBody.isCustom ? 0 : selectedBody.price,
      image: selectedBody.image,
      specifications: selectedBody.specifications,
      isCustom: Boolean(selectedBody.isCustom),
    } as CartItem);

    toast({
      title: "Package added to cart",
      description: selectedBody.isCustom
        ? "Chassis and custom body added. Please consult staff for final body pricing."
        : "Complete package has been added to your cart",
    });

    router.push("/cart");
  };

  const filteredBodies =
    selectedCategory === "all"
      ? compatibleBodies
      : compatibleBodies.filter(
          (body) =>
            body.id.includes(selectedCategory.toLowerCase()) ||
            body.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  interface CartItem {
    id: string;
    type: "chassis" | "body";
    name: string;
    price: number;
    image: string;
    specifications?: Record<string, any>;
    quantity?: number;
    isCustom?: boolean;
    series?: string;
    model?: string;
  }

  const handleBuyBodyOnly = () => {
    if (!selectedBody) {
      toast({
        title: "No body selected",
        description: "Please select a body first",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: `body-${selectedBody.id}`,
      type: "body",
      name: selectedBody.name,
      price: selectedBody.isCustom ? 0 : selectedBody.price,
      image: selectedBody.image,
      specifications: selectedBody.specifications,
      isCustom: selectedBody.isCustom,
    } as CartItem);

    toast({
      title: "Added to cart",
      description: selectedBody.isCustom
        ? "Custom body added to cart. Please consult with our staff for final pricing."
        : "Your selection has been added to the cart",
    });

    router.push("/cart");
  };

  const handleBuyPackage = () => {
    if (!selectedBody) {
      toast({
        title: "No body selected",
        description: "Please select a body first",
        variant: "destructive",
      });
      return;
    }

    // Add chassis to cart
    addToCart({
      id: `${series}-${modelId}`,
      type: "chassis",
      name: model.name,
      series: series,
      model: modelId,
      price: model.price,
      image: model.image,
      specifications: model.specifications,
    } as CartItem);

    // Add body to cart
    addToCart({
      id: `body-${selectedBody.id}`,
      type: "body",
      name: selectedBody.name,
      price: selectedBody.isCustom ? 0 : selectedBody.price,
      image: selectedBody.image,
      specifications: selectedBody.specifications,
      isCustom: selectedBody.isCustom,
    } as CartItem);

    toast({
      title: "Package added to cart",
      description: selectedBody.isCustom
        ? "Chassis and custom body added. Please consult staff for final body pricing."
        : "Complete package has been added to your cart",
    });

    router.push("/cart");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/products/${series}/${modelId}`}
          className="inline-flex items-center text-red-600 hover:text-red-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back to {model?.name || "Model"}</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-black">
        Select a Body for {model?.name}
      </h1>

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

              {bodyCategories.map((category) => (
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h2 className="text-xl font-bold mb-4 text-black">
                Selected Chassis
              </h2>
              <div className="flex items-start">
                <div className="relative h-32 w-32 mr-4">
                  <Image
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-600">
                    {model.name}
                  </h3>
                  <p className="text-sm text-black mb-2">{model.description}</p>
                  <p className="font-bold text-black">
                    ₱{model.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {selectedBody && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h2 className="text-xl font-bold mb-4 text-black">
                  Selected Body
                </h2>
                <div className="flex items-start">
                  <div className="relative h-32 w-32 mr-4">
                    <Image
                      src={selectedBody.image || "/placeholder.svg"}
                      alt={selectedBody.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-600">
                      {selectedBody.name}
                    </h3>
                    <p className="text-sm text-black mb-2">
                      {selectedBody.description}
                    </p>
                    <p className="font-bold text-black">
                      {selectedBody.isCustom
                        ? "Price: To be discussed"
                        : `₱${selectedBody.price.toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-4 text-black">
            Available Bodies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedBody?.id === customBody.id
                  ? "border-red-600 border-2 shadow-md"
                  : "hover:border-red-300"
              }`}
              onClick={() => {
                setSelectedBody(customBody);
                toast({
                  title: "Custom Body Selected",
                  description:
                    "Please consult with our staff for custom body specifications and pricing.",
                  duration: 5000,
                });
              }}
            >
              <div className="flex items-start">
                <div className="relative h-32 w-32 mr-4">
                  <Image
                    src={customBody.image}
                    alt={customBody.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-600">
                    {customBody.name}
                  </h3>
                  <p className="text-sm text-black mb-2">
                    {customBody.description}
                  </p>
                  <p className="font-bold text-black">Price: To be discussed</p>
                </div>
              </div>
            </div>

            {filteredBodies.length > 0 ? (
              filteredBodies.map((body) => (
                <div
                  key={body.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedBody?.id === body.id
                      ? "border-red-600 border-2 shadow-md"
                      : "hover:border-red-300"
                  }`}
                  onClick={() => setSelectedBody(body)}
                >
                  <div className="flex items-start">
                    <div className="relative h-32 w-32 mr-4">
                      <Image
                        src={body.image || "/placeholder.svg"}
                        alt={body.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-600">
                        {body.name}
                      </h3>
                      <p className="text-sm text-black mb-2">
                        {body.description}
                      </p>
                      <p className="font-bold text-black">
                        {body.price
                          ? `₱${body.price.toLocaleString()}`
                          : "Price: To be discussed"}
                      </p>
                    </div>
                  </div>

                  {selectedBody?.id === body.id && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {Object.entries(body.specifications || {}).map(
                        ([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-medium text-black">
                              {key}:{" "}
                            </span>
                            <span className="text-black">{String(value)}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-lg text-black">
                  No compatible bodies found for this category.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-end">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg px-6 flex items-center justify-center"
              onClick={handleAddBodyToCart}
              disabled={!selectedBody}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add Body to Cart
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg px-6 flex items-center justify-center"
              onClick={handleBuyBodyOnly}
              disabled={!selectedBody}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Buy Body Only
            </Button>

            <Button
              className="bg-green-600 hover:bg-green-700 text-white py-3 text-lg px-6 flex items-center justify-center"
              onClick={handleBuyPackage}
              disabled={!selectedBody}
            >
              <Package className="mr-2 h-5 w-5" />
              Buy Complete Package
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
