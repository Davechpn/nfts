import React, { useState, useEffect } from "react";
import { CartProvider } from "./cart/cartContext";
import { ProductsProvider } from "./products/productsContext";
import ProductsPage from "./products/productsPage";
import AppBar from "./components/appBar";
import Sidebar from "./components/sidebar";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleMainContentClick = () => {
    if (window.innerWidth < 640 && isSidebarOpen) {
      closeSidebar();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);

    // Set the initial value
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ProductsProvider>
      <CartProvider>
        <div className="h-screen bg-black text-white flex overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          <div className="flex-1 flex flex-col">
            <AppBar toggleSidebar={toggleSidebar} />
            <div
              className="flex-1 overflow-y-auto p-4"
              onClick={handleMainContentClick}
            >
              <ProductsPage />
            </div>
          </div>
        </div>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;
