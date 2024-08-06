import React, { useEffect, useState } from "react";
import { useCart } from "./cartContext";

interface CartProps {
  closeModal: () => void;
}

const Cart: React.FC<CartProps> = ({ closeModal }) => {
  const { cartItems, removeItem } = useCart();

  const transactionFeeUSD = 9.35;
  const transactionFeeBTC = 0.00014035;
  const feeSavingsUSD = 3.35;
  const feeSavingsBTC = 0.00005035;

  const [totalUSD, setTotalUSD] = useState(0);
  const [totalBTC, setTotalBTC] = useState(0);
  const [expectedTotalUSD, setExpectedTotalUSD] = useState(0);
  const [expectedTotalBTC, setExpectedTotalBTC] = useState(0);

  useEffect(() => {
    const newTotalUSD = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const newTotalBTC = cartItems.reduce(
      (total, item) => total + item.btcPrice,
      0
    );

    setTotalUSD(newTotalUSD);
    setTotalBTC(newTotalBTC);

    setExpectedTotalUSD(newTotalUSD + transactionFeeUSD - feeSavingsUSD);
    setExpectedTotalBTC(newTotalBTC + transactionFeeBTC - feeSavingsBTC);
  }, [cartItems]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-40 z-50">
      <div className="mx-2 w-10/12 md:w-2/3 lg:w-1/3 p-8 rounded-3xl bg-black bg-opacity-60 backdrop-blur-xl shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="text-2xl font-bold">MY BASKET</div>
          <div className="cursor-pointer" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div className="mt-2 space-y-4 overflow-y">
          <div className="p-1 px-2 rounded-2xl flex items-center space-x-4 bg-neutral-700 bg-opacity-50">
            <img
              src="/assets/icons/crypto_logo.svg"
              className="h-20 w-20 object-contain rounded-lg"
            />
            <div className="flex-grow">
              <div className="text-sm sm:text-xl font-bold mb-1">BTC</div>
              <div className="text-lg">Available</div>
            </div>
            <div className="cursor-pointer text-lg">0.000843245</div>
          </div>
          <div className="overflow-y-auto max-h-[30vh] scrollbar-thin scrollbar-thumb-orange-500 scrollbar-thumb-opacity-50">
            {cartItems.length === 0 ? (
              <div className="flex justify-center">
                <p className="text-xl align-center">
                  Your cart is currently empty.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 mb-2 rounded-2xl flex items-center space-x-4"
                  style={{ border: "1px solid gray" }}
                >
                  <div
                    className="relative p-2 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle, white, ${item.background})`,
                    }}
                  >
                    <div className="w-full h-12 rounded-lg overflow-hidden flex justify-center items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm sm:text-xl font-bold mb-1">{item.name}</div>
                    <div className="text-xs sm:text-md">
                      {item.btcPrice}{" "}
                      <span className="text-orange-500">BTC</span>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    <img
                      src="/assets/icons/trash.svg"
                      alt="Trash Icon"
                      className="h-10 w-10"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="mt-2 p-4 rounded-2xl bg-neutral-700 bg-opacity-50">
            <div className="flex">
              <div className="grow text-neutral-400">Tx Fee</div>
              <div className="mr-1 ">
                {(transactionFeeBTC * 100000000).toFixed(0)}{" "}
                <span className="text-orange-500">sats</span>
              </div>
              <span className="text-neutral-500 font-bold">|</span>
              <div className="ml-1">${transactionFeeUSD.toFixed(2)}</div>
            </div>
            <div className="flex">
              <div className="grow text-neutral-400">Fee Savings</div>
              <div className="mr-1">
                {(feeSavingsBTC * 100000000).toFixed(0)}{" "}
                <span className="text-orange-500">sats</span>
              </div>
              <span className="text-neutral-500 font-bold">|</span>
              <div className="ml-1">${feeSavingsUSD.toFixed(2)}</div>
            </div>
            <div className="flex">
              <div className="grow text-neutral-400">Time Estimate</div>
              <div className="ml-1">30 minutes</div>
            </div>

            <hr className="border-neutral-500 border-2 my-2" />

            <div className="flex">
              <div className="grow font-bold">EXPECTED TOTAL</div>
              <div className="mr-1">
                {expectedTotalBTC.toFixed(8)}{" "}
                <span className="text-orange-500">BTC</span>
              </div>
              <span className="text-neutral-500 font-bold">|</span>
              <div className="ml-1">${expectedTotalUSD.toFixed(2)}</div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4 space-x-2">
          <button
            className="text-xs bg-transparent border-4 border-amber-200 text-white py-4 px-6 w-1/2 uppercase sm:text-xl cursor-pointer"
            onClick={closeModal}
          >
            ADD ANOTHER
          </button>
          <button
            className="text-xs bg-transparent border-4 border-orange-500 text-white py-4 px-6 w-1/2 uppercase sm:text-xl"
            onClick={() => alert("Proceed to Checkout")}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
