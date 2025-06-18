// lib/pdfGenerator.ts

import jsPDF from "jspdf";
import { format } from "date-fns";
import { CartItem } from "@/context/cart-context"; // Assuming the type is exported

// Interfaces (These should match what's in your cart page)
interface OrderExportItem {
  id: string | number;
  name: string;
  price: number | string;
  quantity: number;
  image?: string;
  selectedBody?: CartItem["selectedBody"];
  type: "chassis" | "body" | "bus" | "puv" | "model";
}

export interface OrderDataForExport {
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

const CUSTOM_PRICE_TEXT = "Price varies";

// Helper function to get image data
const getImageBase64 = async (src: string): Promise<string | null> => {
  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`Image not found: ${src}`);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Failed to fetch and convert image:", error);
    return null;
  }
};

// Main PDF Generation Function
export const generateOrderPDF = async (orderData: OrderDataForExport): Promise<jsPDF> => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const hinoRed: [number, number, number] = [227, 0, 27];

  const HEADER_MARGIN = 50;
  const FOOTER_MARGIN = 30;

  const headerImgData = await getImageBase64("/hino-header.png");

  const addHeader = () => {
    if (headerImgData) {
      pdf.addImage(headerImgData, "PNG", 15, 12, 45, 0);
    }
  };

  const addFooter = () => {
    const footerY = pageHeight - FOOTER_MARGIN;
    pdf.setDrawColor(hinoRed[0], hinoRed[1], hinoRed[2]);
    pdf.line(15, footerY, pageWidth - 15, footerY);

    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);

    let textY = footerY + 6;
    pdf.text("Hino Batangas – Lovi Motors Corporation", pageWidth / 2, textY, { align: "center" });
    textY += 4;
    pdf.text("Sitio 6, Diversion Road, Brgy. Balagtas, Batangas City", pageWidth / 2, textY, { align: "center" });
    textY += 4;
    pdf.text("Telephone Number: (043) 724-5286 / (043) 706-8436", pageWidth / 2, textY, { align: "center" });
    textY += 4;
    pdf.text("E-mail: hinobatangas@yahoo.com", pageWidth / 2, textY, { align: "center" });
  };

  let yPosition = HEADER_MARGIN;

  const addNewPage = () => {
    addFooter();
    pdf.addPage();
    addHeader();
    yPosition = HEADER_MARGIN;
  };

  addHeader();

  // --- Header Info ---
  pdf.setFontSize(14);
  pdf.text(`Order Receipt - #${orderData.orderId}`, pageWidth - 15, 15, { align: "right" });
  pdf.setFontSize(12);
  pdf.text(`Date: ${format(new Date(orderData.orderDate), "PPP")}`, pageWidth - 15, 22, { align: "right" });

  // --- Customer Info ---
  pdf.setFontSize(16);
  pdf.text("Customer Information", 15, yPosition);
  yPosition += 10;
  pdf.setFontSize(12);
  pdf.text(`Name: ${orderData.customer.fullName}`, 15, yPosition); yPosition += 7;
  pdf.text(`Email: ${orderData.customer.email}`, 15, yPosition); yPosition += 7;
  pdf.text(`Phone: ${orderData.customer.phone}`, 15, yPosition); yPosition += 7;
  pdf.text(`Address: ${orderData.customer.barangay}, ${orderData.customer.city}, ${orderData.customer.province}`, 15, yPosition);

  yPosition += 15; // Space before items

  // --- Order Items Table Header ---
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Order Items", 15, yPosition);
  yPosition += 10;

  const itemX = 15;
  const qtyX = 150;
  const totalX = pageWidth - 15;

  pdf.setFontSize(12);
  pdf.text("Item", itemX, yPosition);
  pdf.text("Qty", qtyX, yPosition, { align: "right" });
  pdf.text("Total", totalX, yPosition, { align: "right" });
  yPosition += 2;
  pdf.setDrawColor(hinoRed[0], hinoRed[1], hinoRed[2]);
  pdf.line(15, yPosition, pageWidth - 15, yPosition);
  yPosition += 8;

  // --- Order Items Loop ---
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(0, 0, 0);

  orderData.items.forEach((item) => {
    if (yPosition > pageHeight - FOOTER_MARGIN - 20) {
      addNewPage();
    }
    const displayName = item.type === "chassis" ? `${item.name.split(" (")[0]} (Chassis)` : item.name;
    const totalText = typeof item.price === "number" ? `PHP ${(item.price * item.quantity).toLocaleString()}` : CUSTOM_PRICE_TEXT;

    const itemLines = pdf.splitTextToSize(displayName, qtyX - itemX - 5);
    pdf.text(itemLines, itemX, yPosition);
    pdf.text(item.quantity.toString(), qtyX, yPosition, { align: "right" });
    pdf.text(totalText, totalX, yPosition, { align: "right" });

    yPosition += itemLines.length * 5 + 3;
  });

  // --- Order Total ---
  if (yPosition > pageHeight - FOOTER_MARGIN - 60) { // Increased check height for new section
    addNewPage();
  }
  yPosition += 5;
  pdf.setDrawColor(hinoRed[0], hinoRed[1], hinoRed[2]);
  pdf.line(120, yPosition, totalX, yPosition);
  yPosition += 8;
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Order Total", 120, yPosition);
  pdf.text(orderData.total, totalX, yPosition, { align: "right" });

  // --- NEW: Price Validity Notice Section ---
  yPosition += 15; // Add vertical space after the total

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("Price Validity & Adjustment Notice", 15, yPosition);
  yPosition += 6;

  const noticeText = "Please note that all quoted prices are subject to change without prior notice. While we strive to maintain accuracy and consistency, fluctuations in market conditions, supplier costs, currency exchange rates, or unforeseen logistical factors may affect pricing. Final invoicing will reflect the actual price in effect at the time of order confirmation.";
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(80, 80, 80); // Use a slightly lighter text color for the notice

  const textLines = pdf.splitTextToSize(noticeText, pageWidth - 30); // 15mm margin on each side
  pdf.text(textLines, 15, yPosition);
  // --- END OF NEW SECTION ---

  addFooter(); // The existing footer is called last, at its fixed position.

  return pdf;
};