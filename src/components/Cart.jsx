import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  
  const totalPrice = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {!cartItems || cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4 gap-6">
              <img
                src={item.images?.[0] || '/placeholder.png'} 
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>₹{item.price} x {item.quantity}</p>
                <p className="font-bold text-amber-600">₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
            <Link to="/checkout">
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
