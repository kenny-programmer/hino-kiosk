// app/products/[series]/[model]/bodies/page.tsx
"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getSeriesData,
  getModelData,
  getAvailableBodyCategoriesForSeries,
  getBodiesForSelectedCategory,
  BodyVariant,
  Model as ChassisModel,
  Series,
  CUSTOM_PRICE_TEXT,
} from "@/lib/data";
import CustomBodyForm, {
  CustomDimensionData,
} from "@/components/custom-body-form";
import { useCart, CartItem } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function ProductBodyConfigurationPage() {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const seriesSlug = typeof params.series === "string" ? params.series : "";
  const modelId = typeof params.model === "string" ? params.model : "";

  const [chassisDetails, setChassisDetails] = useState<ChassisModel | null>(
    null
  );
  const [seriesDetails, setSeriesDetails] = useState<Series | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBodyCategory, setSelectedBodyCategory] =
    useState<string>("All Categories");
  const [availableBodyCategories, setAvailableBodyCategories] = useState<
    string[]
  >([]);
  const [availableBodies, setAvailableBodies] = useState<BodyVariant[]>([]);
  const [selectedBody, setSelectedBody] = useState<BodyVariant | null>(null);
  const [customDimensions, setCustomDimensions] = useState<CustomDimensionData>(
    {}
  );
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (seriesSlug && modelId) {
        setIsLoading(true);
        setError(null);
        try {
          const seriesDataResult = getSeriesData(seriesSlug);
          const modelDataResult = getModelData(seriesSlug, modelId);
          if (!modelDataResult) {
            setError(`Chassis model "${modelId}" not found.`);
            setChassisDetails(null);
            setSeriesDetails(null);
          } else {
            setChassisDetails(modelDataResult);
            setSeriesDetails(seriesDataResult);
          }
        } catch (e) {
          setError("Failed to load product information.");
          setChassisDetails(null);
          setSeriesDetails(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Invalid series or model identifier.");
        setIsLoading(false);
      }
    }
    fetchData();
  }, [seriesSlug, modelId]);

  useEffect(() => {
    if (seriesSlug && chassisDetails) {
      const categories = getAvailableBodyCategoriesForSeries(seriesSlug);
      setAvailableBodyCategories(
        Array.from(new Set(["All Categories", ...categories]))
      );
    } else {
      setAvailableBodyCategories(["All Categories"]);
    }
  }, [seriesSlug, chassisDetails]);

  useEffect(() => {
    if (seriesSlug && chassisDetails) {
      const bodies = getBodiesForSelectedCategory(
        selectedBodyCategory,
        seriesSlug,
        modelId
      );
      setAvailableBodies(bodies);
      if (selectedBody && !bodies.find((b) => b.id === selectedBody.id)) {
        setSelectedBody(null);
        setCustomDimensions({});
      }
    } else {
      setAvailableBodies([]);
      setSelectedBody(null);
      setCustomDimensions({});
    }
  }, [selectedBodyCategory, seriesSlug, modelId, chassisDetails, selectedBody]);

  const handleCategoryChange = useCallback((categoryName: string) => {
    setSelectedBodyCategory(categoryName);
    setSelectedBody(null);
    setCustomDimensions({});
  }, []);

  const handleBodySelect = useCallback(
    (body: BodyVariant) => {
      setSelectedBody(body);
      const initialBodyType = body.isCustom
        ? customDimensions.bodyId === body.id && customDimensions.bodyType
          ? customDimensions.bodyType
          : body.name
        : undefined;
      if (customDimensions.bodyId !== body.id) {
        setCustomDimensions({ bodyId: body.id, bodyType: initialBodyType });
      } else {
        setCustomDimensions((prev) => ({
          ...prev,
          bodyId: body.id,
          bodyType: initialBodyType,
        }));
      }
    },
    [customDimensions]
  );

  const handleDimensionsChange = useCallback(
    (dimensions: CustomDimensionData) => {
      setCustomDimensions((prev) => ({ ...prev, ...dimensions }));
    },
    []
  );

  const validateCustomDimensions = useCallback((): boolean => {
    if (!selectedBody?.isCustom) return true;
    const { bodyType, length, width, height, cubicMeter, liters } =
      customDimensions;
    if (!bodyType || String(bodyType).trim() === "") return false;
    if (selectedBody.customMeasurementType === "detailed") {
      const hasLWH =
        length &&
        String(length).trim() !== "" &&
        width &&
        String(width).trim() !== "" &&
        height &&
        String(height).trim() !== "";
      const hasCubicMeter = cubicMeter && String(cubicMeter).trim() !== "";
      const hasLiters = liters && String(liters).trim() !== "";
      return Boolean(hasLWH || hasCubicMeter || hasLiters);
    }
    return true;
  }, [selectedBody, customDimensions]);

  const handleAddToCart = useCallback(async () => {
    if (!chassisDetails || !selectedBody) {
      toast({ title: "Selection Required", variant: "destructive" });
      return;
    }
    if (selectedBody.isCustom && !validateCustomDimensions()) {
      toast({
        title: "Custom Dimensions Required",
        description:
          "Please enter a Body Type and at least one set of dimensions (L/W/H, Cubic Meters, or Liters).",
        variant: "destructive",
      });
      return;
    }
    setIsAddingToCart(true);
    try {
      const augBody = {
        id: selectedBody.id,
        name: selectedBody.name,
        image: selectedBody.image,
        isCustom: !!selectedBody.isCustom,
        userSpecifiedBodyType: selectedBody.isCustom
          ? String(customDimensions.bodyType || selectedBody.name).trim()
          : selectedBody.name,
        length: customDimensions.length
          ? String(customDimensions.length)
          : undefined,
        width: customDimensions.width
          ? String(customDimensions.width)
          : undefined,
        height: customDimensions.height
          ? String(customDimensions.height)
          : undefined,
        cubicMeter: customDimensions.cubicMeter
          ? String(customDimensions.cubicMeter)
          : undefined,
        liters: customDimensions.liters
          ? String(customDimensions.liters)
          : undefined,
      };
      const chassisDisplayName = `${chassisDetails.name} (Chassis) with ${augBody.userSpecifiedBodyType}`;
      addToCart({
        id: `chassis-${chassisDetails.id}-${selectedBody.id}-${Date.now()}`,
        name: chassisDisplayName,
        price: chassisDetails.price,
        image: chassisDetails.image,
        type: "chassis",
        selectedBody: augBody,
      } as Omit<CartItem, "quantity"> & { quantity: number });
      let bodyItemDisplayName = `${selectedBody.name} (Body)`;
      if (selectedBody.isCustom) {
        let sizeString = "";
        if (augBody.length && augBody.width && augBody.height)
          sizeString = `(${augBody.length}ft x ${augBody.width}ft x ${augBody.height}ft)`;
        else if (augBody.cubicMeter) sizeString = `(${augBody.cubicMeter} m³)`;
        else if (augBody.liters) sizeString = `(${augBody.liters} L)`;
        bodyItemDisplayName =
          `Custom Body (${augBody.userSpecifiedBodyType}) ${sizeString}`.trim();
      }
      addToCart({
        id: `body-${selectedBody.id}-${Date.now()}`,
        name: bodyItemDisplayName,
        price: selectedBody.isCustom
          ? 0
          : typeof selectedBody.price === "number"
          ? selectedBody.price
          : 0,
        image: selectedBody.image,
        type: "body",
        selectedBody: augBody,
      });
      toast({
        title: "Added to Cart",
        description: `${chassisDisplayName} has been added.`,
      });
      setSelectedBody(null);
      setCustomDimensions({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add items to cart.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  }, [
    chassisDetails,
    selectedBody,
    customDimensions,
    addToCart,
    toast,
    validateCustomDimensions,
  ]);

  const handleBuyNow = useCallback(async () => {
    if (!selectedBody) {
      toast({ title: "Selection Required", variant: "destructive" });
      return;
    }
    await handleAddToCart();
    if (!isAddingToCart) {
      router.push("/cart");
    }
  }, [selectedBody, handleAddToCart, router, toast, isAddingToCart]);

  // ... The rest of the JSX for this page is complex but doesn't need changes.
  // The provided code is complete and functional for this component.
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          <Link
            href={`/products/${seriesSlug}`}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            ← Back to {seriesDetails?.title || seriesSlug}
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-4 md:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Select or Define a Body for {chassisDetails?.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <aside className="md:col-span-1 lg:col-span-1 bg-white p-4 md:p-5 rounded-lg shadow-md self-start">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 md:mb-4">
              Body Categories
            </h2>
            <ul className="space-y-1">
              {availableBodyCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      selectedBodyCategory === category
                        ? "bg-red-600 text-white shadow-sm"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <section className="md:col-span-2 lg:col-span-3 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-4 md:p-5 rounded-lg shadow-md">
                <h3 className="text-md font-semibold text-gray-600 mb-3">
                  Selected Chassis
                </h3>
                {chassisDetails && (
                  <div className="flex items-center space-x-3">
                    <Image
                      src={chassisDetails.image}
                      alt={chassisDetails.name}
                      width={64}
                      height={48}
                      className="rounded object-contain"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {chassisDetails.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {chassisDetails.description}
                      </p>
                      <p className="text-red-600 font-bold mt-0.5">
                        PHP {chassisDetails.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white p-4 md:p-5 rounded-lg shadow-md">
                <h3 className="text-md font-semibold text-gray-600 mb-3">
                  Selected Body
                </h3>
                {selectedBody ? (
                  <div className="flex items-center space-x-3">
                    <Image
                      src={selectedBody.image}
                      alt={selectedBody.name}
                      width={64}
                      height={48}
                      className="rounded object-contain"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {selectedBody.isCustom && customDimensions.bodyType
                          ? String(customDimensions.bodyType)
                          : selectedBody.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {selectedBody.description}
                      </p>
                      <p className="text-red-600 font-bold mt-0.5">
                        {selectedBody.isCustom
                          ? CUSTOM_PRICE_TEXT
                          : typeof selectedBody.price === "number"
                          ? `PHP ${selectedBody.price.toLocaleString()}`
                          : String(selectedBody.price)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm">No body selected.</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 md:mb-4">
                Available Bodies for{" "}
                {selectedBodyCategory === "All Categories"
                  ? "All Compatible Categories"
                  : selectedBodyCategory}
              </h3>
              {availableBodies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableBodies.map((body) => (
                    <div
                      key={body.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleBodySelect(body)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleBodySelect(body)
                      }
                      className={`bg-white p-3 md:p-4 rounded-lg shadow-md cursor-pointer border-2 hover:shadow-lg transition-all ${
                        selectedBody?.id === body.id
                          ? "border-red-600 ring-2 ring-red-500/50"
                          : "border-gray-200 hover:border-red-400"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Image
                          src={body.image}
                          alt=""
                          width={80}
                          height={60}
                          className="rounded object-contain"
                        />
                        <div>
                          <h4
                            className={`font-semibold text-sm ${
                              selectedBody?.id === body.id
                                ? "text-red-600"
                                : "text-gray-800"
                            }`}
                          >
                            {body.name}
                          </h4>
                          <p className="text-xs text-gray-500 mb-1 leading-tight">
                            {body.description}
                          </p>
                          <p className="text-xs font-semibold">
                            Price:{" "}
                            {body.isCustom
                              ? CUSTOM_PRICE_TEXT
                              : typeof body.price === "number"
                              ? `PHP ${body.price.toLocaleString()}`
                              : String(body.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">
                    No bodies available for this category.
                  </p>
                </div>
              )}
            </div>
            {selectedBody && selectedBody.isCustom && (
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <CustomBodyForm
                  selectedBody={selectedBody}
                  onDimensionsChange={handleDimensionsChange}
                  initialDimensions={
                    customDimensions.bodyId === selectedBody.id
                      ? customDimensions
                      : { bodyId: selectedBody.id, bodyType: selectedBody.name }
                  }
                />
              </div>
            )}
            <div className="bg-white p-4 md:p-5 rounded-lg shadow-md mt-4 md:mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Next Steps
              </h3>
              <p className="text-xs text-gray-500 mb-3 md:mb-4">
                Total Estimated Price:{" "}
                <span className="font-bold">
                  {useMemo(() => {
                    if (!chassisDetails) return "Calculating...";
                    let total = chassisDetails.price;
                    let suffix = "";
                    if (selectedBody) {
                      if (selectedBody.isCustom)
                        suffix = ` + Body (${CUSTOM_PRICE_TEXT})`;
                      else if (typeof selectedBody.price === "number")
                        total += selectedBody.price;
                      else suffix = ` + Body (${selectedBody.price})`;
                    }
                    return `PHP ${total.toLocaleString()}${
                      suffix || (selectedBody ? "" : " (Select a body)")
                    }`;
                  }, [chassisDetails, selectedBody])}
                </span>
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-sm"
                  disabled={!selectedBody || isAddingToCart}
                  size="lg"
                >
                  {isAddingToCart ? "Adding..." : "Add to Package Cart"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-sm"
                  disabled={!selectedBody || isAddingToCart}
                  size="lg"
                >
                  {isAddingToCart ? "Processing..." : "Buy Complete Package"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
