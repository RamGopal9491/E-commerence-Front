import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { MdOutlineShoppingCart } from 'react-icons/md';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const res = await axios.get(
                `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
            );
            setProducts(res.data);
            setSelectedCategory(categoryId);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Browse by Category</h1>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => fetchProductsByCategory(category.id)}
                        className={`px-4 py-2 rounded border text-sm font-medium ${selectedCategory === category.id
                            ? 'bg-amber-600 text-white'
                            : 'bg-white text-gray-800 border-gray-300 hover:bg-amber-100 cursor-pointer'
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : selectedCategory ? (
                <p className="text-center text-gray-500">

                    No products available for this category.</p>
            ) : (
                <div className="text-center text-gray-400">
                    <MdOutlineShoppingCart className="text-9xl mx-auto mb-2" />
                    <p>Select a category to view products.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
