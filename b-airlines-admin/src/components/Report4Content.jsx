import React, { useState, useEffect } from 'react';
import { DatePicker, Select, Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Report4Content() {
  const [originCode, setOriginCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/route/routes');
      setRoutes(response.data);
    } catch (error) {
      message.error('Failed to fetch routes');
      console.error('Error fetching routes:', error); // More detailed logging
    }
  };

  const fetchReportData = async () => {
    if (!originCode || !destinationCode || dateRange.length === 0) {
      message.error("Please select both origin, destination codes, and a date range");
      return;
    }

    try {
      const [startDate, endDate] = dateRange;
      const response = await axios.get('http://localhost:3001/api/admin/past-flights-report', {
        params: {
          originCode,
          destinationCode,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });
      
      console.log("Response:", response.data);
      setReportData(response.data.flights || []);
    } catch (err) {
      console.error("Failed to fetch report data:", err);
      message.error("Failed to fetch report data");
    }
  };

  const handleChangeStatus = async (flightId, newStatus) => {
    try {
      await axios.post(`http://localhost:3001/api/admin/update-flight-status`, {
        flight_id: flightId,
        status: newStatus,
      });
      message.success('Flight status updated successfully');
      fetchReportData();
    } catch (error) {
      console.error('Failed to update flight status:', error);
      message.error('Failed to update flight status');
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
      render: (departure) => moment(departure).format('MMM Do, YYYY h:mm A'),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrival',
      key: 'arrival',
      render: (arrival) => moment(arrival).format('MMM Do, YYYY h:mm A'),
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
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Select
          value={record.status} // Use value instead of defaultValue
          onChange={(newStatus) => handleChangeStatus(record.flight_id, newStatus)}
          style={{ width: 120 }}
        >
          <Option value="On Time">On Time</Option>
          <Option value="Delayed">Delayed</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="admin-report">
      <h1 className="text-center text-xl mb-8">Admin Flight Report</h1>

      {/* Date Range Picker */}
      <div className="mb-4">
        <label className="block mb-2">Select Date Range</label>
        <RangePicker 
          className="w-full" 
          onChange={(dates) => setDateRange(dates)} 
          format="YYYY-MM-DD" // Optional: set a specific format for consistency
        />
      </div>

      {/* Route Selection */}
      <div className="mb-4">
        <label className="block mb-2">Select a Route</label>
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
          {routes.map((route) => (
            <Option key={route.route_id} value={route.route_id}>
              {route.origin_code} to {route.destination_code}
            </Option>
          ))}
        </Select>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        className="w-full bg-blue-700 text-white py-2 rounded"
        onClick={fetchReportData}
      >
        Fetch Report
      </button>

      {/* Table Display */}
      <div className="mt-8">
        <Table columns={columns} dataSource={reportData} rowKey="flight_id" />
      </div>
    </div>
  );
}
