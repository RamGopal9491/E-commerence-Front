import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/isAuthenticated', { withCredentials: true });
         if (!res.data.isAuthenticated) {
          navigate('/');
        } else {
          setLoading(false);
        }
      } catch {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) return <div className="p-6">Checking authentication...</div>;
  return <Outlet />;
};

export default AuthLayout;
