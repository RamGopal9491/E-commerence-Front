import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import Category from './components/Category';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import AllProducts from './components/AllProducts';
import Profile from './components/profile';
import AuthLayout from './components/AuthLayout';

function App() {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category" element={<Category />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
