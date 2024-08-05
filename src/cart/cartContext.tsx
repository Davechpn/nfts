import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, useProducts } from "./../products/productsContext";

interface CartContextProps {
  walletConnected: boolean;
  connectWallet: () => void;
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  cartItems: Product[];
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { products, setProducts } = useProducts();

  const connectWallet = () => {
    setWalletConnected(!walletConnected);
  };

  const addItem = (item: Product) => {
    const product = products.find((p) => p.id === item.id);
    if (product && product.quantity > 0) {
      setCartItems((prevItems) => [...prevItems, item]);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    }
  };

  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (itemToRemove) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{ walletConnected, connectWallet, addItem, removeItem, cartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
