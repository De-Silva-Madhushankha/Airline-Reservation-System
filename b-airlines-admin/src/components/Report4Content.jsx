import React, { useState, useEffect } from 'react';
import { DatePicker, Select, Table, message } from 'antd';
import axios from '../axiosConfig.js';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Report4Content() {
  const [originCode, setOriginCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false); // To manage loading state

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/route/routes');
      setRoutes(response.data);
    } catch (error) {
      message.error('Failed to fetch routes');
      console.error('Error fetching routes:', error); 
    }
  };

  const fetchReportData = async () => {
    if (!originCode || !destinationCode || dateRange.length === 0) {
      message.error("Please select both origin, destination codes, and a date range");
      return;
    }

    try {
      setLoading(true); // Start loading when fetching data
      const [startDate, endDate] = dateRange;
      const response = await axios.get('/admin/past-flights-report', {
        params: {
          originCode,
          destinationCode,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });
      
      console.log("Response:", response.data);
      setReportData(response.data.flights || []); // Set fetched data to state
    } catch (err) {
      console.error("Failed to fetch report data:", err);
      message.error("Failed to fetch report data");
    } finally {
      setLoading(false); // End loading after fetch is done
    }
  };



  const columns = [
    {
      title: 'Flight ID',
      dataIndex: 'flight_id',
      key: 'flight_id',
    },
    {
      title: 'Aircraft ID',
      dataIndex: 'aircraft_id',
      key: 'aircraft_id',
    },
    {
      title: 'Origin Code',
      dataIndex: 'origin_code',
      key: 'origin_code',
    },
    {
      title: 'Destination Code',
      dataIndex: 'destination_code',
      key: 'destination_code',
    },
    {
      title: 'Departure Time',
      dataIndex: 'departure',
      key: 'departure',
      render: (departure) => dayjs(departure).format('MMM Do, YYYY h:mm A'),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrival',
      key: 'arrival',
      render: (arrival) => dayjs(arrival).format('MMM Do, YYYY h:mm A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'On Time' ? 'text-green-600' : 'text-red-600'}>
          {status}
        </span>
      ),
    },
    {
      title: 'Passenger Count',
      dataIndex: 'passenger_count',
      key: 'passenger_count',
      render: (count) => count || 0,
    },
    
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">

  
  <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h1 className="text-center text-2xl mb-8 text-black font-bold">Admin Flight Report</h1>

    
    <div className="mb-4">
      <label className="block mb-2 text-gray-500">Select Date Range</label>
      <RangePicker
        className="w-full"
        onChange={(dates) => setDateRange(dates)}
        format="YYYY-MM-DD" 
      />
    </div>

    
    <div className="mb-4">
      <label className="block mb-2 text-gray-500">Select a Route</label>
      <Select
        placeholder="Select a route"
        className="w-full"
        onChange={(value) => {
          const selectedRoute = routes.find(route => route.route_id === value);
          if (selectedRoute) {
            setOriginCode(selectedRoute.origin_code);
            setDestinationCode(selectedRoute.destination_code);
          }
        }}
      >
        {routes.map(route => (
          <Option key={route.route_id} value={route.route_id}>
            {route.origin_code} to {route.destination_code}
          </Option>
        ))}
      </Select>
    </div>

    
    <button
      type="button"
      className="w-full bg-gray-700 text-white py-2 rounded"
      onClick={fetchReportData}
    >
      Fetch Report
    </button>
  </div>

  
  {reportData.length > 0 && (
    <div className="mt-8 w-full max-w-5xl">
      <Table columns={columns} dataSource={reportData} rowKey="flight_id" loading={loading} />
    </div>
  )}
</div>

  );
}
