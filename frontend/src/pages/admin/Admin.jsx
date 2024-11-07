// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Admin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
  
//   const navigate = useNavigate();

//   const handleAdminLogin = (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');

//     // Replace with your admin login API endpoint
//     axios.post('http://localhost:3000/api/admin/login', {
//       email,
//       password,
//     })
//     .then(response => {
//       if (response.data.status) {
//         setSuccessMessage('Admin login successful!');
//         localStorage.setItem('adminEmail', email); // Save admin session
//         setTimeout(() => {
//           navigate('/admin-dashboard'); // Redirect to admin dashboard
//         }, 1500);
//       } else {
//         setErrorMessage('Invalid admin credentials.');
//       }
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 403) {
//         setErrorMessage('Access denied. You are not authorized.');
//       } else if (error.message === "Network Error") {
//         setErrorMessage('Network error. Please check your connection.');
//       } else {
//         setErrorMessage('An unexpected error occurred. Please try again.');
//       }
//       console.error(error);
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
//         <form className="space-y-4" onSubmit={handleAdminLogin}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
//             <input 
//               type="email" 
//               id="email" 
//               placeholder="Admin email"
//               required
//               className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onChange={(e) => setEmail(e.target.value)} 
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
//             <input 
//               type="password" 
//               id="password" 
//               placeholder="******"
//               required
//               className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onChange={(e) => setPassword(e.target.value)} 
//             />
//           </div>
          
//           {errorMessage && (
//             <div className="p-2 mt-2 text-center text-red-600 bg-red-100 border border-red-400 rounded">
//               {errorMessage}
//             </div>
//           )}
          
//           {successMessage && (
//             <div className="p-2 mt-2 text-center text-green-600 bg-green-100 border border-green-400 rounded">
//               {successMessage}
//             </div>
//           )}

//           <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Admin;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Replace with your admin login API endpoint
    axios.post('https://mern-api-wine.vercel.app/api/admin/login', {
      email,
      password,
    })
    .then(response => {
      if (response.data.status) {
        setSuccessMessage('Admin login successful!');
        localStorage.setItem('adminEmail', email); // Save admin session
        setTimeout(() => {
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        }, 1500);
      } else {
        setErrorMessage('Invalid admin credentials.');
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        setErrorMessage('Access denied. You are not authorized.');
      } else if (error.message === "Network Error") {
        setErrorMessage('Network error. Please check your connection.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      console.error(error);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleAdminLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Admin email"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input 
              type="password" 
              id="password" 
              placeholder="******"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)} 
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
