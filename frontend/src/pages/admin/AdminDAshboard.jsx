// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/users');
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch user data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const approveUser = async (email) => {
//     try {
//       await axios.post('http://localhost:3000/api/admin/approve', { email });
//       setUsers(users.map(user => 
//         user.email === email ? { ...user, approved: true, isApproved: true } : user
//       ));
//     } catch (error) {
//       setError('Failed to approve user. Please try again later.');
//     }
//   };

//   const rejectUser = async (email) => {
//     try {
//       await axios.post('http://localhost:3000/api/admin/reject', { email });
//       setUsers(users.map(user => 
//         user.email === email ? { ...user, approved: false, isApproved: false } : user
//       ));
//     } catch (error) {
//       setError('Failed to reject user. Please try again later.');
//     }
//   };

//   return (
//     <div className="p-6 sm:p-8 lg:p-12">
//       <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Admin Dashboard</h2>

//       {loading ? (
//         <div className="text-center text-gray-600">Loading users...</div>
//       ) : error ? (
//         <div className="text-center text-red-600">{error}</div>
//       ) : (
//         <div className="overflow-x-auto mt-6 rounded-lg shadow-lg">
//           <table className="min-w-full bg-white rounded-lg border border-gray-200 shadow-md">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Username</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">City</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Profession</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user._id} className="border-b hover:bg-gray-50 transition duration-150">
//                   <td className="px-4 py-2 text-sm text-gray-800">{user._id}</td>
//                   <td className="px-4 py-2 text-sm text-gray-800">{user.username}</td>
//                   <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
//                   <td className="px-4 py-2 text-sm text-gray-800">{user.phoneNumber}</td>
//                   <td className="px-4 py-2 text-sm text-gray-800">{user.address}</td>
//                   <td className="px-4 py-2 text-sm text-gray-800">{user.city}</td>
//                   <td className="px-4 py-2 text-sm text-gray-800">{user.profession}</td>
//                   <td className="px-4 py-2 text-sm">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       user.isApproved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//                     }`}>
//                       {user.isApproved ? 'Accessible' : 'Not Accessible'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 text-sm">
//                     {user.approved ? (
//                       <span className="text-green-600 font-semibold">User Approved</span>
//                     ) : (
//                       <div className="space-x-2">
//                         <button 
//                           className="text-green-600 font-semibold hover:underline" 
//                           onClick={() => approveUser(user.email)}
//                         >
//                           Approve
//                         </button>
//                         <button 
//                           className="text-red-600 font-semibold hover:underline" 
//                           onClick={() => rejectUser(user.email)}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/verifyAdmin')
      .then(res => {
        if (!res.data.status) {
          navigate('/admin');
        }
      });
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const approveUser = async (email) => {
    try {
      await axios.post('http://localhost:3000/api/admin/approve', { email });
      setUsers(users.map(user => 
        user.email === email ? { ...user, approved: true, isApproved: true } : user
      ));
    } catch (error) {
      setError('Failed to approve user. Please try again later.');
    }
  };

  const rejectUser = async (email) => {
    try {
      await axios.post('http://localhost:3000/api/admin/reject', { email });
      setUsers(users.map(user => 
        user.email === email ? { ...user, approved: false, isApproved: false } : user
      ));
    } catch (error) {
      setError('Failed to reject user. Please try again later.');
    }
  };


  const logoutAdmin = async () => {
    try {
      await axios.post('http://localhost:3000/api/admin/logout');
      navigate('/admin'); // Redirect to admin login page after logout
    } catch (error) {
      setError('Failed to logout. Please try again later.');
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Admin Dashboard</h2>

      <div className="text-right mb-4">
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={logoutAdmin}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto mt-6 rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Username</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
                <th className="px-4 py-3 text-left text-sm font-medium">City</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Profession</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-2 text-sm text-gray-800">{user._id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.phoneNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.address}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.city}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.profession}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.isApproved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {user.isApproved ? 'Accessible' : 'Not Accessible'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {user.approved ? (
                      <span className="text-green-600 font-semibold">User Approved</span>
                    ) : (
                      <div className="space-x-2">
                        <button 
                          className="text-green-600 font-semibold hover:underline" 
                          onClick={() => approveUser(user.email)}
                        >
                          Approve
                        </button>
                        <button 
                          className="text-red-600 font-semibold hover:underline" 
                          onClick={() => rejectUser(user.email)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
