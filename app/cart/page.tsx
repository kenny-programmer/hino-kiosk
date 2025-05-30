"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();

  // Dialog states
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    barangay: "",
    city: "",
    province: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Open confirmation dialog after form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (
      !customerInfo.fullName ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.barangay ||
      !customerInfo.city ||
      !customerInfo.province
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setShowFormDialog(false);
    setShowConfirmDialog(true);
  };

  // Finalize order
  const handleConfirmOrder = () => {
    const orderData = {
      customer: customerInfo,
      items: cart,
      total: totalPrice,
      orderDate: new Date().toISOString(),
    };

    console.log("Order data:", orderData);

    toast({
      title: "Order Submitted!",
      description: "Your order has been sent to Hino staff for processing",
    });

    window.print();
    clearCart();
    setShowConfirmDialog(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Your Cart is Empty
        </h1>
        <p className="mb-8 text-black">
          You haven't added any items to your cart yet.
        </p>
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
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 font-bold grid grid-cols-12 gap-4 text-black">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-6 flex items-center">
                    <div className="relative h-16 w-16 mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-black">{item.name}</h3>
                      <p className="text-sm text-black">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-black">
                    ₱{item.price.toLocaleString()}
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        className="w-8 h-8 border rounded-l-md flex items-center justify-center text-black"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        type="button"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b flex items-center justify-center text-black">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 border rounded-r-md flex items-center justify-center text-black"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center flex items-center justify-between">
                    <span className="text-black">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                      type="button"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Link href="/products">
              <Button
                variant="outline"
                className="text-black flex items-center"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary and Checkout Button */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>

            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-black">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg text-black">
                <span>Total</span>
                <span>₱{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg flex items-center justify-center"
              onClick={() => setShowFormDialog(true)}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* Customer Info Dialog */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-black">
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={customerInfo.fullName}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-black">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-black">
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-black">
                Company (optional)
              </Label>
              <Input
                id="company"
                name="company"
                value={customerInfo.company}
                onChange={handleInputChange}
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="barangay" className="text-black">
                Barangay *
              </Label>
              <Input
                id="barangay"
                name="barangay"
                value={customerInfo.barangay}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-black">
                City/Municipality *
              </Label>
              <Input
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="province" className="text-black">
                Province *
              </Label>
              <Input
                id="province"
                name="province"
                value={customerInfo.province}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFormDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 text-white">
                Review Order
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-black">
            <div>
              <strong>Full Name:</strong> {customerInfo.fullName}
            </div>
            <div>
              <strong>Email:</strong> {customerInfo.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {customerInfo.phone}
            </div>
            {customerInfo.company && (
              <div>
                <strong>Company:</strong> {customerInfo.company}
              </div>
            )}
            <div>
              <strong>Barangay:</strong> {customerInfo.barangay}
            </div>
            <div>
              <strong>City/Municipality:</strong> {customerInfo.city}
            </div>
            <div>
              <strong>Province:</strong> {customerInfo.province}
            </div>
            <div>
              <strong>Total:</strong> ₱{totalPrice.toLocaleString()}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmDialog(false);
                setShowFormDialog(true);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={handleConfirmOrder}
              className="bg-red-600 text-white"
            >
              Confirm & Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
