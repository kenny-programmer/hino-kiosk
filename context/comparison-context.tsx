"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// The main fix is here: 'airconditioned' is now a known property.
export interface ComparisonItem {
  id: string;
  type: "chassis" | "body" | "bus" | "puv";
  name: string;
  price: number;
  image: string;
  specifications?: Record<string, any>;
  engine?: string;
  bodyType?: string[];
  compatibleSeries?: string[];
  series?: string;
  model?: string;
  airconditioned?: boolean; // <-- THE FIX IS ADDED HERE
}

interface ComparisonContextType {
  comparisonItems: ComparisonItem[];
  addToComparison: (item: ComparisonItem) => void;
  removeFromComparison: (itemId: string) => void;
  clearComparison: () => void;
  isInComparison: (itemId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([]);

  const addToComparison = (item: ComparisonItem) => {
    setComparisonItems((prevItems) => {
      if (prevItems.find((i) => i.id === item.id) || prevItems.length >= 4) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromComparison = (itemId: string) => {
    setComparisonItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const clearComparison = () => {
    setComparisonItems([]);
  };

  const isInComparison = (itemId: string) => {
    return comparisonItems.some((item) => item.id === itemId);
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
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
