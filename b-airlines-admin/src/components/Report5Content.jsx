import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd'; // Import Table for displaying revenue
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import chart components

export default function Report5Content() {
  const [revenueData, setRevenueData] = useState([]); // State to hold revenue data

  useEffect(() => {
    // Fetch revenue data on component mount
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/revenue-by-aircraft-type');
        setRevenueData(response.data); // Update the revenue data state
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        message.error("Failed to fetch revenue data");
      }
    };

    fetchRevenueData(); // Fetch revenue data
  }, []);

  // Define table columns for revenue data
  const revenueColumns = [
    {
      title: 'Aircraft Model',
      dataIndex: 'aircraft_model',
      key: 'aircraft_model',
    },
    {
      title: 'Total Revenue',
      dataIndex: 'total_revenue',
      key: 'total_revenue',
      render: (revenue) => `$${revenue.toFixed(2)}`, // Format as currency
    },
  ];

  return (
    <div>
      {/* Revenue Table */}
      <div className="mt-8">
        <Table 
          columns={revenueColumns} 
          dataSource={revenueData} 
          rowKey="aircraft_model" 
          pagination={false} // Disable pagination for simplicity
        />
      </div>

      {/* Revenue Bar Chart */}
      <div className="mt-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="aircraft_model" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="total_revenue" fill="#8884d8" name="Total Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
