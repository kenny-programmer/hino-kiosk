"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ComparisonItem = {
  id: string;
  type: "chassis" | "body" | "bus" | "puv";
  name: string;
  series?: string;
  model?: string;
  price: number;
  image: string;
  specifications?: Record<string, string | number>;
  engine?: string;
  bodyType?: string[];
  compatibleSeries?: string[];
};

type ComparisonContextType = {
  comparisonItems: ComparisonItem[];
  addToComparison: (item: ComparisonItem) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
};

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([]);

  const addToComparison = (item: ComparisonItem) => {
    setComparisonItems((prevItems) => {
      // Check if item already exists
      if (prevItems.some((i) => i.id === item.id)) {
        return prevItems;
      }

      // Limit to 4 items maximum
      if (prevItems.length >= 4) {
        return [...prevItems.slice(1), item];
      }

      return [...prevItems, item];
    });
  };

  const removeFromComparison = (id: string) => {
    setComparisonItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const clearComparison = () => {
    setComparisonItems([]);
  };

  const isInComparison = (id: string) => {
    return comparisonItems.some((item) => item.id === id);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonItems,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}
