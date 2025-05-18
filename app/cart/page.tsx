"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { toast } = useToast()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Prepare order data
    const orderData = {
      customer: customerInfo,
      items: cart,
      total: totalPrice,
      orderDate: new Date().toISOString(),
    }

    // In a real application, you would send this to your backend
    console.log("Order data:", orderData)

    // Simulate sending email to staff
    toast({
      title: "Order Submitted!",
      description: "Your order has been sent to Hino staff for processing",
    })

    // Print receipt
    window.print()

    // Clear cart after successful order
    clearCart()
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">Your Cart is Empty</h1>
        <p className="mb-8 text-black">You haven't added any items to your cart yet.</p>
        <Link href="/products">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div key={item.id} className="p-4 grid grid-cols-12 gap-4 items-center">
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
                      <p className="text-sm text-black">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-black">₱{item.price.toLocaleString()}</div>

                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        className="w-8 h-8 border rounded-l-md flex items-center justify-center text-black"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b flex items-center justify-center text-black">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 border rounded-r-md flex items-center justify-center text-black"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center flex items-center justify-between">
                    <span className="text-black">₱{(item.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Link href="/products">
              <Button variant="outline" className="text-black flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

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

            <form onSubmit={handleCheckout}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-black">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
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
                    Phone *
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
                  <Label htmlFor="address" className="text-black">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="text-black"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg flex items-center justify-center"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>

                <div className="mt-4 text-center text-sm text-black">
                  <p>A receipt will be printed after your order is submitted</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

