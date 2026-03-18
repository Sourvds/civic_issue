import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          🌐 LocalPulse
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/report" className="hover:text-blue-200">
                Report Issue
              </Link>
              <Link to="/map" className="hover:text-blue-200">
                Map
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:text-blue-200">
                  Admin
                </Link>
              )}
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-2">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="block hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/report" className="block hover:text-blue-200">
                Report Issue
              </Link>
              <Link to="/map" className="block hover:text-blue-200">
                Map
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="block hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="block hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
