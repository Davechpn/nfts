import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the Product interface to include additional properties
export interface Product {
  id: number;
  name: string;
  price: number;
  btcPrice: number;
  quantity: number;
  image: string;
  date: string;
  inGame?: boolean;
  background: string;
}

// Sample products data
export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Orange Ranger",
    price: 100,
    btcPrice: 0.002,
    quantity: 10,
    image: "/assets/images/OrangeRanger.png",
    date: "12 Feb 2024, 13:34",
    inGame: true,
    background: "orange"
  },
  {
    id: 2,
    name: "Founders Drop Vault",
    price: 200,
    btcPrice: 0.004,
    quantity: 5,
    image: "/assets/images/FoundersDropVault.png",
    date: "12 Feb 2024, 13:34",
    inGame: true,
    background: "yellow"
  },
  {
    id: 3,
    name: "Halloween Drop Vault",
    price: 300,
    btcPrice: 0.006,
    quantity: 7,
    image: "/assets/images/HalloweenDropVault.png",
    date: "12 Feb 2024, 13:34",
    inGame: true,
    background: "purple"
  },
  {
    id: 4,
    name: "Alien Drop Vault",
    price: 400,
    btcPrice: 0.008,
    quantity: 3,
    image: "/assets/images/AlienDropVault.png",
    date: "12 Feb 2024, 13:34",
    inGame: true,
    background: "orange"
  },
  {
    id: 5,
    name: "DigiTek Drop Vault",
    price: 500,
    btcPrice: 0.010,
    quantity: 8,
    image: "/assets/images/DigiTekDropVault.png",
    date: "12 Feb 2024, 13:34",
    inGame: true,
    background: "orange"
  }
];

interface ProductsContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
