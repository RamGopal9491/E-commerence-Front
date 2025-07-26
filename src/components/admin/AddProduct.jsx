import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AddProduct = () => {

  const [form, setForm] = useState({
    name: '',
    originPrice: '',
    description: '',
    discountPrice: '',
    category: '',
  });
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImages((prev) => [...prev, ...acceptedFiles]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('originPrice', form.originPrice);
    formData.append('discountPrice', form.discountPrice);
    formData.append('quantity', form.quantity);
    formData.append('category', form.category);
    formData.append('description', form.description);
    images.forEach((img) => {
      formData.append('images', img);
    });
    try {
      const res = await axios.post(
        'http://localhost:5000/api/products/add',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (res.status === 201) {
        alert('Product added successfully!');
        setForm({ name: '', originPrice: '', description: '', discountPrice: '', category: '', quantity: '' });
        setImages([]);
      } else {
        alert(res.data.error || res.data.msg || 'Failed to add product');
      }
    } catch (err) {
      alert(
        err.response?.data?.error ||
        err.response?.data?.msg ||
        'Error adding product'
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">

      
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Origin Price</label>
          <input
            type="number"
            name="originPrice"
            value={form.originPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={form.discountPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>
         <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
          <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded px-4 py-6 text-center cursor-pointer ${isDragActive ? 'border-amber-600 bg-amber-50' : 'border-gray-300'}`}
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">Drag & drop an image here, or click to select</p>
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {images.map((img, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${idx}`}
                    className="w-32 h-32 object-cover rounded mb-2 mx-auto"
                  />
                  <span className="text-xs text-gray-700 text-center break-all max-w-[8rem]">{img.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;