// app/cart/page.tsx
"use client";

import type ReactImport from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  CreditCard,
  ArrowLeft,
  Download,
  FileText,
} from "lucide-react";
import { useCart, CartItem } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

interface OrderExportItem {
  /* ... as before ... */ id: string | number;
  name: string;
  price: number | string;
  quantity: number;
  image?: string;
}
interface OrderDataForExport {
  /* ... as before ... */ orderDate: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    barangay: string;
    city: string;
    province: string;
  };
  items: OrderExportItem[];
  total: string;
}

const CUSTOM_BODY_IMAGE_PLACEHOLDER = "/custom-body-placeholder.png"; // Make sure this image exists in your public folder

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  // ... other state ...
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    barangay: "",
    city: "",
    province: "",
  });

  const calculateTotalPriceDisplay = (): string => {
    /* ... same logic as before ... */
    let numericTotal = 0;
    let hasVariablePriceItem = false;
    cart.forEach((item: CartItem) => {
      if (item.type === "chassis") {
        numericTotal += item.price * item.quantity;
      }
      if (
        item.type === "body" &&
        item.selectedBody?.priceText?.toLowerCase().includes("varies")
      ) {
        hasVariablePriceItem = true;
      }
    });
    if (hasVariablePriceItem) {
      return (
        (numericTotal > 0 ? `₱${numericTotal.toLocaleString()} + ` : "") +
        "Custom Body Costs"
      );
    }
    return `₱${numericTotal.toLocaleString()}`;
  };
  const totalPriceDisplay = calculateTotalPriceDisplay();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    /* ... */ const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };
  const generatePDF = (orderData: OrderDataForExport): string => {
    /* ... same logic ... */
    const pdf = new jsPDF();
    let yPosition = 20;
    pdf.setFontSize(20);
    pdf.text("Hino Motors Philippines", 105, yPosition, { align: "center" });
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.text("Order Summary", 105, yPosition, { align: "center" });
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.text(
      `Date: ${format(new Date(orderData.orderDate), "PPP")}`,
      105,
      yPosition,
      { align: "center" }
    );
    yPosition += 20;
    pdf.setFontSize(16);
    pdf.text("Customer Information", 20, yPosition);
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.text(`Name: ${orderData.customer.fullName}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Email: ${orderData.customer.email}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Phone: ${orderData.customer.phone}`, 20, yPosition);
    yPosition += 7;
    pdf.text(
      `Address: ${orderData.customer.barangay}, ${orderData.customer.city}, ${orderData.customer.province}`,
      20,
      yPosition
    );
    yPosition += 20;
    pdf.setFontSize(16);
    pdf.text("Order Items", 20, yPosition);
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.text("Item", 20, yPosition);
    pdf.text("Price", 100, yPosition);
    pdf.text("Qty", 130, yPosition);
    pdf.text("Total", 160, yPosition);
    yPosition += 5;
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    orderData.items.forEach((item) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      const priceText =
        typeof item.price === "number"
          ? `₱${item.price.toLocaleString()}`
          : String(item.price);
      const totalText =
        typeof item.price === "number"
          ? `₱${(item.price * item.quantity).toLocaleString()}`
          : String(item.price);
      pdf.text(
        item.name.substring(0, 35) + (item.name.length > 35 ? "..." : ""),
        20,
        yPosition
      );
      pdf.text(priceText, 100, yPosition);
      pdf.text(item.quantity.toString(), 130, yPosition);
      pdf.text(totalText, 160, yPosition);
      yPosition += 8;
    });
    yPosition += 10;
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.text(`Total Amount: ${orderData.total}`, 160, yPosition, {
      align: "right",
    });
    return pdf.output("datauristring").split(",")[1];
  };
  const sendEmailWithPDF = async (
    orderData: OrderDataForExport,
    pdfBase64: string
  ): Promise<boolean> => {
    /* ... same logic ... */
    try {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      if (
        !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error("Missing EmailJS configuration");
      }
      const businessEmailParams = {
        to_email: "shantijop1234567890@gmail.com",
        to_name: "Hino Motors Philippines",
        from_name: orderData.customer.fullName,
        from_email: orderData.customer.email,
        subject: `New Order from ${orderData.customer.fullName}`,
        message: `New Order Received:\n\nCustomer Information:\nName: ${
          orderData.customer.fullName
        }\nEmail: ${orderData.customer.email}\nPhone: ${
          orderData.customer.phone
        }\nAddress: ${orderData.customer.barangay}, ${
          orderData.customer.city
        }, ${orderData.customer.province}\n\nOrder Details:\n${orderData.items
          .map(
            (item) =>
              `- ${item.name} x${item.quantity} = ${
                typeof item.price === "number"
                  ? `₱${(item.price * item.quantity).toLocaleString()}`
                  : `${String(item.price)}`
              }`
          )
          .join("\n")}\n\nTotal Amount: ${
          orderData.total
        }\nOrder Date: ${format(new Date(orderData.orderDate), "PPP")}`,
        attachment: pdfBase64,
        filename: `Order_${format(
          new Date(orderData.orderDate),
          "yyyy-MM-dd"
        )}_${orderData.customer.fullName.replace(/\s+/g, "_")}.pdf`,
      };
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        businessEmailParams
      );
      if (response.status !== 200)
        throw new Error(`EmailJS responded with status: ${response.status}`);
      return true;
    } catch (error: unknown) {
      let errorMessage = "Failed to send email";
      if (error instanceof Error) errorMessage = error.message;
      else if (typeof error === "string") errorMessage = error;
      console.error("Email sending failed:", error);
      throw new Error(errorMessage);
    }
  };
  const generatePrintableHTML = (
    orderData: OrderDataForExport,
    forMobile: boolean
  ): string => {
    return "";
  };
  const handleMobilePrint = (orderData: OrderDataForExport) => {};
  const handleDesktopPrint = (orderData: OrderDataForExport) => {};

  const handleFormSubmit = async (e: FormEvent) => {
    /* ... same logic, ensure exportPrice for body uses priceText ... */
    e.preventDefault();
    setIsProcessing(true);
    if (
      !customerInfo.fullName ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.barangay ||
      !customerInfo.city ||
      !customerInfo.province
    ) {
      toast({ title: "Missing information", variant: "destructive" });
      setIsProcessing(false);
      return;
    }
    const itemsForExport: OrderExportItem[] = cart.map((item: CartItem) => {
      let exportPrice: string | number = item.price;
      if (item.type === "body" && item.selectedBody?.priceText) {
        // Prioritize priceText for export
        exportPrice = item.selectedBody.priceText;
      }
      return {
        id: item.id,
        name: item.name,
        price: exportPrice,
        quantity: item.quantity,
        image: item.image || item.selectedBody?.image,
      };
    });
    const orderData: OrderDataForExport = {
      customer: customerInfo,
      items: itemsForExport,
      total: totalPriceDisplay,
      orderDate: new Date().toISOString(),
    };
    try {
      toast({ title: "Processing..." });
      const pdfBase64 = generatePDF(orderData);
      await sendEmailWithPDF(orderData, pdfBase64);
      toast({ title: "Order Processed Successfully" });
      setShowFormDialog(false);
      clearCart();
      setCustomerInfo({
        fullName: "",
        email: "",
        phone: "",
        barangay: "",
        city: "",
        province: "",
      });
    } catch (error) {
      console.error("Order processing error:", error);
      toast({ title: "Error processing order", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Your Cart is Empty
        </h1>
        <p className="mb-8 text-black">...</p>
        <Link href="/products">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 font-bold grid grid-cols-12 gap-4 text-black">
              {/* Headers */}
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>
            <div className="divide-y">
              {cart.map((item: CartItem) => {
                // **** ADD THIS CONSOLE.LOG ****
                console.log(
                  "[CartPage] Rendering item:",
                  JSON.stringify(item, null, 2)
                );

                const displayName = item.name; // Should be pre-formatted
                let unitPriceForDisplay: string | number = item.price; // Default to item's direct price
                let subtotalForDisplay: string | number;
                let itemImageToDisplay = item.image || "/placeholder.svg"; // Default
                const subDescriptionForDisplay = "Vehicle with Standard Body"; // Consistent for both lines as per screenshot

                const isBodySpecItem = item.type === "body";

                if (isBodySpecItem && item.selectedBody) {
                  itemImageToDisplay =
                    item.selectedBody.image || CUSTOM_BODY_IMAGE_PLACEHOLDER;
                  // CRITICAL: For the body spec item, Unit Price and Subtotal must be priceText
                  if (item.selectedBody.priceText) {
                    unitPriceForDisplay = item.selectedBody.priceText;
                    subtotalForDisplay = item.selectedBody.priceText;
                  } else {
                    // Fallback if priceText is somehow missing, though it shouldn't be for custom spec
                    unitPriceForDisplay = "Price Varies";
                    subtotalForDisplay = "Price Varies";
                  }
                } else if (item.type === "chassis") {
                  // For chassis, unit price is item.price
                  unitPriceForDisplay = item.price;
                  subtotalForDisplay = item.price * item.quantity;
                  itemImageToDisplay = item.image || "/placeholder-chassis.png";
                } else {
                  // Fallback for any other unexpected item structure
                  subtotalForDisplay =
                    typeof unitPriceForDisplay === "number"
                      ? unitPriceForDisplay * item.quantity
                      : unitPriceForDisplay;
                }

                return (
                  <div
                    key={item.id}
                    className="p-4 grid grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-6 flex items-center">
                      <div className="relative h-16 w-16 mr-3">
                        <Image
                          src={itemImageToDisplay}
                          alt={displayName}
                          fill
                          style={{ objectFit: "contain" }}
                          onError={(e) =>
                            (e.currentTarget.src = "/placeholder.svg")
                          }
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          {displayName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {subDescriptionForDisplay}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-black">
                      {typeof unitPriceForDisplay === "number"
                        ? `₱${unitPriceForDisplay.toLocaleString()}`
                        : unitPriceForDisplay}
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          className="w-12 h-12 border rounded-l-md flex items-center justify-center text-black text-xl touch-manipulation disabled:opacity-50"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1 || isBodySpecItem}
                          type="button"
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span className="w-16 h-12 border-t border-b flex items-center justify-center text-black text-lg">
                          {item.quantity}
                        </span>
                        <button
                          className="w-12 h-12 border rounded-r-md flex items-center justify-center text-black text-xl touch-manipulation disabled:opacity-50"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={isBodySpecItem}
                          type="button"
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-center flex items-center justify-between">
                      <span className="text-black">
                        {typeof subtotalForDisplay === "number"
                          ? `₱${subtotalForDisplay.toLocaleString()}`
                          : subtotalForDisplay}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 p-2 touch-manipulation"
                        type="button"
                      >
                        <Trash2 className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ... Continue Shopping button ... */}
          <div className="mt-4 flex justify-between">
            <Link href="/products">
              <Button
                variant="outline"
                className="text-black flex items-center p-6 text-lg"
              >
                <ArrowLeft className="mr-2 h-6 w-6" /> Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item: CartItem) => {
                const summaryNameLine = `${item.name} x${item.quantity}`;
                let summaryPriceText: string | number;

                if (item.type === "chassis") {
                  summaryPriceText = item.price * item.quantity;
                } else if (
                  item.type === "body" &&
                  item.selectedBody?.priceText
                ) {
                  // Check for priceText
                  summaryPriceText = item.selectedBody.priceText;
                } else {
                  // Fallback, though body item price is 0
                  summaryPriceText = item.price * item.quantity;
                }

                return (
                  <div
                    key={`summary-${item.id}-${item.type}`}
                    className="flex justify-between text-black"
                  >
                    <span>{summaryNameLine}</span>
                    <span>
                      {typeof summaryPriceText === "number"
                        ? `₱${summaryPriceText.toLocaleString()}`
                        : summaryPriceText}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* ... Total and Checkout Button ... */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg text-black">
                <span>Total</span>
                <span>{totalPriceDisplay}</span>
              </div>
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-xl flex items-center justify-center touch-manipulation"
              onClick={() => setShowFormDialog(true)}
            >
              <CreditCard className="mr-2 h-6 w-6" /> Checkout
            </Button>
          </div>
        </div>
      </div>
      {/* --- Dialog for customer info (keep as is) --- */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="sm:max-w-[500px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">
              Customer Information
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-black text-sm sm:text-base"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={customerInfo.fullName}
                onChange={handleInputChange}
                required
                className="text-black text-sm sm:text-base p-2 sm:p-4 mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-black text-sm sm:text-base"
              >
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="text-black text-sm sm:text-base p-2 sm:p-4 mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="text-black text-sm sm:text-base"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
                className="text-black text-sm sm:text-base p-2 sm:p-4 mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="barangay"
                className="text-black text-sm sm:text-base"
              >
                Barangay *
              </Label>
              <Input
                id="barangay"
                name="barangay"
                value={customerInfo.barangay}
                onChange={handleInputChange}
                required
                className="text-black text-sm sm:text-base p-2 sm:p-4 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-black text-sm sm:text-base">
                City/Municipality *
              </Label>
              <Input
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                required
                className="text-black text-sm sm:text-base p-2 sm:p-4 mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="province"
                className="text-black text-sm sm:text-base"
              >
                Province *
              </Label>
              <Input
                id="province"
                name="province"
                value={customerInfo.province}
                onChange={handleInputChange}
                required
                className="text-black text-sm sm:text-base p-2 sm:p-4 mt-1"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFormDialog(false)}
                disabled={isProcessing}
                className="text-sm sm:text-base p-2 sm:p-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 text-white text-sm sm:text-base p-2 sm:p-4"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Submit Order
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
