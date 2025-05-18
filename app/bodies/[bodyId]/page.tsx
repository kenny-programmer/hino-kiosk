"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { getBodyById } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import { ComparisonButton } from "@/components/comparison-button";
import { ComparisonFloatingBar } from "@/components/comparison-floating-bar";
import Link from "next/link";

export default function BodyDetailPage() {
  const pathname = usePathname();
  const router = useRouter();
  const bodyId = pathname.split("/").pop() || "";

  const [body, setBody] = useState<any>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const bodyData = getBodyById(bodyId);
    setBody(bodyData);
  }, [bodyId]);

  if (!body) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  const handleAddToCart = () => {
    // Add the body to cart
    addToCart({
      id: `body-${body.id}`,
      type: "body",
      name: body.name,
      price: body.price,
      image: body.image,
      specifications: body.specifications,
    });

    toast({
      title: "Added to cart",
      description: "Your selection has been added to the cart",
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to cart
    router.push("/cart");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/bodies"
          className="inline-flex items-center text-red-600 hover:text-red-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back to Truck Bodies</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative h-80 md:h-96 w-full mb-6 border rounded-lg overflow-hidden">
            <Image
              src={body.image || "/placeholder.svg"}
              alt={body.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-24 w-full border rounded-lg overflow-hidden"
              >
                <Image
                  src={body.image || "/placeholder.svg"}
                  alt={`${body.name} view ${i}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-red-600">{body.name}</h1>
          <p className="text-black mb-6">{body.description}</p>

          <div className="border rounded-lg p-6 mb-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4 text-black">
              Specifications
            </h2>

            <div className="grid grid-cols-2 gap-y-3">
              {Object.entries(body.specifications || {}).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-medium text-black">{key}: </span>
                  <span className="text-black">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-black">
              Compatible With
            </h2>
            <div className="flex flex-wrap gap-2">
              {body.compatibleSeries.map((series: string) => (
                <span
                  key={series}
                  className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm"
                >
                  {series.replace("-", " ").toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-black">Price</h2>
            <p className="text-3xl font-bold text-red-600">
              ₱{body.price.toLocaleString()}
            </p>
          </div>

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
                onClick={handleBuyNow}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
            </div>

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

      <ComparisonFloatingBar />
    </div>
  );
}
