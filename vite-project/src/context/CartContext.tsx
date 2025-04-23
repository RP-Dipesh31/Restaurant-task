// src/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItemType } from "@/types";
import { calculateFinalPrice } from "@/utils/calculateDiscount";


interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItemType, qty?: number) => void;
  removeFromCart: (id: string, qty?: number) => void;
  isInCart: (id: string) => boolean;
  updateQuantity: (id: string, qty: number) => void;
  cartItemCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItemType, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (id: string, qty = 1) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._id === id
            ? { ...i, quantity: i.quantity - qty }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const updateQuantity = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, quantity: Math.max(1, qty) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const isInCart = (id: string) =>
    cartItems.some((item) => item._id === id);

  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // We'll import calculateFinalPrice wherever we need it
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      // @ts-ignore – assumes calculateFinalPrice imported
      calculateFinalPrice(item, item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        updateQuantity,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
