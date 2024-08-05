import React from "react";
import { useCart } from "../cart/cartContext";
import { useProducts } from "./productsContext";

interface Product {
  id: number;
  name: string;
  price: number;
  btcPrice: number;
  quantity: number;
  image: string;
  date: string;
  background: string;
  inGame?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, removeItem, cartItems } = useCart();
  const { products } = useProducts();

  const isInCart = cartItems.some((item) => item.id === product.id);
  const currentProduct = products.find((p) => p.id === product.id);
  const canAddToCart = currentProduct ? currentProduct.quantity > 0 : false;

  const handleAdd = () => {
    if (canAddToCart) {
      addItem(product);
    }
  };

  const handleRemove = () => {
    if (isInCart) {
      removeItem(product.id);
    }
  };

  return (
    <div
      className="p-2 max-w-xs rounded-3xl relative"
      style={{ border: "1px solid white" }}
    >
      <div
        className="relative p-4 rounded-2xl"
        style={{
          background: `radial-gradient(circle, white, ${product.background})`,
        }}
      >
        <div className="w-full h-40 sm:h-44 rounded-lg overflow-hidden flex justify-center items-center">
          <img
            src={process.env.PUBLIC_URL+product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
        <div
          className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 rounded-full flex 
        space-x-2 items-center h-6"
        >
          <p className="text-sm font-bold">
            {product.btcPrice} <span className="text-orange-500">BTC</span>
          </p>
          <p className="text-sm font-bold">${product.price}</p>
        </div>
        {product.inGame && (
          <div className="absolute bottom-2 left-2 font-bold">IN-GAME</div>
        )}
      </div>
      <div className="mt-2 px-4 py-1 bg-gray-900 rounded-2xl bg-opacity-70">
        <div className="text-neutral-400 text-sm ">{product.date}</div>
        <div className="text-lg font-bold ">{product.name}</div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-orange-500 font-bold">
            QTY: {product.quantity}
          </div>
          <div className="flex">
            {isInCart ? (
              <button
                className="bg-transparent text-gray-500 font-bold cursor-pointer border-none"
                onClick={handleRemove}
              >
                Added to Cart
              </button>
            ) : (
              <button
                className={`bg-transparent text-green-500 font-bold  border-none ${
                  !canAddToCart
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={handleAdd}
                disabled={!canAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
