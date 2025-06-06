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
} from "@/lib/data";
import CustomBodyForm, {
  CustomDimensionData,
} from "@/components/custom-body-form";
import { useCart, CartItem } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";

const CUSTOM_PRICE_TEXT = "Price varies depending on size";

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
            setError(
              `Chassis model "${modelId}" not found in series "${seriesSlug}".`
            );
            setChassisDetails(null);
            setSeriesDetails(null);
          } else {
            setChassisDetails(modelDataResult);
            setSeriesDetails(seriesDataResult);
          }
        } catch (e) {
          console.error("Error fetching chassis/series data:", e);
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
      const uniqueCategories = Array.from(
        new Set(["All Categories", ...categories])
      );
      setAvailableBodyCategories(uniqueCategories);
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
      // Prime customDimensions with bodyId, and reset other fields if it's a new body.
      // If bodyType is part of initialDimensions and should be pre-filled from body.name for custom types:
      const initialBodyType = body.isCustom
        ? customDimensions.bodyId === body.id
          ? customDimensions.bodyType
          : body.name
        : undefined;
      setCustomDimensions({ bodyId: body.id, bodyType: initialBodyType });
    },
    [customDimensions]
  ); // Add customDimensions as a dependency if it's used to preserve bodyType

  const handleDimensionsChange = useCallback(
    (dimensions: CustomDimensionData) => {
      setCustomDimensions((prev) => ({ ...prev, ...dimensions }));
    },
    []
  );

  const validateCustomDimensions = (): boolean => {
    if (!selectedBody?.isCustom) return true;
    // This validation is key. If it's not passing, handleAddToCart won't get the right data.
    if (selectedBody.customMeasurementType === "detailed") {
      const { bodyType, length, width, height } = customDimensions;
      // For detailed, bodyType is also mandatory.
      return !!(
        bodyType &&
        String(bodyType).trim() &&
        length &&
        String(length).trim() &&
        width &&
        String(width).trim() &&
        height &&
        String(height).trim()
      );
    } else if (selectedBody.customMeasurementType === "lwh") {
      const { length, width, height } = customDimensions;
      return !!(
        length &&
        String(length).trim() &&
        width &&
        String(width).trim() &&
        height &&
        String(height).trim()
      );
    } else if (selectedBody.customMeasurementType === "volume") {
      return !!(
        customDimensions.volume && String(customDimensions.volume).trim()
      );
    }
    return true; // Default for custom types without specific dimension requirements
  };

  const handleAddToCart = useCallback(async () => {
    if (!chassisDetails || !selectedBody) {
      toast({
        title: "Selection Required",
        description: "Please select both chassis and body.",
        variant: "destructive",
      });
      return;
    }

    if (selectedBody.isCustom && !validateCustomDimensions()) {
      toast({
        title: "Custom Dimensions Required",
        description:
          "Please fill in all required dimensions for the custom body.",
        variant: "destructive",
      });
      console.error(
        "Validation Failed. Custom Dimensions:",
        customDimensions,
        "Selected Body:",
        selectedBody
      );
      return;
    }

    setIsAddingToCart(true);
    try {
      // This object becomes item.selectedBody in the cart
      const augmentedBodyDetailsForCartItem = {
        ...selectedBody, // Base properties from BodyVariant
        isDetailedCustomBody:
          selectedBody.isCustom &&
          selectedBody.customMeasurementType === "detailed",
        userSpecifiedBodyType: String(
          customDimensions.bodyType || selectedBody.name
        ).trim(), // Use actual input or fallback
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
        volume: customDimensions.volume
          ? String(customDimensions.volume)
          : undefined,
        priceText: selectedBody.isCustom ? CUSTOM_PRICE_TEXT : undefined, // Crucial for cart display
        numericPrice: selectedBody.isCustom // Price of body spec item is 0, chassis has its own price
          ? 0
          : typeof selectedBody.price === "number"
          ? selectedBody.price
          : 0,
      };

      // --- CHASSIS ITEM ---
      const chassisItemName = `${chassisDetails.name} (Chassis) with Custom Body`;
      const chassisCartItem: CartItem = {
        id: `chassis-${chassisDetails.id}-${selectedBody.id}-${Date.now()}`, // More unique
        name: chassisItemName,
        price: chassisDetails.price,
        quantity: 1,
        image: chassisDetails.image,
        type: "chassis" as const,
        selectedBody: augmentedBodyDetailsForCartItem, // Link to the body spec
      };

      // --- BODY SPECIFICATION ITEM NAME GENERATION ---
      let bodyItemName: string;
      const priceTextSuffix = `..... ${CUSTOM_PRICE_TEXT}`;
      // Use values from augmentedBodyDetailsForCartItem as these are what's stored in cart
      const actualUserEnteredBodyType =
        augmentedBodyDetailsForCartItem.userSpecifiedBodyType; // Already has fallback to selectedBody.name

      if (selectedBody.isCustom) {
        let actualSizeString = "";
        const dimsArray = [];

        // LWH takes precedence if all parts are available
        if (
          augmentedBodyDetailsForCartItem.length &&
          augmentedBodyDetailsForCartItem.width &&
          augmentedBodyDetailsForCartItem.height
        ) {
          dimsArray.push(`${augmentedBodyDetailsForCartItem.length}ft`);
          dimsArray.push(`${augmentedBodyDetailsForCartItem.width}ft`);
          dimsArray.push(`${augmentedBodyDetailsForCartItem.height}ft`);
          actualSizeString = `(${dimsArray.join(" x ")})`;
        }
        // Then check for other specific measurements if LWH wasn't fully provided or applicable
        else if (augmentedBodyDetailsForCartItem.cubicMeter) {
          actualSizeString = `(${augmentedBodyDetailsForCartItem.cubicMeter} m³)`;
        } else if (augmentedBodyDetailsForCartItem.liters) {
          actualSizeString = `(${augmentedBodyDetailsForCartItem.liters} L)`;
        } else if (augmentedBodyDetailsForCartItem.volume) {
          // General volume for 'volume' type
          actualSizeString = `(${augmentedBodyDetailsForCartItem.volume} cu. ft.)`;
        }

        // Fallback if no specific dimensions were captured or applicable for a custom body
        if (!actualSizeString) {
          // actualSizeString will be empty if no conditions above met
          actualSizeString = "(Custom Size)";
        }

        // Format: Custom Body (Actual Custom Body Type) (Actual size string) ..... Price varies depending on size
        let namePrefix = `Custom Body (${actualUserEnteredBodyType})`;
        if (actualSizeString) {
          // Append size string only if it's not empty
          namePrefix += ` ${actualSizeString}`;
        }
        bodyItemName = `${namePrefix.trim()}`;
      } else {
        // Standard, non-custom body
        bodyItemName = `${selectedBody.name} (Body)`; // This remains unchanged for standard bodies.
      }
      // --- END BODY SPECIFICATION ITEM NAME GENERATION ---

      const bodyCartItem: CartItem = {
        id: `body-${selectedBody.id}-${Date.now()}`, // Ensure unique
        name: bodyItemName,
        price: 0, // Price for the specification line item itself is 0; its cost is variable
        quantity: 1, // Quantity of body spec is 1, tied to chassis
        image: selectedBody.image, // Could be a generic "custom body" image
        type: "body" as const,
        selectedBody: augmentedBodyDetailsForCartItem, // This holds all crucial details including priceText
      };

      addToCart(chassisCartItem);
      addToCart(bodyCartItem);

      toast({
        title: "Added to Cart",
        description: `${chassisDetails.name} with ${actualUserEnteredBodyType} has been added.`, // Use the determined body type
      });
      setSelectedBody(null);
      setCustomDimensions({}); // Reset dimensions after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add items to cart. Please try again.",
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
    if (!chassisDetails || !selectedBody) {
      toast({
        title: "Selection Required",
        description: "Please select chassis and body.",
        variant: "destructive",
      });
      return;
    }
    if (selectedBody.isCustom && !validateCustomDimensions()) {
      toast({
        title: "Custom Dimensions Required",
        description: "Please fill required dimensions.",
        variant: "destructive",
      });
      return;
    }
    // Add to cart first, then redirect.
    // handleAddToCart is async but we don't necessarily need to await it if router.push can happen after state updates.
    // However, to ensure cart is updated before navigating, especially if cart state is used immediately on next page:
    await handleAddToCart();
    // Only push if not still adding (e.g. if handleAddToCart had an early return due to error)
    // A more robust way would be for handleAddToCart to return a success boolean.
    // For now, assuming successful add will clear selectedBody or similar.
    if (!isAddingToCart) {
      // Check if not still in processing state (though it should be reset by finally)
      router.push("/cart");
    }
  }, [
    chassisDetails,
    selectedBody,
    handleAddToCart,
    router,
    toast,
    validateCustomDimensions,
    isAddingToCart, // Added isAddingToCart to dependencies
  ]);

  const summaryChassisPrice = chassisDetails?.price || 0;
  const summaryBodyPriceDisplay = useMemo(() => {
    if (!selectedBody) return "PHP 0";
    if (selectedBody.isCustom) return CUSTOM_PRICE_TEXT;
    return typeof selectedBody.price === "number"
      ? `PHP ${selectedBody.price.toLocaleString()}`
      : String(selectedBody.price);
  }, [selectedBody]);

  const totalEstimatedPriceDisplay = useMemo(() => {
    if (!chassisDetails) return "Calculating...";
    let total = chassisDetails.price;
    let bodyPriceText = "";
    if (selectedBody) {
      if (selectedBody.isCustom) {
        bodyPriceText = ` + Body (${CUSTOM_PRICE_TEXT})`;
      } else if (typeof selectedBody.price === "number") {
        total += selectedBody.price;
      } else {
        // Price is a string
        bodyPriceText = ` + Body (${selectedBody.price})`;
      }
    }
    return `PHP ${total.toLocaleString()}${
      bodyPriceText || (selectedBody ? "" : " (Select a body)")
    }`;
  }, [chassisDetails, selectedBody]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 animate-pulse">
          Loading Configuration...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <Link
          href="/products"
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }
  if (!chassisDetails) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Chassis information not available.
        </p>
      </div>
    );
  }

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    body: BodyVariant
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBodySelect(body);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          <Link
            href={`/products/${seriesSlug}`}
            className="text-red-600 hover:text-red-800 text-sm"
            aria-label={`Back to ${seriesDetails?.title || seriesSlug}`}
          >
            ← Back to {seriesDetails?.title || seriesSlug}
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-4 md:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Select or Define a Body for {chassisDetails.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <aside
            className="md:col-span-1 lg:col-span-1 bg-white p-4 md:p-5 rounded-lg shadow-md self-start"
            aria-labelledby="body-categories-heading"
          >
            <h2
              id="body-categories-heading"
              className="text-lg font-semibold text-gray-700 mb-3 md:mb-4"
            >
              Body Categories
            </h2>
            <ul
              className="space-y-1"
              role="listbox"
              aria-orientation="vertical"
            >
              {availableBodyCategories.map((category) => (
                <li
                  key={category}
                  role="option"
                  aria-selected={selectedBodyCategory === category}
                >
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
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
          <section
            className="md:col-span-2 lg:col-span-3 space-y-4 md:space-y-6"
            aria-labelledby="body-configuration-heading"
          >
            <h2 id="body-configuration-heading" className="sr-only">
              Body Configuration Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div
                className="bg-white p-4 md:p-5 rounded-lg shadow-md"
                aria-labelledby="selected-chassis-heading"
              >
                <h3
                  id="selected-chassis-heading"
                  className="text-md font-semibold text-gray-600 mb-3"
                >
                  Selected Chassis
                </h3>
                <div className="flex items-center space-x-3">
                  <Image
                    src={chassisDetails.image}
                    alt={chassisDetails.name}
                    width={64}
                    height={48}
                    className="rounded object-contain flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {chassisDetails.name}
                    </p>
                    <p
                      className="text-xs text-gray-500 truncate"
                      title={chassisDetails.description}
                    >
                      {chassisDetails.description}
                    </p>
                    <p className="text-red-600 font-bold mt-0.5">
                      PHP {summaryChassisPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="bg-white p-4 md:p-5 rounded-lg shadow-md"
                aria-labelledby="selected-body-heading"
              >
                <h3
                  id="selected-body-heading"
                  className="text-md font-semibold text-gray-600 mb-3"
                >
                  Selected Body
                </h3>
                {selectedBody ? (
                  <div className="flex items-center space-x-3">
                    <Image
                      src={selectedBody.image}
                      alt={selectedBody.name}
                      width={64}
                      height={48}
                      className="rounded object-contain flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {/* Show user-entered body type if available and custom, else original name */}
                        {selectedBody.isCustom && customDimensions.bodyType
                          ? String(customDimensions.bodyType)
                          : selectedBody.name}
                      </p>
                      <p
                        className="text-xs text-gray-500 truncate"
                        title={selectedBody.description}
                      >
                        {selectedBody.description}
                      </p>
                      <p className="text-red-600 font-bold mt-0.5">
                        {summaryBodyPriceDisplay}
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
            <div aria-labelledby="available-bodies-heading">
              <h3
                id="available-bodies-heading"
                className="text-lg font-semibold text-gray-700 mb-3 md:mb-4"
              >
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
                      onKeyDown={(e) => handleCardKeyDown(e, body)}
                      aria-pressed={selectedBody?.id === body.id}
                      aria-label={`Select body: ${body.name}`}
                      className={`bg-white p-3 md:p-4 rounded-lg shadow-md cursor-pointer border-2 hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                        selectedBody?.id === body.id
                          ? "border-red-600 ring-2 ring-red-500/50"
                          : "border-gray-200 hover:border-red-400"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Image
                          src={body.image}
                          alt="" // Decorative image, alt text provided by context
                          width={80}
                          height={60}
                          className="rounded object-contain flex-shrink-0 mt-1"
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
                    No bodies available for "{selectedBodyCategory}" with this
                    chassis config.
                  </p>
                </div>
              )}
            </div>
            {selectedBody && selectedBody.isCustom && (
              <div
                className="bg-white p-4 md:p-6 rounded-lg shadow-md"
                aria-live="polite"
              >
                <CustomBodyForm
                  selectedBody={selectedBody}
                  onDimensionsChange={handleDimensionsChange}
                  initialDimensions={
                    customDimensions.bodyId === selectedBody.id
                      ? customDimensions // Pass current dimensions if they are for this body
                      : { bodyId: selectedBody.id, bodyType: selectedBody.name } // Prime with bodyId and default bodyType
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
                <span className="font-bold">{totalEstimatedPriceDisplay}</span>
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:gap-3">
                <button
                  aria-label="Add selected package to cart"
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-md hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedBody || isAddingToCart}
                >
                  {isAddingToCart ? "Adding..." : "Add to Package Cart"}
                </button>
                <button
                  aria-label="Buy complete package"
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-500 text-white px-4 py-2.5 rounded-md hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedBody || isAddingToCart}
                >
                  {isAddingToCart ? "Processing..." : "Buy Complete Package"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
