import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Users = () => {

    const [users, setUsers] = useState([]);
    console.log(users);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('https://mern-api-wine.vercel.app/api/users', { withCredentials: true });
            
            setUsers(response.data.users);
            setLoading(false);
          } catch (error) {
            setError('Failed to fetch products');
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);

      

  return (
    <div>Users</div>
  )
}

export default Users