import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ecommerceImage from '/icons/ecommerce.png';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/high-discount');
        console.log(res)
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center mb-12 bg-white p-8 rounded-lg shadow space-y-6 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2">
          <img
            src={ecommerceImage}
            alt="E-commerce concept"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-amber-600 mb-4">Welcome to ShopEase</h1>
          <p className="text-gray-700 text-lg">
            ShopEase is your one-stop eCommerce platform for everything from fashion to electronics. 
            Discover a seamless shopping experience, secure checkout, and the best deals right at your fingertips.
          </p>
          <p className="text-gray-600 mt-3">
            Whether you're browsing top brands or small businesses, our intuitive design helps you find 
            exactly what you're looking for — anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-gray-800">Explore Products</h2>
            <p className="text-gray-600 mt-1">Find our best selections for you</p>
          </div>
          <div className="ml-4">
            <button
              className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-700 transition cursor-pointer"
              onClick={handleViewAllProducts}
            >
              ViewAllProducts
            </button>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Home;