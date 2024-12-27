import React, { useState, useEffect } from 'react';

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          'https://randomuser.me/api/?page=1&results=1&seed=abc'
        );
        const data = await response.json();
        setUser(data.results[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow p-6">
        <div className="animate-pulse flex gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white border border-red-300 rounded-lg shadow p-6">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-6">
        {/* User's image */}
        <div className="w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden">
          <img
            src={user?.picture?.large}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User details */}
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-bold text-gray-800">
            {user?.name?.first} {user?.name?.last}
          </div>
          <div className="text-gray-600 text-lg capitalize">{user?.gender}</div>
          <div className="text-gray-500">{user?.phone}</div>
        </div>
      </div>

      {/* Additional user information */}
      <div className="mt-6 border-t pt-4">
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Address:</span>{' '}
          {user?.location?.city}, {user?.location?.country}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
