import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 bg-white flex flex-col items-center">
      {product.productImages && product.productImages[0] && (
        <img
          src={product.productImages[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <div className="flex flex-col items-center mb-2">
        <span className="text-gray-500 line-through text-sm">₹{product.originPrice}</span>
        <span className="text-amber-600 font-bold text-xl">₹{product.discountPrice}</span>
      </div>
      <button
        onClick={() => {
          addToCart(product);
          if (onAddToCart) onAddToCart();
        }}
        className="bg-amber-600 text-white py-1 px-4 rounded hover:bg-amber-700 text-lg flex items-center gap-2 mt-2"
      >
        <span role="img" aria-label="cart">🛒</span> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
