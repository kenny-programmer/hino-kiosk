"use client";

import { useState, ChangeEvent, FormEvent, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  CreditCard,
  ArrowLeft,
  Download,
  Printer,
  CheckCircle,
  FileText,
  MessageSquare,
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
// --- CORRECTED: Ensure both named exports are imported ---
import { generateOrderPDF, OrderDataForExport } from "@/lib/pdfGenerator";

// --- Imports for Supabase and Feedback ---
import { supabase } from "@/lib/supabaseClient";
import FeedbackDialog from "@/components/ui/FeedbackDialog";

// --- Type for the successful order data from Supabase ---
interface SuccessfulOrder {
  id: number;
  order_id_text: string;
  customer_full_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  order_items: CartItem[];
  total_price_display: string;
  created_at: string;
}

const CUSTOM_BODY_IMAGE_PLACEHOLDER = "/images/bodies/custom-placeholder.jpg";
const CUSTOM_PRICE_TEXT = "Price varies";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
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
  
  const [lastSuccessfulOrder, setLastSuccessfulOrder] = useState<SuccessfulOrder | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      variant: "destructive",
    });
  };

  const formatDisplayPrice = (priceInput: number | string | undefined): string => {
    if (typeof priceInput === "number") return `₱${priceInput.toLocaleString()}`;
    if (typeof priceInput === "string") return priceInput;
    return "N/A";
  };

  const totalPriceDisplay = useMemo(() => {
    let numericTotal = 0;
    let hasVariablePriceItem = false;
    cart.forEach((item: CartItem) => {
      if (typeof item.price === "number") {
        numericTotal += item.price * item.quantity;
      } else {
        hasVariablePriceItem = true;
      }
    });

    if (hasVariablePriceItem) {
      const basePriceString = numericTotal > 0 ? `PHP ${numericTotal.toLocaleString()} + ` : "";
      return `${basePriceString}Custom Body Costs`;
    }

    return `PHP ${numericTotal.toLocaleString()}`;
  }, [cart]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const orderIdText = `HB-${Date.now().toString().slice(-6)}`;
    const fullAddress = `${customerInfo.barangay}, ${customerInfo.city}, ${customerInfo.province}`.toUpperCase();

    const orderData = {
      order_id_text: orderIdText,
      customer_full_name: customerInfo.fullName.toUpperCase(),
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_address: fullAddress,
      order_items: cart,
      total_price_display: totalPriceDisplay,
    };

    try {
      toast({ title: "Submitting Your Order..." });
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
      if (error) throw error;
      toast({
        title: "Order Submitted Successfully",
        description: "Your order has been recorded.",
      });
      clearCart();
      setLastSuccessfulOrder(data);
      setShowFormDialog(false);
    } catch (error: any) {
      console.error("Supabase insert error:", error);
      toast({
        title: "Order Submission Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
        duration: 9000,
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleFeedbackSubmit = async (rating: number, comment: string) => {
    if (!lastSuccessfulOrder) return;
    setIsSubmittingFeedback(true);
    const feedbackData = {
      order_id: lastSuccessfulOrder.id,
      rating: rating,
      comment: comment,
    };
    try {
      const { error } = await supabase.from('feedback').insert([feedbackData]);
      if (error) throw error;
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your valuable input!",
      });
      setShowFeedbackDialog(false);
    } catch (error: any) {
      console.error("Feedback submission error:", error);
      toast({
        title: "Feedback Submission Failed",
        description: "Could not submit your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // --- CORRECTED: The PDF generation functions ---
  const createPdfData = (): OrderDataForExport | null => {
    if (!lastSuccessfulOrder) return null;

    // This "translates" the Supabase data format into the format your PDF generator expects.
    return {
      orderId: lastSuccessfulOrder.order_id_text,
      orderDate: lastSuccessfulOrder.created_at,
      total: lastSuccessfulOrder.total_price_display,
      items: lastSuccessfulOrder.order_items,
      customer: {
        fullName: lastSuccessfulOrder.customer_full_name,
        email: lastSuccessfulOrder.customer_email,
        phone: lastSuccessfulOrder.customer_phone,
        // The address fields from the form are now combined in the DB, so we use the single field.
        barangay: lastSuccessfulOrder.customer_address, 
        city: '', // This is now part of the combined address.
        province: '', // This is now part of the combined address.
      },
    };
  };

  const handlePrint = async () => {
    const pdfData = createPdfData();
    if (pdfData) {
      toast({ title: "Generating PDF for printing..." });
      const pdfDoc = await generateOrderPDF(pdfData); 
      pdfDoc.autoPrint();
      pdfDoc.output("dataurlnewwindow");
    }
  };
  
  const handleDownloadPDF = async () => {
    const pdfData = createPdfData();
    if (pdfData) {
       toast({ title: "Generating PDF for download..." });
      const pdfDoc = await generateOrderPDF(pdfData);
      pdfDoc.save(`Hino-Order-Receipt-${pdfData.orderId}.pdf`);
    }
  };

  if (lastSuccessfulOrder) {
    return (
      <>
        <div className="container mx-auto py-12 px-4 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Order Confirmed!
          </h1>
          <p className="mb-2 text-gray-600">
            Thank you for your order, {lastSuccessfulOrder.customer_full_name}.
          </p>
          <p className="mb-4 text-gray-600">
            Your Order ID is <strong>{lastSuccessfulOrder.order_id_text}</strong>.
          </p>
          <p className="mb-8 text-gray-600">
            We have recorded your order and will get back to you shortly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              variant="default"
              onClick={() => setShowFeedbackDialog(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Leave Feedback
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              className="w-full sm:w-auto"
            >
              <Printer className="mr-2 h-4 w-4" /> Print Receipt
            </Button>
          </div>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
        
        <FeedbackDialog
          open={showFeedbackDialog}
          onOpenChange={setShowFeedbackDialog}
          onSubmit={handleFeedbackSubmit}
          isSubmitting={isSubmittingFeedback}
        />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Your Cart is Empty
        </h1>
        <p className="mb-8 text-gray-700">
          Looks like you haven't added any products yet.
        </p>
        <Link href="/products">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Your Cart</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden bg-white shadow-md">
            <div className="hidden md:flex bg-gray-50 p-4 font-semibold text-gray-600 text-sm border-b border-gray-200">
              <div className="w-1/2 lg:w-5/12">Product</div>
              <div className="w-1/4 lg:w-2/12 text-center">Unit Price</div>
              <div className="w-1/4 lg:w-3/12 text-center">Quantity</div>
              <div className="w-1/4 lg:w-2/12 text-right">Subtotal</div>
            </div>
            <div className="divide-y divide-gray-200">
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0"
                >
                  <div className="w-full md:w-1/2 lg:w-5/12 flex items-center space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={
                          item.image ||
                          item.selectedBody?.image ||
                          CUSTOM_BODY_IMAGE_PLACEHOLDER
                        }
                        alt={item.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {item.type === "chassis"
                          ? `${item.name.split(" (")[0]} (Chassis)`
                          : item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.type === "chassis"
                          ? "Chassis Only"
                          : item.selectedBody?.isCustom
                            ? "Custom Body Specification"
                            : "Standard Body"}
                      </p>
                      {item.type === "body" && item.selectedBody?.isCustom && (
                        <div className="text-xs text-gray-500 mt-1 leading-tight">
                          {item.selectedBody.userSpecifiedBodyType &&
                            item.selectedBody.userSpecifiedBodyType !==
                              item.selectedBody.name && (
                              <p>
                                Type: {item.selectedBody.userSpecifiedBodyType}
                              </p>
                            )}
                          {item.selectedBody.length &&
                          item.selectedBody.width &&
                          item.selectedBody.height ? (
                            <p>
                              <span>L:{item.selectedBody.length}ft </span>
                              <span>W:{item.selectedBody.width}ft </span>
                              <span>H:{item.selectedBody.height}ft </span>
                            </p>
                          ) : item.selectedBody.cubicMeter ? (
                            <p>
                              <span>
                                Volume: {item.selectedBody.cubicMeter}m³
                              </span>
                            </p>
                          ) : item.selectedBody.liters ? (
                            <p>
                              <span>Volume: {item.selectedBody.liters}L</span>
                            </p>
                          ) : item.selectedBody.volume ? (
                            <p>
                              <span>
                                Volume: {item.selectedBody.volume} cu.ft
                              </span>
                            </p>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/3 lg:w-3/12 text-left md:text-center">
                      <span className="md:hidden font-semibold mr-2">
                        Price:
                      </span>
                      <span>
                        {typeof item.price === "number"
                          ? formatDisplayPrice(item.price)
                          : CUSTOM_PRICE_TEXT}
                      </span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-5/12 flex items-center justify-start md:justify-center">
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 border rounded-l-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          –
                        </button>
                        <span className="px-3 py-1 border-t border-b text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 border rounded-r-md text-gray-700 hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-4/12 flex justify-between items-center text-left md:text-right">
                      <span className="md:hidden font-semibold mr-2">
                        Subtotal:
                      </span>
                      <span className="font-medium text-gray-800">
                        {typeof item.price === "number"
                          ? formatDisplayPrice(item.price * item.quantity)
                          : CUSTOM_PRICE_TEXT}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-start">
            <Link href="/products">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50 px-6 py-2.5"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              {cart.map((item: CartItem) => (
                <div
                  key={`summary-${item.id}`}
                  className="flex justify-between text-gray-700 text-sm"
                >
                  <span className="flex-1 truncate pr-2">
                    {item.type === "chassis"
                      ? `${item.name.split(" (")[0]} (Chassis)`
                      : item.name}{" "}
                    x{item.quantity}
                  </span>
                  <span className="whitespace-nowrap">
                    {typeof item.price === "number"
                      ? formatDisplayPrice(item.price * item.quantity)
                      : CUSTOM_PRICE_TEXT}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>{totalPriceDisplay}</span>
              </div>
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium rounded-md"
              onClick={() => setShowFormDialog(true)}
              disabled={cart.length === 0}
            >
              <CreditCard className="mr-2 h-5 w-5" /> Checkout
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent
          className="sm:max-w-[500px] p-6 flex flex-col max-h-[90vh]"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              Customer Information
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 pt-2 overflow-y-auto pr-4 -mr-4"
          >
            <div>
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={customerInfo.fullName}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="barangay" className="text-gray-700">
                Barangay *
              </Label>
              <Input
                id="barangay"
                name="barangay"
                value={customerInfo.barangay}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-gray-700">
                City/Municipality *
              </Label>
              <Input
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="province" className="text-gray-700">
                Province *
              </Label>
              <Input
                id="province"
                name="province"
                value={customerInfo.province}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <DialogFooter className="pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFormDialog(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <FileText className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" /> Submit Order
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