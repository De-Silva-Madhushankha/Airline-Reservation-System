import React from 'react';
import { ChevronDown, Plane } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const FlightSchedule = () => {
  const location = useLocation();
  const flights = location.state?.flights || [];
  console.log("Flights: ", flights);
  
  if (flights.length === 0) {
    return <div>No flights available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Flight Schedules</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {flights.map((flight, index) => (
          <div key={index} className={`flex flex-col md:flex-row justify-between items-center p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex items-center mb-2 md:mb-0">
              <Plane className="mr-2 text-blue-500" />
              <span className="font-semibold">{flight.flightNo}</span>
            </div>
            <div className="flex items-center">
              <div className="text-center mr-4">
                <div className="text-lg font-bold">{flight.departure}</div>
                <div className="text-sm text-gray-500">Departure</div>
              </div>
              <ChevronDown className="hidden md:block text-gray-400" />
              <div className="text-center ml-4">
                <div className="text-lg font-bold">{flight.arrival}</div>
                <div className="text-sm text-gray-500">Arrival</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2 md:mt-0">
              Duration: {flight.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSchedule;
