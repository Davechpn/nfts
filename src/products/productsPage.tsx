import React from "react";
import ProductCard from "./productCard";
import { useProducts } from "./productsContext";

const ProductsPage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-lg gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
