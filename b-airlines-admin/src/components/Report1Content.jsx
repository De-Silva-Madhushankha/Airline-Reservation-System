import React, { useState } from 'react';
import { DatePicker, Input, message ,Flex, Progress} from 'antd';
import axios from 'axios'; // Import Axios


export default function Report1Content() {
  const [flightNumber, setFlightNumber] = useState('');
  const [passengerCount, setPassengerCount] = useState(null);

  const handleSubmit = async () => {
    if (!flightNumber) {
      message.error("Please enter a Flight Number");
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/admin/user-count-age', {
        params: {
          flightNumber
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
          Above age 18 / Below age 18
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Enter Flight Number
          </label>
          <Input 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>


        <button 
          type="button" 
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {passengerCount != null && (
        <div className="mt-4 text-center text-black dark:text-gray-800 bg-white rounded-lg flex flex-col  items-center">
        
        <div className="flex flex-row gap-12 mt-4">
          <div className="basis-1/2 ">
            <h2>Above_18</h2>
            <strong> {passengerCount.pax_above_18}</strong>
          </div>
          <div className="basis-1/2">
            <h2>Below_18</h2>
            <strong>{passengerCount.pax_below_18}</strong>
          </div>
        </div>
        <div className="mt-4 flex justify-center mb-4">
          <Flex gap="small" wrap>
            <Progress
              type="dashboard"
              percent={passengerCount.pax_above_18 * 100 / (passengerCount.pax_above_18 + passengerCount.pax_below_18)}
            />
            <Progress
              type="dashboard"
              percent={passengerCount.pax_below_18 * 100 / (passengerCount.pax_above_18 + passengerCount.pax_below_18)}
              gapDegree={60}
            />
          </Flex>
        </div>
      </div>
      
        )}
      </div>
    </div>
  );
}
