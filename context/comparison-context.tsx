// context/comparison-context.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { Model } from "@/lib/data";

export interface ComparisonItem extends Model {}

interface ComparisonContextType {
  comparisonItems: ComparisonItem[];
  addToComparison: (item: Model) => void;
  removeFromComparison: (itemId: string) => void;
  clearComparison: () => void;
  isInComparison: (itemId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedComparison = localStorage.getItem("comparisonItems");
      if (savedComparison) {
        setComparisonItems(JSON.parse(savedComparison));
      }
    } catch (error) {
      console.error(
        "Failed to parse comparison items from localStorage",
        error
      );
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("comparisonItems", JSON.stringify(comparisonItems));
    }
  }, [comparisonItems, isMounted]);

  const addToComparison = (item: Model) => {
    setComparisonItems((prevItems) => {
      if (prevItems.some((i) => i.id === item.id)) {
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

  // --- THIS IS THE CRITICAL FIX ---
  // The logic was `item.id === item.id` which was always true if the array had items.
  // It is now correctly `item.id === itemId`.
  const isInComparison = (itemId: string) => {
    return comparisonItems.some((item) => item.id === itemId);
  };
  // --- END OF FIX ---

  const value = {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
  };

  return (
    <ComparisonContext.Provider value={value}>
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
