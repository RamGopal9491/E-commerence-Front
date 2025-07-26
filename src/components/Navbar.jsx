import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/isAuthenticated', { credentials: 'include' });
        const data = await res.json();
        setIsLoggedIn(!!data.isAuthenticated);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-2xl md:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              ☰
            </button> */}
            <Link to="/" className="text-2xl font-bold text-amber-600">
              🛍️ ShopEase
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-xs h-10">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow px-2 py-1 text-sm focus:outline-none"
              />
              <button className="bg-amber-600 text-white px-3 hover:bg-amber-700 text-sm h-full cursor-pointer">
                🔍
              </button>
            </div>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="focus:outline-none"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  tabIndex={0}
                  aria-label="Profile menu"
                  type="button"
                >
                  <FaUserCircle className="text-3xl text-amber-600 hover:text-amber-700 transition cursor-pointer" title="Profile" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-amber-50 text-gray-700"
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-amber-50 text-gray-700"
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowDropdown(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 hover:bg-amber-50 text-gray-700 border-t"
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowDropdown(false)}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-amber-600 text-white px-4 py-1.5 rounded hover:bg-amber-700 transition text-sm hidden md:block cursor-pointer">
                  Login
                </button>
              </Link>
            )}

          </div>
        </div>
      </nav>

      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="bg-white w-64 h-full p-6 absolute left-0 top-0 z-50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-gray-700 font-medium">
              <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                Home
              </Link>
              <Link to="/cart" onClick={() => setIsSidebarOpen(false)}>
                View Cart
              </Link>
              <Link to="/checkout" onClick={() => setIsSidebarOpen(false)}>
                Checkout
              </Link>
            </nav>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
