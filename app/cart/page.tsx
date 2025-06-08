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
  Printer,
  CheckCircle,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

// Interfaces
interface OrderExportItem {
  id: string | number;
  name: string;
  price: number | string;
  quantity: number;
  image?: string;
  selectedBody?: CartItem["selectedBody"];
  type: "chassis" | "body" | "bus" | "puv";
}
interface OrderDataForExport {
  orderId: string;
  orderDate: string;
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

const CUSTOM_BODY_IMAGE_PLACEHOLDER = "/images/bodies/custom-placeholder.jpg";
const CUSTOM_PRICE_TEXT = "Price varies";

const getDisplayName = (item: {
  name: string;
  type: "chassis" | "body" | "bus" | "puv";
}): string => {
  if (item.type === "chassis" && item.name.includes(" with ")) {
    return item.name.split(" with ")[0];
  }
  return item.name;
};

export default function CartPage() {
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
  const [lastSuccessfulOrder, setLastSuccessfulOrder] =
    useState<OrderDataForExport | null>(null);

  const formatDisplayPrice = (
    priceInput: number | string | undefined
  ): string => {
    if (typeof priceInput === "number")
      return `₱${priceInput.toLocaleString()}`;
    if (typeof priceInput === "string") return priceInput;
    return "N/A";
  };

  const calculateTotalPriceDisplay = (): string => {
    let numericTotal = 0;
    let hasVariablePriceItem = false;
    cart.forEach((item: CartItem) => {
      if (item.type === "chassis")
        numericTotal += (item.price as number) * item.quantity;
      if (item.selectedBody?.isCustom) hasVariablePriceItem = true;
      else if (item.type === "body" && typeof item.price === "number")
        numericTotal += item.price * item.quantity;
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
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDFDoc = (orderData: OrderDataForExport): jsPDF => {
    const pdf = new jsPDF();
    let yPosition = 20;

    // --- Header ---
    pdf.setFontSize(20);
    pdf.text("Hino Motors Philippines", 105, yPosition, { align: "center" });
    yPosition += 8;
    pdf.setFontSize(14);
    pdf.text(`Order Receipt - #${orderData.orderId}`, 105, yPosition, {
      align: "center",
    });
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.text(
      `Date: ${format(new Date(orderData.orderDate), "PPP")}`,
      105,
      yPosition,
      { align: "center" }
    );
    yPosition += 20;

    // --- Customer Info ---
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

    // --- Order Items Table ---
    pdf.setFontSize(16);
    pdf.text("Order Items", 20, yPosition);
    yPosition += 10;

    // Define column positions
    const itemX = 20;
    const qtyX = 145;
    const totalX = 190;

    pdf.setFontSize(12);
    pdf.text("Item", itemX, yPosition);
    pdf.text("Qty", qtyX, yPosition, { align: "right" });
    pdf.text("Total", totalX, yPosition, { align: "right" });
    yPosition += 5;
    pdf.line(20, yPosition, 190, yPosition); // Line under headers
    yPosition += 8;

    orderData.items.forEach((item) => {
      if (yPosition > 270) {
        // Add new page if content overflows
        pdf.addPage();
        yPosition = 20;
      }

      const displayName = getDisplayName(item);
      let totalText: string;

      if (
        item.type === "chassis" ||
        (item.type === "body" && !item.selectedBody?.isCustom)
      ) {
        totalText = `₱${(
          (item.price as number) * item.quantity
        ).toLocaleString()}`;
      } else {
        totalText = CUSTOM_PRICE_TEXT;
      }

      pdf.text(displayName, itemX, yPosition);
      pdf.text(item.quantity.toString(), qtyX, yPosition, { align: "right" });
      pdf.text(totalText, totalX, yPosition, { align: "right" });
      yPosition += 8;
    });

    // --- Totals ---
    yPosition += 5;
    pdf.line(120, yPosition, 190, yPosition); // Line above total
    yPosition += 8;
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Order Total", 120, yPosition);
    pdf.text(orderData.total, 190, yPosition, { align: "right" });
    pdf.setFont("helvetica", "normal");

    return pdf;
  };

  // MODIFIED FUNCTION
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderId = `HMP-${Date.now().toString().slice(-6)}`;

    const itemsForExport: OrderExportItem[] = cart.map((item: CartItem) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || item.selectedBody?.image,
      selectedBody: item.selectedBody,
      type: item.type,
    }));

    const orderData: OrderDataForExport = {
      orderId,
      customer: customerInfo,
      items: itemsForExport,
      total: totalPriceDisplay,
      orderDate: new Date().toISOString(),
    };

    try {
      toast({ title: "Processing Your Order..." });

      // 1. Generate the PDF and get its Base64 representation
      const pdfDoc = generatePDFDoc(orderData);
      const pdfBase64 = pdfDoc.output("datauristring").split(",")[1];

      // 2. Get EmailJS credentials
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are not configured.");
      }
      emailjs.init(publicKey);

      // 3. Prepare the HTML for the email body
      const itemsHtml = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
          ${orderData.items
            .map((item) => {
              let priceText: string;
              const displayName = getDisplayName(item);

              if (
                item.type === "chassis" ||
                (item.type === "body" && !item.selectedBody?.isCustom)
              ) {
                priceText = `₱${(
                  (item.price as number) * item.quantity
                ).toLocaleString()}`;
              } else {
                priceText = CUSTOM_PRICE_TEXT;
              }

              return `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 5px;">${displayName} × ${item.quantity}</td>
                  <td style="padding: 10px 5px; text-align: right;">${priceText}</td>
                </tr>
              `;
            })
            .join("")}
        </table>
      `;

      // 4. Create a common set of parameters for both emails
      const commonEmailParams = {
        from_name: "Hino Motors Philippines - Batangas",
        order_id: orderData.orderId,
        customer_name: orderData.customer.fullName,
        customer_email: orderData.customer.email,
        customer_address: `${orderData.customer.barangay}, ${orderData.customer.city}, ${orderData.customer.province}`,
        order_items_html: itemsHtml,
        order_total: orderData.total,
        // The PDF attachment is included here, so it's sent in both emails
        pdf_attachment: pdfBase64,
      };

      // 5. Prepare the two separate email promises

      // Email to your admin address
      const sendAdminEmail = emailjs.send(serviceId, templateId, {
        ...commonEmailParams,
        to_email: "shantijop1234567890@gmail.com", // Your admin email
        reply_to: orderData.customer.email, // So you can reply directly to the customer
      });

      // Email to the customer
      const sendCustomerEmail = emailjs.send(serviceId, templateId, {
        ...commonEmailParams,
        to_email: orderData.customer.email, // The customer's email from the form
        reply_to: "shantijop1234567890@gmail.com", // So they can reply to you
      });

      // 6. Send both emails concurrently and wait for them to finish
      await Promise.all([sendAdminEmail, sendCustomerEmail]);

      toast({
        title: "Order Submitted Successfully",
        description: "A confirmation has been sent to your email.",
      });
      clearCart();
      setLastSuccessfulOrder(orderData);
      setShowFormDialog(false);
    } catch (error: any) {
      console.error("EmailJS raw error object:", error);
      const errorMessage =
        error.text ||
        "An unknown error occurred. Check console and EmailJS dashboard.";
      toast({
        title: "Email Sending Failed",
        description: `Error: ${errorMessage}`,
        variant: "destructive",
        duration: 9000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    if (lastSuccessfulOrder) {
      const pdfDoc = generatePDFDoc(lastSuccessfulOrder);
      pdfDoc.autoPrint();
      pdfDoc.output("dataurlnewwindow");
    }
  };

  const handleDownloadPDF = () => {
    if (lastSuccessfulOrder) {
      const pdfDoc = generatePDFDoc(lastSuccessfulOrder);
      pdfDoc.save(`Hino-Order-Receipt-${lastSuccessfulOrder.orderId}.pdf`);
    }
  };

  // RENDER LOGIC
  if (lastSuccessfulOrder) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Order Confirmed!
        </h1>
        <p className="mb-2 text-gray-600">
          Thank you for your order, {lastSuccessfulOrder.customer.fullName}.
        </p>
        <p className="mb-4 text-gray-600">
          Your Order ID is <strong>{lastSuccessfulOrder.orderId}</strong>.
        </p>
        <p className="mb-8 text-gray-600">
          A confirmation email with a PDF receipt has been sent to{" "}
          {lastSuccessfulOrder.customer.email}. We will get back to you shortly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" /> Download PDF Receipt
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
      <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden bg-white shadow-md">
            <div className="bg-gray-50 p-4 font-semibold grid grid-cols-12 gap-4 text-gray-600 text-sm border-b border-gray-200">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>
            <div className="divide-y divide-gray-200">
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="p-4 grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-6 flex items-center space-x-3">
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
                        onError={(e) =>
                          (e.currentTarget.src = "/placeholder.svg")
                        }
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {getDisplayName(item)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.type === "chassis"
                          ? "Chassis"
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
                  <div className="col-span-2 text-center text-gray-700">
                    {item.type === "body" && item.selectedBody?.isCustom
                      ? CUSTOM_PRICE_TEXT
                      : formatDisplayPrice(item.price)}
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center">
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
                  <div className="col-span-2 text-center flex items-center justify-end space-x-2">
                    <span className="text-gray-800 font-medium">
                      {item.type === "body" && item.selectedBody?.isCustom
                        ? CUSTOM_PRICE_TEXT
                        : typeof item.price === "number"
                        ? formatDisplayPrice(item.price * item.quantity)
                        : formatDisplayPrice(item.price)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
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
                    {getDisplayName(item)} x{item.quantity}
                  </span>
                  <span className="whitespace-nowrap">
                    {item.type === "body" && item.selectedBody?.isCustom
                      ? CUSTOM_PRICE_TEXT
                      : typeof item.price === "number"
                      ? formatDisplayPrice(item.price * item.quantity)
                      : formatDisplayPrice(item.price)}
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
        <DialogContent className="sm:max-w-[500px] p-6">
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800">
                Customer Information
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
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
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}
