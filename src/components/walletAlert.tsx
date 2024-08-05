import React from "react";

interface WalletAlertProps {
  closeAlert: () => void;
}

const WalletAlert: React.FC<WalletAlertProps> = ({ closeAlert }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="text-white mx-4 w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded-3xl bg-red-500 bg-opacity-60 backdrop-blur-xl shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold">ALERT!</h2>
          <div className="cursor-pointer" onClick={closeAlert}>
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
        <div className="flex justify-center mb-4">
          <p className="text-xl align-center">
            Your are not connected to your wallet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletAlert;
