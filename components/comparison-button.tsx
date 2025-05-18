"use client";

import { Button } from "@/components/ui/button";
import { useComparison } from "@/context/comparison-context";
import { BarChart2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ComparisonButtonProps {
  item: {
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
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

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
        inComparison ? "bg-green-50 text-green-600 border-green-600" : ""
      }`}
      onClick={handleToggleComparison}
    >
      {inComparison ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added to Compare
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
