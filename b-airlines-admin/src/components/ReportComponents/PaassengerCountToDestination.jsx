import React, { useState } from 'react';
import axios from '../../axiosConfig.js'; 
import { DatePicker, Input, message, Select, Table } from 'antd';

const { RangePicker } = DatePicker;

export default function PaassengerCountToDestination() {
  const [destinationCode, setDestinationCode] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [passengerCount, setPassengerCount] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState([]); 

  const handleSubmit = async () => {
    if (!destinationCode || dateRange.length === 0) {
      message.error("Please enter a destination code and select a date range");
      return;
    }

    try {

      const [startDate, endDate] = dateRange;

      const response = await axios.get('/admin/user-count-destination', {
        params: {
          destinationCode,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });

      const passengerCount = response.data.passengerCount;
      const passengerDetails = response.data.passengerDetails;

      setPassengerCount(passengerCount);
      setPassengerDetails(passengerDetails);
    } catch (err) {
      console.error("Error fetching passenger count and details:", err);
      message.error("Failed to fetch passenger count and details");
    }
  };

  const columns = [
    {
      title: 'Passenger Name',
      dataIndex: 'passenger_name',
      key: 'passenger_name',
    },
    {
      title: 'Passenger Age',
      dataIndex: 'passenger_age',
      key: 'passenger_age',
    }
  ];

  const { Option } = Select;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-gray-800 dark:text-white text-center text-2xl mb-8 font-bold">
            Passenger Traffic to Destination        </h1>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 mb-2">
            Select Destination
          </label>
          <Select 
            placeholder="Select Destination" 
            size="large"
            className="w-full" 
            value={destinationCode} 
            onChange={setDestinationCode}
          >
            <Option value="BIA">Colombo (BIA)</Option>
            <Option value="BKK">Bangkok (BKK)</Option>
            <Option value="BOM">Mumbai (BOM)</Option>
            <Option value="CGK">Jakarta (CGK)</Option>
            <Option value="DEL">Delhi (DEL)</Option>
            <Option value="DMK">Don Mueang (DMK)</Option>
            <Option value="DPS">Kuta (DPS)</Option>
            <Option value="HRI">Mattala (HRI)</Option>
            <Option value="MAA">Chennai (MAA)</Option>
            <Option value="SIN">Singapore (SIN)</Option>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 mb-2">
            Select Period
          </label>
          <RangePicker 
            size="large" 
            style={{ width: '100%' }} 
            className="w-full"
            onChange={(dates) => setDateRange(dates)}
          />
        </div>

        <button 
          type="button" 
          className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {passengerCount !== null && (
        <div className="mt-4 text-center text-black dark:text-gray-800 bg-white rounded-lg flex flex-col items-center">
            <strong className="p-4">Passenger Count: {passengerCount}</strong>
          </div>
        )}

        {passengerDetails.length > 0 && (
          <Table 
            dataSource={passengerDetails} 
            columns={columns} 
            rowKey="passenger_name" 
            pagination={false} 
            className="mt-4"
          />
        )}
      </div>
    </div>
  );
}
