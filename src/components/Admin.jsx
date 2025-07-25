
import React, { useState } from 'react';
import { FaBoxOpen, FaUserCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
  import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddProduct from './admin/AddProduct';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate=useNavigate()
  // ...existing code...

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/isAdmin', {
          withCredentials: true,
        });
        if (!res.data.isAdmin) {
            navigate("/")
          alert('Access denied: Admins only');
        }
      } catch (err) {
        console.log(err)
          navigate('/');      
        alert('Admin check failed');
    
      }
    };
    checkAdmin();
  }, []);
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="p-6">Welcome to the Admin Dashboard!</div>;
      case 'addProduct':
        return <div className="p-6"><AddProduct/> </div>;
      case 'profile':
        return <div className="p-6">Admin Profile (implement as needed)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <div className="flex items-center mb-10">
          <FaUserCircle className="text-3xl text-amber-600 mr-2" />
          <span className="font-bold text-lg text-gray-700">Admin Panel</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center w-full px-4 py-2 rounded hover:bg-amber-100 transition cursor-pointer ${activeTab === 'dashboard' ? 'bg-amber-100 font-semibold' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <FaTachometerAlt className="mr-3" /> Dashboard
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full px-4 py-2 rounded hover:bg-amber-100 transition cursor-pointer ${activeTab === 'addProduct' ? 'bg-amber-100 font-semibold' : ''}`}
                onClick={() => setActiveTab('addProduct')}
              >
                <FaBoxOpen className="mr-3" /> Add Products
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full px-4 py-2 rounded hover:bg-amber-100 transition cursor-pointer ${activeTab === 'profile' ? 'bg-amber-100 font-semibold' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUserCircle className="mr-3" /> Profile
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-10">
          <button className="flex items-center w-full px-4 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
};

export default Admin;
