import React, { useState } from "react";
import Cart from "../cart/cart";
import WalletAlert from "./walletAlert";
import { useCart } from "../cart/cartContext";

const AppBar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { walletConnected, connectWallet, cartItems } = useCart();

  const handleCartClick = () => {
    if (walletConnected) {
      setIsModalOpen(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className=" bg-neutral-800 bg-opacity-75 text-white h-16 flex items-center px-4 w-full  flex-row" style={{maxWidth:"Calc(100vw - 12px)"}}>
      <button
        className="sm:hidden p-2 text-xl text-white bg-transparent border-none"
        onClick={toggleSidebar}
      >
        <img
          src="/assets/icons/menu.svg"
          alt="Menu Icon"
          className="h-4 w-4"
        />
      </button>
      <div className="text-lg sm:text-xl font-bold grow">Marketplace</div>
      <div className="hidden sm:block flex-1 ml-[-8px]"></div>
      <header className="flex justify-between items-center sm:p-4 relative">
        <div className="flex items-center space-x-4">
          <button
            className={`z-40 fixed sm:static right-2 sm:right-auto top-[72px] sm:top-auto py-2 px-4 
              rounded-full cursor-pointer ${
                walletConnected ? "bg-green-500" : "bg-gray-500"
              } text-white`}
            onClick={connectWallet}
          >
            {walletConnected ? "Wallet Connected" : "Connect Wallet"}
          </button>

        { walletConnected && <div
            className="flex rounded-full p-1 text-xs sm:text-sm items-center"
            style={{ border: "1px solid grey" }}
          >
            <div className="flex mr-1">
              <img
                src="/assets/icons/crypto_logo.svg"
                className="h-4 w-4 object-contain rounded-lg"
              />
              0.012BTC
            </div>
            <div
              className="flex rounded-full p-1"
              style={{ border: "1px solid grey" }}
            >
              <img
                src="/assets/icons/xfs.svg"
                className="h-4 w-4 object-contain rounded-lg"
              />
              xfs...fas
            </div>
          </div>}

          <div
            className="hidden sm:block relative cursor-pointer"
            onClick={handleCartClick}
          >
            <img
              src="/assets/icons/cart.svg"
              alt="Cart Icon"
              className="h-10 w-10"
            />
            {cartItems.length > 0 && (
              <span
                className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs 
              font-bold leading-none text-red-100 bg-red-600 rounded-full"
              >
                {cartItems.length}
              </span>
            )}
          </div>
          <div className="cursor-pointer">
            <img
              src="/assets/icons/notifications.svg"
              alt="Bell Icon"
              className="h-10 w-10"
            />
          </div>
          <img
            src="/assets/images/Avatar.png"
            alt="Avatar"
            className="hidden sm:block w-10 h-10 rounded-full"
          />
        </div>

        {isModalOpen && <Cart closeModal={closeModal} />}

        {isAlertOpen && <WalletAlert closeAlert={closeAlert} />}
      </header>

      <div className="fixed bottom-4 right-4 sm:hidden z-40">
        <button
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={handleCartClick}
        >
          <img
            src="/assets/icons/cart.svg"
            alt="Cart Icon"
            className="h-12 w-12"
          />
          {cartItems.length > 0 && (
            <span
              className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs
             font-bold leading-none text-red-100 bg-red-600 rounded-full"
            >
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AppBar;
