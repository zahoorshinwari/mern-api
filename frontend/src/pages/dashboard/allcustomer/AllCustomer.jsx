import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCustomer = () => {
    const [data, setData] = useState({ companies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/companies');
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <div className="text-blue-500">Loading...</div>;
    if (error) return <div className="text-red-500 font-bold">Error: {error}</div>;

    const companies = data.companies || []; 

    if (!Array.isArray(companies) || companies.length === 0) {
        return <div>No customers available.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">All Customers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                    <div key={company._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-bold">{company.companyName}</h2>
                        <p className="text-gray-700"><strong>Address:</strong> {company.companyAddress}</p>
                        <p className="text-gray-700"><strong>City:</strong> {company.companyCity}</p>
                        <p className="text-gray-700"><strong>Business Nature:</strong> {company.businessNature}</p>
                        <p className="text-gray-700"><strong>total amount:</strong> {company.totalAmount}</p>
                        <p className="text-gray-700"><strong>website:</strong> {company.companyWebsite}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCustomer;
