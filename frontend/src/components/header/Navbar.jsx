import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaBars, FaTimes } from 'react-icons/fa'; 
import axios from 'axios';

const Navbar = () => {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/api/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-10 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-400">
            Demo
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          {/* <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link> */}
          <Link to="/admin" className="hover:text-blue-400">
            admin
          </Link> 
          <button onClick={handleLogout} className="hover:text-blue-400">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-gray-700">
          {/* <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-gray-600">
            Dashboard
          </Link> */}
          <Link to="/admin" className="block px-4 py-2 text-white hover:bg-gray-600">
            admin
          </Link> 
          <button onClick={handleLogout} className="block px-4 py-2 text-white hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
