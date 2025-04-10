import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItemType } from "@/types"; // ✅ Adjust this import path as needed

interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItemType) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItemType) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i._id === item._id);
      if (existing) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const isInCart = (id: string) => {
    return cartItems.some((item) => item._id === id);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isInCart, cartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
