import React, { useState } from 'react';
import { DatePicker, Input, message } from 'antd';
import axios from 'axios'; // Import Axios

const { RangePicker } = DatePicker;

export default function Report1Content() {
  const [flightNumber, setFlightNumber] = useState('');
  const [passengerCount, setPassengerCount] = useState(null);

  const handleSubmit = async () => {
    if (!flightNumber) {
      message.error("Please enter a Flight Number");
      return;
    }

    try {
      const [startDate, endDate] = dateRange;
      const response = await axios.get('http://localhost:3001/api/admin/user-count-destination', {
        params: {
          flightNumber
        },
      });

      setPassengerCount(response.data.passengerCount);
    } catch (err) {
      console.error("Error fetching passenger count:", err);
      message.error("Failed to fetch passenger count");
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Age Group',
      dataIndex: 'age_group',
      key: 'age_group',
    },
  ];

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
          <div className="mt-4 text-center text-black dark:text-gray-800 bg-white rounded-lg flex flex-col items-center">
            <div className="flex flex-row gap-12 mt-4">
              <div className="basis-1/2">
                <h2>Above_18</h2>
                <strong>{passengerCount.above18}</strong>
              </div>
              <div className="basis-1/2">
                <h2>Below_18</h2>
                <strong>{passengerCount.below18}</strong>
              </div>
            </div>
            <div className="mt-4 flex justify-center mb-4">
              <Flex gap="small" wrap>
                <Progress
                  type="dashboard"
                  percent={((passengerCount.above18 * 100) / (passengerCount.above18 + passengerCount.below18)).toFixed(2)}
                />
                <Progress
                  type="dashboard"
                  percent={((passengerCount.below18 * 100) / (passengerCount.above18 + passengerCount.below18)).toFixed(2)}
                  gapDegree={60}
                />
              </Flex>
            </div>

            {/* Table to display passenger details */}
            <div className="mt-4">
              <h2 className='mb-2'>Passenger Details</h2>
              <Table 
                columns={columns} 
                dataSource={passengerCount.result} 
                rowKey="first_name" 
                pagination={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
