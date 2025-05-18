import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const productSeries = [
  {
    id: "200",
    name: "200 Series",
    description:
      "Transform city logistics with the Hino 200 Series—powerful, agile, and perfect for tight spaces and heavy loads.",
    image: "/images/200-series.png",
    link: "/products/200-series",
  },
  {
    id: "300",
    name: "300 Series",
    description:
      "The Hino 300 Series is a durable light-duty truck designed inside and out to ensure quality and drive success for your business!",
    image: "/images/300-series.png",
    link: "/products/300-series",
  },
  {
    id: "500",
    name: "500 Series",
    description:
      "Hino 500 Series combines robust construction and powerful engines, ensuring reliability and optimal load capacity for your business.",
    image: "/images/500-series.png",
    link: "/products/500-series",
  },
  {
    id: "buses",
    name: "Buses",
    description:
      "Experience luxury and efficiency with Hino Buses—perfect for public transport and group travel solutions.",
    image: "/images/buses.png",
    link: "/products/buses",
  },
  {
    id: "puvs",
    name: "PUVs",
    description:
      "Choose Hino PUVs for sustainable transport solutions that prioritize both performance and environmental responsibility.",
    image: "/images/puvs.png",
    link: "/products/puvs",
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Hino Product Series</h1>
        <Link href="/comparison">
          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            View Comparison
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productSeries.map((series) => (
          <div
            key={series.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 w-full">
              <Image
                src={series.image || "/placeholder.svg"}
                alt={series.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-black">
                {series.name}
              </h2>
              <p className="text-black mb-6">{series.description}</p>

              <Link href={series.link}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg">
                  {series.id === "buses" || series.id === "puvs"
                    ? "View Details"
                    : series.id === "bodies"
                    ? "Browse Bodies"
                    : "View Body Options"}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
