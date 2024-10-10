import React, { useState, useEffect } from 'react';
import { DatePicker, Select, message, Card, Space, Spin } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function PassengerAnalysisComponent() {
  const [destinationCode, setDestinationCode] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinationCodes, setDestinationCodes] = useState([]);

  useEffect(() => {
    fetchDestinationCodes();
  }, []);

  const fetchDestinationCodes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/route/destination-codes');
      const codes = response.data.map(item => item.destination_code); // Extracting destination_code
      setDestinationCodes(codes); // Set destination codes as an array of strings
    } catch (err) {
      console.error("Error fetching destination codes:", err);
      message.error("Failed to fetch destination codes");
    }
  };

  const handleSubmit = async () => {
    if (!destinationCode || dateRange.length !== 2) {
      message.error("Please select a Destination Code and a date range");
      return;
    }

    setLoading(true);

    try {
      const [startDate, endDate] = dateRange;
      const response = await axios.get('http://localhost:3001/api/admin/passenger-count-by-destination', {
        params: {
          destinationCode,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });

      setPassengerData(response.data);
    } catch (err) {
      console.error("Error fetching passenger data:", err);
      message.error("Failed to fetch passenger data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card title="Passenger Analysis" className="w-full max-w-4xl mx-auto">
        <Space direction="vertical" size="large" className="w-full">
          <Select
            placeholder="Select Destination Code"
            className="w-full"
            value={destinationCode}
            onChange={setDestinationCode}
          >
            {destinationCodes.map(code => (
              <Option key={code} value={code}>{code}</Option>
            ))}
          </Select>
          <RangePicker
            className="w-full"
            onChange={(dates) => setDateRange(dates)}
          />
          <button
            type="button"
            className="w-full h-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleSubmit}
          >
            Analyze Passenger Data
          </button>
          
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : passengerData.length > 0 ? (
            <Card title="Passenger Count Analysis" className="mt-8">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={passengerData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="passengerCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          ) : null}
        </Space>
      </Card>
    </div>
  );
}
