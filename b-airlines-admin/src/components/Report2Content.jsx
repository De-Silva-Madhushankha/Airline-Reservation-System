import React, { useState } from 'react';
import { DatePicker, Input, message } from 'antd';
import axios from '../axiosConfig.js'; 

const { RangePicker } = DatePicker;

export default function Report2Content() {
  const [destinationCode, setDestinationCode] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [passengerCount, setPassengerCount] = useState(null);

  const handleSubmit = async () => {
    if (!destinationCode || dateRange.length === 0) {
      message.error("Please enter a destination code and select a date range");
      return;
    }

    try {

      const [startDate, endDate] = dateRange;
      console.log(startDate);
      const response = await axios.get('/admin/user-count-destination', {
        params: {
          destinationCode,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });

  // Access the passenger count from the response
  const passengerCount = response.data.passengerCount[0]?.passenger_count || 0;

  // Update the passenger count
  setPassengerCount(passengerCount);
} catch (err) {
  console.error("Error fetching passenger count:", err);
  message.error("Failed to fetch passenger count");
}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-gray-800 dark:text-white text-center text-xl mb-8">
          Passenger Count by Destination
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Enter Destination Code
          </label>
          <Input 
            placeholder="Enter Destination Code" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={destinationCode}
            onChange={(e) => setDestinationCode(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
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
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {passengerCount !== null && (
        <div className="mt-4 text-center text-black dark:text-gray-800 bg-white rounded-lg flex flex-col  items-center">
            <strong className='p-4'>Passenger Count: {passengerCount}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
