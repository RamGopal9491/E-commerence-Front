import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index,setIndex]=useState(0)

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/isAuthenticated', {
        withCredentials: true,
      });
      
      setIsAuthenticated(res.data.isAuthenticated);
      setLoading(false);
      if (!res.data.isAuthenticated) {
        navigate('/');
      }
    } catch {
      setIsAuthenticated(false);
      setLoading(false);
      navigate('/');
    }
  };
  checkAuth();
}, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(res.data);
        console.log(res.data)
        setLoading(false);
        
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6 text-red-500">Product not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {Array.isArray(product.images) && product.images.length > 0 ? (
            <>
              <img
                src={product.images[index] || product.images[0]}
                alt={product.title}
                className="w-full h-96 object-cover rounded shadow"
              />
              <div className="flex space-x-4">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setIndex(i)}
                    alt={`thumb-${i}`}
                    className={`w-24 h-24 object-cover rounded border cursor-pointer ${index === i ? 'border-amber-600 border-2' : ''}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded shadow text-gray-500">
              No images available
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl text-amber-600 font-semibold mb-6">₹{product.price}</p>

    <button className="bg-amber-600 text-white py-2 px-6 rounded hover:bg-amber-700 cursor-pointer">
  Add to Cart
  </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
