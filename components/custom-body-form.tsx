// components/custom-body-form.tsx
"use client";

import { categoryCustomMeasurementConfig } from "@/lib/data"; // Ensure this path is correct
import React, { useState, useEffect } from "react";

// Make sure CustomMeasurementType from your lib/data.ts includes 'detailed'
import type { CustomMeasurementType as LibCustomMeasurementType } from "@/lib/data";

interface BodyVariantForForm {
  // Renamed to avoid conflict if BodyVariant is imported from elsewhere with more fields
  id: string;
  name: string;
  isCustom?: boolean;
  customMeasurementType?: LibCustomMeasurementType;
  categoryForMeasurement?: string;
}

export interface CustomDimensionData {
  bodyId?: string; // ID of the selectedBody these dimensions are for
  bodyType?: string; // For "Custom Body Type" input
  length?: string | number;
  width?: string | number;
  height?: string | number;
  cubicMeter?: string | number;
  liters?: string | number;
  volume?: string | number; // For 'volume' measurement type
  [key: string]: string | number | undefined;
}

interface CustomBodyFormProps {
  selectedBody: BodyVariantForForm;
  onDimensionsChange: (dimensions: CustomDimensionData) => void;
  initialDimensions?: CustomDimensionData;
}

const CustomBodyForm: React.FC<CustomBodyFormProps> = ({
  selectedBody,
  onDimensionsChange,
  initialDimensions,
}) => {
  const [length, setLength] = useState(
    initialDimensions?.length?.toString() || ""
  );
  const [width, setWidth] = useState(
    initialDimensions?.width?.toString() || ""
  );
  const [height, setHeight] = useState(
    initialDimensions?.height?.toString() || ""
  );
  const [volume, setVolume] = useState(
    initialDimensions?.volume?.toString() || ""
  );
  const [bodyType, setBodyType] = useState(
    initialDimensions?.bodyType?.toString() || ""
  );
  const [cubicMeter, setCubicMeter] = useState(
    initialDimensions?.cubicMeter?.toString() || ""
  );
  const [liters, setLiters] = useState(
    initialDimensions?.liters?.toString() || ""
  );

  const measurementType =
    selectedBody.customMeasurementType ||
    ((selectedBody.categoryForMeasurement && categoryCustomMeasurementConfig
      ? categoryCustomMeasurementConfig[selectedBody.categoryForMeasurement]
      : undefined) as LibCustomMeasurementType | undefined);

  useEffect(() => {
    const isMatchingInitialDimension =
      selectedBody.isCustom &&
      initialDimensions &&
      initialDimensions.bodyId === selectedBody.id;

    const getDim = (key: keyof CustomDimensionData) =>
      isMatchingInitialDimension
        ? initialDimensions?.[key]?.toString() || ""
        : "";

    setLength(getDim("length"));
    setWidth(getDim("width"));
    setHeight(getDim("height"));
    setVolume(getDim("volume"));
    setBodyType(getDim("bodyType"));
    setCubicMeter(getDim("cubicMeter"));
    setLiters(getDim("liters"));
  }, [selectedBody.id, selectedBody.isCustom, initialDimensions]);

  useEffect(() => {
    const dimensions: CustomDimensionData = {
      bodyId: selectedBody.id,
    };

    if (measurementType === "detailed") {
      dimensions.bodyType = bodyType || undefined;
      dimensions.length = length || undefined;
      dimensions.width = width || undefined;
      dimensions.height = height || undefined;
      dimensions.cubicMeter = cubicMeter || undefined;
      dimensions.liters = liters || undefined;
    } else if (measurementType === "lwh") {
      dimensions.length = length || undefined;
      dimensions.width = width || undefined;
      dimensions.height = height || undefined;
    } else if (measurementType === "volume") {
      dimensions.volume = volume || undefined;
    }

    if (measurementType && selectedBody.isCustom) {
      onDimensionsChange(dimensions);
    }
  }, [
    length,
    width,
    height,
    volume,
    bodyType,
    cubicMeter,
    liters,
    measurementType,
    onDimensionsChange,
    selectedBody.id,
    selectedBody.isCustom,
  ]);

  if (!selectedBody.isCustom || !measurementType) {
    return null;
  }

  return (
    <div className="custom-body-form mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">
        Specify Dimensions for: {selectedBody.name}
      </h4>

      {measurementType === "detailed" && (
        <div className="space-y-3">
          <div>
            <label
              htmlFor={`custom-bodyType-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Custom Body Type
            </label>
            <input
              type="text"
              id={`custom-bodyType-${selectedBody.id}`}
              name="custom-bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., Insulated Van with Side Door"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-length-detailed-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Length (ft.)
            </label>
            <input
              type="number"
              id={`custom-length-detailed-${selectedBody.id}`}
              name="custom-length-detailed"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 10"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-width-detailed-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Width (ft.)
            </label>
            <input
              type="number"
              id={`custom-width-detailed-${selectedBody.id}`}
              name="custom-width-detailed"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 7"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-height-detailed-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Height (ft.)
            </label>
            <input
              type="number"
              id={`custom-height-detailed-${selectedBody.id}`}
              name="custom-height-detailed"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 6"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-cubicMeter-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Cubic Meter (m³){" "}
              <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              type="number"
              id={`custom-cubicMeter-${selectedBody.id}`}
              name="custom-cubicMeter"
              value={cubicMeter}
              onChange={(e) => setCubicMeter(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 12"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-liters-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Liters (L){" "}
              <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              type="number"
              id={`custom-liters-${selectedBody.id}`}
              name="custom-liters"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 12000"
              min="0"
              step="1"
            />
          </div>
        </div>
      )}

      {measurementType === "lwh" && (
        <div className="space-y-3">
          <div>
            <label
              htmlFor={`custom-length-lwh-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Length (ft.)
            </label>
            <input
              type="number"
              id={`custom-length-lwh-${selectedBody.id}`}
              name="custom-length-lwh"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., 10"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-width-lwh-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Width (ft.)
            </label>
            <input
              type="number"
              id={`custom-width-lwh-${selectedBody.id}`}
              name="custom-width-lwh"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., 7"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor={`custom-height-lwh-${selectedBody.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Height (ft.)
            </label>
            <input
              type="number"
              id={`custom-height-lwh-${selectedBody.id}`}
              name="custom-height-lwh"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., 6"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      )}

      {measurementType === "volume" && (
        <div>
          <label
            htmlFor={`custom-volume-${selectedBody.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Volume (cu. ft.)
          </label>
          <input
            type="number"
            id={`custom-volume-${selectedBody.id}`}
            name="custom-volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., 420"
            min="0"
            step="0.1"
          />
        </div>
      )}
    </div>
  );
};

export default CustomBodyForm;
