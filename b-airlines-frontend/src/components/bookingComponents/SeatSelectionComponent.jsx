import React, { useState, useEffect } from 'react';
import { Button, message, Select } from 'antd';
import './SeatSelectionComponent.css';
import axios from 'axios';

const { Option } = Select;

const SeatSelectionComponent = ({ passengers, aircraft_id, onSeatsSelected, passengerSeats, globalSelectedSeats, setGlobalSelectedSeats, setPassengerSeats }) => { // Accept global states and functions as props
  const [occupiedSeats, setOccupiedSeats] = useState([2, 5]);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [model, setModel] = useState(null);
  const [economyRows, setEconomyRows] = useState(0);
  const [businessRows, setBusinessRows] = useState(0);
  const [platinumRows, setPlatinumRows] = useState(0);
  const [selectedPassenger, setSelectedPassenger] = useState(passengers[0]?.passport);


  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log('Fetching model for aircraft_id:', aircraft_id);
        const response = await axios.get(`http://localhost:3001/api/aircraft/models/${aircraft_id}`);
        console.log('Aircraft Response:', response.data);
        setModel(response.data.model); // Assuming response contains the model data
      } catch (error) {
        message.error('Failed to fetch aircraft model');
        console.error(error);
      }
    };

    if (aircraft_id) {
      fetchModels();
    }
  }, [aircraft_id]);

  useEffect(() => {
    const fetchModelDetails = async () => {
      if (!model) return; // Prevent fetch if model is not set

      try {
        const response = await axios.get(`http://localhost:3001/api/model/${model}`); // Fetch model details from backend
        const { num_columns, num_economy_rows, num_business_rows, num_platinum_rows } = response.data[0];
        setColumns(num_columns);
        setEconomyRows(num_economy_rows);
        setBusinessRows(num_business_rows);
        setPlatinumRows(num_platinum_rows);
      } catch (error) {
        message.error('Failed to fetch model details');
        console.error(error);
      }
    };

    fetchModelDetails();
  }, [aircraft_id, model]);

  const handleSeatClick = (rowIndex, columnIndex) => {
    const seatLabel = `R${rowIndex + 1}C${columnIndex + 1}`;

    // Check if the seat is already selected globally
    if (globalSelectedSeats[seatLabel] && globalSelectedSeats[seatLabel] !== selectedPassenger) {
      message.error('This seat has already been selected by another passenger!');
      return;
    }

    // If the seat is currently selected by the passenger, deselect it
    const currentPassengerSeat = passengerSeats[selectedPassenger];

    if (currentPassengerSeat === seatLabel) {
      // Deselect the seat
      const updatedGlobalSelectedSeats = { ...globalSelectedSeats };
      delete updatedGlobalSelectedSeats[seatLabel]; // Remove from global selection
      setPassengerSeats({
        ...passengerSeats,
        [selectedPassenger]: null, // Remove passenger's selection
      });
      setGlobalSelectedSeats(updatedGlobalSelectedSeats); // Update global selection state
      return; // Exit the function
    }

    // If not selected, select the new seat and deselect the previous seat if any
    const updatedGlobalSelectedSeats = { ...globalSelectedSeats };

    if (currentPassengerSeat) {
      // Remove the previously selected seat from global selection
      delete updatedGlobalSelectedSeats[currentPassengerSeat];
    }

    updatedGlobalSelectedSeats[seatLabel] = selectedPassenger; // Mark globally selected
    setPassengerSeats({
      ...passengerSeats,
      [selectedPassenger]: seatLabel, // Add new selection for passenger
    });
    setGlobalSelectedSeats(updatedGlobalSelectedSeats); // Update global selection state
  };

  const handleConfirmSelection = () => {
    if (Object.keys(passengerSeats).length < passengers.length) {
      message.error('Please assign seats to all passengers.');
      return;
    }

    onSeatsSelected(passengerSeats); // Return selected seats for each passenger
    message.success('Seats selected successfully!');
  };

  // Render seat rows based on class
  const renderSeats = (startRow, numRows, className) => (
    <div className={`${className}-section`}>
      <h2 className="seat-class-title">{className} Class</h2>
      {[...Array(numRows)].map((_, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {[...Array(columns)].map((_, columnIndex) => {
            const seatLabel = `R${startRow + rowIndex + 1}C${columnIndex + 1}`;
            const isSelected = passengerSeats[selectedPassenger] === seatLabel; // Check if it's the selected seat
            const isOccupied = occupiedSeats.includes((startRow + rowIndex) * columns + columnIndex);
            const isGlobalSelected = globalSelectedSeats[seatLabel];

            return (
              <Button
                key={columnIndex}
                className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''} ${isGlobalSelected ? 'global-selected' : ''}`}
                onClick={() => handleSeatClick(startRow + rowIndex, columnIndex)}
                disabled={isOccupied && !isSelected} // Disable button if occupied (but allow selection for the current passenger)
                style={{
                  backgroundColor: isOccupied ? '#ff4d4d' : (isGlobalSelected ? 'lightgreen' : ''), // Set color for occupied seats
                  color: isOccupied ? '#a9a9a9' : '', // Change text color for occupied seats
                }}
              >
                {seatLabel} {/* Seat Label */}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="seat-selection-layout">
      <h1 className="title">Select Your Seats</h1>

      {/* Passenger Selector */}
      <Select
        value={selectedPassenger}
        onChange={setSelectedPassenger}
        style={{ marginBottom: 20, width: 200 }}
      >
        {passengers.map((passenger, index) => (
          <Option key={index} value={passenger.passport}>
            {`${passenger.firstName} ${passenger.lastName}`}
          </Option>
        ))}
      </Select>

      <div className="seat-map">
        {renderSeats(0, economyRows, 'Economy')}
        {renderSeats(economyRows, businessRows, 'Business')}
        {renderSeats(economyRows + businessRows, platinumRows, 'Platinum')}
      </div>

      <Button type="primary" onClick={handleConfirmSelection} style={{ marginTop: 20 }}>
        Confirm Seat Selection
      </Button>
    </div>
  );
};

export default SeatSelectionComponent;
