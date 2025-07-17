// components/ui/FeedbackDialog.tsx

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRatings from "react-star-ratings";
import { Label } from "./label";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number, feedback: string) => void;
  isSubmitting: boolean;
}

export default function FeedbackDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: FeedbackDialogProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(rating, feedback);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave a Feedback</DialogTitle>
          <DialogDescription>
            Let us know how we did. Your feedback helps us improve.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center space-y-2">
            <Label className="text-sm font-medium">Your Rating *</Label>
            <StarRatings
              rating={rating}
              starRatedColor="#f59e0b" // A nice gold/amber color
              starHoverColor="#f59e0b"
              changeRating={setRating}
              numberOfStars={5}
              name="rating"
              starDimension="35px"
              starSpacing="4px"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">
              Your Comments
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us more about your experience..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}