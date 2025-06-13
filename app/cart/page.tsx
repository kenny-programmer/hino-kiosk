"use client";

import { useState, ChangeEvent, FormEvent, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Wrench,
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

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    lastProductPageUrl,
  } = useCart();
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

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      variant: "destructive",
    });
  };

  const formatDisplayPrice = (
    priceInput: number | string | undefined
  ): string => {
    if (typeof priceInput === "number")
      return `₱${priceInput.toLocaleString()}`;
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
      const basePriceString =
        numericTotal > 0 ? `PHP ${numericTotal.toLocaleString()} + ` : "";
      return `${basePriceString}Custom Body Costs`;
    }

    return `PHP ${numericTotal.toLocaleString()}`;
  }, [cart]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDFDoc = (orderData: OrderDataForExport): jsPDF => {
    const pdf = new jsPDF();
    let yPosition = 20;

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

    const itemX = 20;
    const qtyX = 145;
    const totalX = 190;

    pdf.setFontSize(12);
    pdf.text("Item", itemX, yPosition);
    pdf.text("Qty", qtyX, yPosition, { align: "right" });
    pdf.text("Total", totalX, yPosition, { align: "right" });
    yPosition += 5;
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 8;

    orderData.items.forEach((item) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }

      const displayName =
        item.type === "chassis"
          ? `${item.name.split(" (")[0]} (Chassis)`
          : item.name;
      let totalText: string;

      if (typeof item.price === "number") {
        totalText = `PHP ${(item.price * item.quantity).toLocaleString()}`;
      } else {
        totalText = CUSTOM_PRICE_TEXT;
      }

      pdf.text(displayName, itemX, yPosition);
      pdf.text(item.quantity.toString(), qtyX, yPosition, { align: "right" });
      pdf.text(totalText, totalX, yPosition, { align: "right" });
      yPosition += 8;
    });

    yPosition += 5;
    pdf.line(120, yPosition, 190, yPosition);
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

    // Create a new customer info object with uppercase values for relevant fields
    const uppercasedCustomerInfo = {
      fullName: customerInfo.fullName.toUpperCase(),
      email: customerInfo.email, // Email should not be uppercased
      phone: customerInfo.phone,
      barangay: customerInfo.barangay.toUpperCase(),
      city: customerInfo.city.toUpperCase(),
      province: customerInfo.province.toUpperCase(),
    };

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

    // Use the new uppercased object to create the final order data
    const orderData: OrderDataForExport = {
      orderId,
      customer: uppercasedCustomerInfo,
      items: itemsForExport,
      total: totalPriceDisplay,
      orderDate: new Date().toISOString(),
    };

    try {
      toast({ title: "Processing Your Order..." });

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are not configured.");
      }
      emailjs.init(publicKey);

      const itemsHtml = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
          ${orderData.items
            .map((item) => {
              let priceText: string;
              const displayName =
                item.type === "chassis"
                  ? `${item.name.split(" (")[0]} (Chassis)`
                  : item.name;

              if (typeof item.price === "number") {
                priceText = `₱${(item.price * item.quantity).toLocaleString()}`;
              } else {
                priceText = CUSTOM_PRICE_TEXT;
              }
              return `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 5px;">${displayName} × ${
                    item.quantity
                  }</td>
                  <td style="padding: 10px 5px; text-align: right;">${priceText}</td>
                </tr>
              `;
            })
            .join("")}
        </table>
      `;

      // The commonEmailParams will now automatically use the uppercased data from orderData
      const commonEmailParams = {
        order_id: orderData.orderId,
        customer_name: orderData.customer.fullName,
        customer_email: orderData.customer.email,
        customer_address: `${orderData.customer.barangay}, ${orderData.customer.city}, ${orderData.customer.province}`,
        customer_number: orderData.customer.phone,
        order_items_html: itemsHtml,
        order_total: orderData.total,
      };

      const sendAdminEmail = emailjs.send(serviceId, templateId, {
        ...commonEmailParams,
        to_email: "shantijop1234567890@gmail.com",
        reply_to: orderData.customer.email,
      });

      const sendCustomerEmail = emailjs.send(serviceId, templateId, {
        ...commonEmailParams,
        to_email: orderData.customer.email,
        reply_to: "shantijop1234567890@gmail.com",
      });

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
          A confirmation email has been sent to{" "}
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

  // UPDATED "EMPTY CART" VIEW
  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Your Cart is Empty
        </h1>
        <p className="mb-8 text-gray-700">
          Looks like you haven't added any products yet.
        </p>
        <div className="flex justify-center items-center">
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
              Browse Products
            </Button>
          </Link>
        </div>
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
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
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
                          {item.selectedBody.isAirconditioned && (
                            <p className="text-blue-600 font-medium mt-1">
                              Aircon: Yes
                              {item.selectedBody.airconDetails && (
                                <span className="font-normal text-gray-500">
                                  {" "}
                                  ({item.selectedBody.airconDetails})
                                </span>
                              )}
                            </p>
                          )}
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
          <>
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
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}
