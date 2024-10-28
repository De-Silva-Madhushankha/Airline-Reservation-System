import React, { useEffect, useState } from 'react';
import { Select, message, Table, Progress, Typography, DatePicker, Input } from 'antd';
import axios from '../axiosConfig.js';
import dayjs from 'dayjs';


const { Title } = Typography;
const { Option } = Select;

const Report1Content = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);

  // Fetch all flights on component mount
  const fetchFlights = async () => {
    try {
      const response = await axios.get('/flight/flights');
      setFlights(response.data);
      console.log("Flights fetched successfully:", response.data);
    } catch (error) {
      console.error("Failed to fetch flights:", error);
      message.error('Failed to fetch flights');
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // Handle flight selection and fetch passenger count for selected flight
  const handleFlightSelect = async (flightId) => {
    const flight = flights.find(f => f.flight_id === flightId);
    setSelectedFlight(flight);
    setPassengerCount(null);  // Reset passenger count when selecting a new flight

    try {

      const response = await axios.get('/admin/user-count-age', {
        params: { flightNumber: flightId },

      });
      
      // Check if the response data has the expected structure
      if (response.data && response.data.passengerCount) {
        setPassengerCount(response.data.passengerCount);
      } else {
        message.error("No passenger count data available.");
      }
    } catch (err) {
      console.error("Error fetching passenger count:", err);
      message.error("Failed to fetch passenger count");
    }
  };

  const columns = [
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Age Group', dataIndex: 'age_group', key: 'age_group' },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1 className='text-black text-2xl mb-5 font-bold'> Above 18 / Below 18</h1>

        <div className="mb-4">
          <label className="block  text-gray-800 mb-2">Select Flight For Report</label>
          <Select
            className="w-full"
            placeholder="Select a flight"
            onChange={handleFlightSelect}
            value={selectedFlight ? selectedFlight.flight_id : undefined}
          >
            {flights.map((flight) => (
              <Option key={flight.flight_id} value={flight.flight_id}>
                {flight.flight_id}
              </Option>
            ))}
          </Select>
        </div>

        {selectedFlight && passengerCount && (
          <div className="mt-4 text-center text-black dark:text-gray-800 bg-white rounded-lg flex flex-col items-center">
            <div className="flex flex-row gap-24 mt-4">
              <div className="basis-1/2">
                <h2>Above 18</h2>
                <strong>{passengerCount.above18 || 0}</strong>
              </div>
              <div className="basis-1/2">
                <h2>Below 18</h2>
                <strong>{passengerCount.below18 || 0}</strong>
              </div>
            </div>
            <div className="mt-4 flex justify-center mb-4 gap-6">
              <Progress 
                type="dashboard" 
                percent={((passengerCount.above18 * 100) / (passengerCount.above18 + passengerCount.below18) || 0).toFixed(2)} 
              />
              <Progress 
                type="dashboard" 
                percent={((passengerCount.below18 * 100) / (passengerCount.above18 + passengerCount.below18) || 0).toFixed(2)} 
              />
            </div>
            <div className="mt-4">
              <h2 className="mb-2 font-bold">Passenger Details</h2>
              <Table 
                columns={columns} 
                dataSource={passengerCount.result || []} 
                rowKey="first_name" 
                pagination={false} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report1Content;
