// context/cart-context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

// Interfaces remain the same...
export interface SelectedBody {
  id: string;
  name: string;
  image?: string;
  isCustom: boolean;
  userSpecifiedBodyType?: string;
  length?: string;
  width?: string;
  height?: string;
  cubicMeter?: string;
  liters?: string;
  volume?: string;
  isAirconditioned?: boolean;
  airconDetails?: string;
}

// --- MODIFIED CartItem INTERFACE ---
// This is the change that fixes the error.
export interface CartItem {
  id: string;
  name: string;
  price: number | string;
  quantity: number;
  image: string;
  // 1. Added "model" to the list of allowed types.
  type: "chassis" | "body" | "bus" | "puv" | "model";
  // 2. Added optional `series` and `specifications` to accept all data from comparison.
  series?: string;
  specifications?: { [key: string]: string };
  selectedBody?: SelectedBody;
}
// --- END OF MODIFICATION ---

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  lastProductPageUrl: string;
  setLastProductPageUrl: (url: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastProductPageUrl, setLastProductPageUrl] =
    useState<string>("/products");

  // ======================= HYDRATION FIX (Your code preserved) =======================
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const savedCart = localStorage.getItem("shoppingCart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);
  // =============================================================

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === newItem.id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === newItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    lastProductPageUrl,
    setLastProductPageUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
