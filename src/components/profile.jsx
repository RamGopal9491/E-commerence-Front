import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
           
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-amber-600">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.avatar || 'https://api.lorem.space/image/face?w=150&h=150'}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-amber-200 mb-4"
        />
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2 text-sm font-medium">
          <span className="text-gray-700">Admin Status: </span>
          {user.admin ? (
            <span className="text-green-600 font-bold">Admin</span>
          ) : (
            <span className="text-gray-500">User</span>
          )}
        </p>
      </div>

    </div>
  );
};

export default Profile;
