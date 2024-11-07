import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    axios.post('http://localhost:3000/api/signup', { 
      username,
      profession,
      phoneNumber,
      email,
      address,
      city,
      password,
    })
    .then(response => {
      if (response.data.status) {
        setSuccessMessage('Successfully registered! Please log in.');
        setTimeout(() => navigate('/login'), 3000);
      } else if (response.data.error) {
        setErrorMessage(response.data.error);
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        setErrorMessage('User already exists. Please log in.');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid data provided. Please check the details.');
      } else if (error.message === "Network Error") {
        setErrorMessage('Network error. Please check your connection.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      console.log(error);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession:</label>
            <input 
              type="text" 
              id="profession" 
              placeholder="Profession"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setProfession(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input 
              type="number" 
              id="phone" 
              placeholder="Phone Number"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              autoComplete="off"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <input 
              type="text" 
              id="address" 
              placeholder="Address"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
            <input 
              type="text" 
              id="city" 
              placeholder="City"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input 
              type="password" 
              id="password" 
              placeholder="******"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="******"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>

          {errorMessage && (
            <div className="p-2 mt-2 text-center text-red-600 bg-red-100 border border-red-400 rounded">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-2 mt-2 text-center text-green-600 bg-green-100 border border-green-400 rounded">
              {successMessage}
            </div>
          )}

          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Sign Up
          </button>

          <div className="mt-4 text-sm text-center text-gray-600">
            Have an Account? 
            <Link to='/login' className="ml-1 text-blue-600 hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
