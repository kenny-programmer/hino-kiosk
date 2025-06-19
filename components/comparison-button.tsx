// components/comparison-button.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useComparison } from "@/context/comparison-context";
import { BarChart2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Model } from "@/lib/data"; // CRITICAL: Import the master Model type

// --- THIS IS THE KEY FIX ---
// The item prop is now strictly typed as a Model.
// This guarantees it has all required properties like 'description' and the correct 'specifications' type.
interface ComparisonButtonProps {
  item: Model;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}
// --- END OF FIX ---

export function ComparisonButton({
  item,
  variant = "outline",
  size = "default",
  className = "",
}: ComparisonButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison } =
    useComparison();
  const { toast } = useToast();

  const inComparison = isInComparison(item.id);

  const handleToggleComparison = () => {
    if (inComparison) {
      removeFromComparison(item.id);
      toast({
        title: "Removed from comparison",
        description: `${item.name} has been removed from comparison`,
      });
    } else {
      // 'item' is now guaranteed to be a valid Model, so this works perfectly.
      addToComparison(item);
      toast({
        title: "Added to comparison",
        description: `${item.name} has been added to comparison`,
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${
        inComparison
          ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
          : ""
      }`}
      onClick={handleToggleComparison}
    >
      {inComparison ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <BarChart2 className="mr-2 h-4 w-4" />
          Compare
        </>
      )}
    </Button>
  );
}
