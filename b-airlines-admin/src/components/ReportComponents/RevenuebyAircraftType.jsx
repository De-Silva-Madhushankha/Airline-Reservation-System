import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd'; 
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'; // Import chart components

export default function RevenuebyAircraftType() {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/revenue-by-aircraft-type');
        setRevenueData(response.data); 
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        message.error("Failed to fetch revenue data");
      }
    };

    fetchRevenueData();
  }, []);

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
      render: (revenue) => `$${revenue.toFixed(2)}`, 
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CD1']; // Colors for pie slices

  return (
    <div className="admin-report">
      <h1 className="text-center font-bold mt-5 text-2xl">Total Revenue Generated By Aircrafts</h1>

      <div className="mt-8">
        <Table 
          columns={revenueColumns} 
          dataSource={revenueData} 
          rowKey="aircraft_model" 
          pagination={false}
          bordered
        />
      </div>

      <div className="flex mt-8 justify-around">
        <ResponsiveContainer width="45%" height={400}>
          <BarChart 
            data={revenueData}  
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="aircraft_model" label={{ value: 'Aircraft Model', position: 'insideBottomRight', offset: -10 }} />
            <YAxis label={{ value: 'Total Revenue ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="total_revenue" fill="black" name="Total Revenue" barSize={30} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="60%" height={400}>
          <PieChart>
            <Pie 
              data={revenueData} 
              dataKey="total_revenue" 
              nameKey="aircraft_model" 
              cx="50%" 
              cy="50%" 
              outerRadius={150} 
              label={(entry) => `$${entry.total_revenue.toFixed(2)}`}
            >
              {revenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
