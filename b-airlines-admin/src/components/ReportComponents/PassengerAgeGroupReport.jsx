import React, { useEffect, useState } from 'react';
import { Select, message, Table, Progress, Typography, Button } from 'antd';
import axios from '../../axiosConfig.js';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const PassengerAgeGroupReport = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);

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

  const handleFlightSelect = (flightId) => {
    const flight = flights.find(f => f.flight_id === flightId);
    setSelectedFlight(flight);
    setPassengerCount(null);  
  };

  const handleGenerateReport = async () => {
    if (selectedFlight) {
      try {
        const response = await axios.get('/admin/user-count-age', {
          params: { flightNumber: selectedFlight.flight_id },
        });
        
        if (response.data && response.data.passengerCount) {
          setPassengerCount(response.data.passengerCount);
          message.success("Report generated successfully!");
        } else {
          message.error("No passenger count data available.");
        }
      } catch (err) {
        console.error("Error fetching passenger count:", err);
        message.error("Failed to fetch passenger count");
      }
    } else {
      message.error("Please select a flight before generating the report.");
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
        <h1 className='text-black text-2xl mb-5 font-bold'> Passenger Demographics by Age</h1>

        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Select Flight For Report</label>
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

        <Button 
        type="default"
        onClick={handleGenerateReport} 
        className="w-full mb-4"
        style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
        >
          Generate Report
        </Button>

         
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

export default PassengerAgeGroupReport;
