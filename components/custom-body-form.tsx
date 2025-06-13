// components/custom-body-form.tsx
"use client";

import { categoryCustomMeasurementConfig } from "@/lib/data";
import React from "react";
import type { CustomMeasurementType as LibCustomMeasurementType } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface BodyVariantForForm {
  id: string;
  name: string;
  isCustom?: boolean;
  customMeasurementType?: LibCustomMeasurementType;
  categoryForMeasurement?: string;
}

export interface CustomDimensionData {
  bodyId?: string;
  bodyType?: string;
  length?: string | number;
  width?: string | number;
  height?: string | number;
  cubicMeter?: string | number;
  liters?: string | number;
  volume?: string | number;
  isAirconditioned?: boolean;
  airconDetails?: string;
  [key: string]: string | number | boolean | undefined;
}

interface CustomBodyFormProps {
  selectedBody: BodyVariantForForm;
  // The component now receives the full dimensions object directly
  dimensions: CustomDimensionData;
  // The handler now passes the field and value up
  onDimensionsChange: (
    field: keyof CustomDimensionData,
    value: string | boolean
  ) => void;
}

const CustomBodyForm: React.FC<CustomBodyFormProps> = ({
  selectedBody,
  dimensions,
  onDimensionsChange,
}) => {
  const measurementType =
    selectedBody.customMeasurementType ||
    (selectedBody.categoryForMeasurement &&
      categoryCustomMeasurementConfig[selectedBody.categoryForMeasurement]);

  if (!selectedBody.isCustom || !measurementType) {
    return null;
  }

  const renderInputField = (
    name: keyof CustomDimensionData,
    label: string,
    placeholder: string,
    type: string = "number",
    step: string = "0.1"
  ) => (
    <div>
      <Label
        htmlFor={`${name}-${selectedBody.id}`}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </Label>
      <Input
        type={type}
        id={`${name}-${selectedBody.id}`}
        name={name as string}
        value={String(dimensions[name] || "")}
        onChange={(e) => onDimensionsChange(name, e.target.value)}
        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
        placeholder={placeholder}
        min="0"
        step={step}
      />
    </div>
  );

  return (
    <div className="custom-body-form mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">
        Specify Dimensions for: {dimensions.bodyType || selectedBody.name}
      </h4>

      {measurementType === "detailed" && (
        <div className="space-y-3">
          {renderInputField(
            "bodyType",
            "Custom Body Type",
            "e.g., Insulated Van with Side Door",
            "text"
          )}
          {renderInputField("length", "Length (ft.)", "e.g., 10")}
          {renderInputField("width", "Width (ft.)", "e.g., 7")}
          {renderInputField("height", "Height (ft.)", "e.g., 6")}
          {renderInputField(
            "cubicMeter",
            "Cubic Meter (m³)",
            "e.g., 12",
            "number",
            "0.01"
          )}
          {renderInputField(
            "liters",
            "Liters (L)",
            "e.g., 12000",
            "number",
            "1"
          )}
        </div>
      )}

      {measurementType === "lwh" && (
        <div className="space-y-3">
          {renderInputField("length", "Length (ft.)", "e.g., 10")}
          {renderInputField("width", "Width (ft.)", "e.g., 7")}
          {renderInputField("height", "Height (ft.)", "e.g., 6")}
        </div>
      )}

      {measurementType === "volume" && (
        <div>{renderInputField("volume", "Volume (cu. ft.)", "e.g., 420")}</div>
      )}

      {selectedBody.categoryForMeasurement === "Multipurpose Van" && (
        <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`aircon-${selectedBody.id}`}
              checked={!!dimensions.isAirconditioned}
              onCheckedChange={(checked) =>
                onDimensionsChange("isAirconditioned", !!checked)
              }
            />
            <Label
              htmlFor={`aircon-${selectedBody.id}`}
              className="font-medium text-sm cursor-pointer"
            >
              Include Airconditioning?
            </Label>
          </div>
          {dimensions.isAirconditioned && (
            <div>
              <Label
                htmlFor={`aircon-details-${selectedBody.id}`}
                className="text-sm"
              >
                Airconditioning Details (optional)
              </Label>
              <Input
                id={`aircon-details-${selectedBody.id}`}
                name="airconDetails"
                type="text"
                placeholder="e.g., Brand, Type, with Rear Blower"
                value={String(dimensions.airconDetails || "")}
                onChange={(e) =>
                  onDimensionsChange("airconDetails", e.target.value)
                }
                className="mt-1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomBodyForm;
