import React from 'react';
import { ChevronRight, Plane } from 'lucide-react';
import './FlightScheduleComponent.css';
import moment from 'moment'; // Ensure moment.js is installed for date formatting

const FlightSchedule = ({ flights, onFlightSelect }) => {
  if (!flights || flights.length === 0) {
    return <div className="no-flights text-center text-gray-500">No flights available</div>;
  }

  // Format time using moment.js for better readability
  const formatTime = (date, time) => moment(`${date.substring(0, 10)}T${time}`).format('MMM Do, YYYY h:mm A');

  const calculateDuration = (dep_date, dep_time, arr_date, arr_time) => {
    const departure = moment(`${dep_date.substring(0, 10)}T${dep_time}`);
    const arrival = moment(`${arr_date.substring(0, 10)}T${arr_time}`);
    const duration = moment.duration(arrival.diff(departure));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flight-schedule-container max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800" style={{ padding: '20px' }}>Flight Schedules</h1>

      <div className="flight-list bg-white shadow-lg rounded-lg overflow-hidden">
        {flights.map((flight, index) => (
          <div
            key={index}
            className={`flight-item flex flex-col md:flex-row justify-between items-center p-6 border-b transition duration-300 ${
              index % 2 === 0 ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
            } hover:bg-gray-800 hover:text-white`}
            onClick={() => onFlightSelect(flight)} // Call onFlightSelect when a flight is clicked
          >
            {/* Aircraft and flight ID */}
            <div className="flex items-center mb-4 md:mb-0 md:flex-1">
              <Plane className="mr-4 text-gray-500 hover:text-white transition" />
              <span className="font-semibold text-lg">{flight.aircraft_id}</span>
              <span className="ml-2 text-sm text-gray-400">({flight.origin_code} → {flight.destination_code})</span>
            </div>

            {/* Departure, Chevron, and Arrival */}
            <div className="flex items-center justify-center md:flex-1">
              <div className="text-center mr-4">
                <div className="text-lg font-bold">{formatTime(flight.departure, flight.dep_time)}</div>
                <div className="text-sm text-gray-400">Departure</div>
              </div>
              <ChevronRight className="mx-2 text-gray-500" />
              <div className="text-center ml-4">
                <div className="text-lg font-bold">{formatTime(flight.arrival, flight.arr_time)}</div>
                <div className="text-sm text-gray-400">Arrival</div>
              </div>
            </div>

            {/* Duration */}
            <div className="duration flex items-center md:flex-1 justify-end text-sm">
              Duration: {calculateDuration(flight.departure, flight.dep_time, flight.arrival, flight.arr_time)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSchedule;
