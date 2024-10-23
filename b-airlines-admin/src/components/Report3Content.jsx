import React, { useState } from 'react';
import { DatePicker, Input, message , Flex, Progress} from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

export default function Report3Content() {
  const [dateRange, setDateRange] = useState([]);
  const [passengerCount, setPassengerCount] = useState(null);

  const handleSubmit = async () => {
    if (dateRange.length === 0) {
      message.error("Please enter a date range");
      return;
    }

    try {
      const [startDate, endDate] = dateRange;
      const response = await axios.get('http://localhost:3001/api/admin/passenger-count-time', {
        params: {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });

      setPassengerCount(response.data.passengerCount); // Update the passenger count
    } catch (err) {
      console.error("Error fetching passenger count:", err);
      message.error("Failed to fetch passenger count");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-gray-800 dark:text-white text-center text-xl mb-8">
          Passenger Types Count 
        </h1>

        

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
        
          <div className="flex flex-row gap-12 mt-4">
          <div className="mt-4 text-center text-black dark:text-gray-800 bg-white rounded-lg flex flex-col  items-center">
            <strong className='p-4'>Type 1 Count: {passengerCount.Type1}</strong>
            <strong className='p-4'>Type 2 Count: {passengerCount.Type2}</strong>
            <strong className='p-4'>Type 3 Count: {passengerCount.Type3}</strong>
        </div>
          </div>
          <div className="mt-4 flex justify-center mb-4">
            <Flex gap="small" wrap>
              <Progress
                type="dashboard"
                percent={passengerCount.Type1 * 100 / (passengerCount.Type1 + passengerCount.Type2 + passengerCount.Type3)}
              />
              <Progress
                type="dashboard"
                percent={passengerCount.Type2 * 100 / (passengerCount.Type1 + passengerCount.Type2 + passengerCount.Type3)}
                gapDegree={60}
              />
              <Progress
                type="dashboard"
                percent={passengerCount.Type3 * 100 / (passengerCount.Type1 + passengerCount.Type2 + passengerCount.Type3)}
              />
            </Flex>
          </div>
        </div>
        
        
        
        )}
      </div>
    </div>
  );
}
