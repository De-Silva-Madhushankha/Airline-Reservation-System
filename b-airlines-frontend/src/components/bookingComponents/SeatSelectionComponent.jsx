import React, { useState, useEffect } from 'react';
import { Button, message, Select } from 'antd';
import './SeatSelectionComponent.css';
import axios from '../../axiosConfig.js';

const { Option } = Select;

const SeatSelectionComponent = ({ passengers, aircraft_id, flight_id, onSeatsSelected, passengerSeats, globalSelectedSeats, setGlobalSelectedSeats, setPassengerSeats }) => { // Accept global states and functions as props
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const [columns, setColumns] = useState(0);
  const [model, setModel] = useState(null);
  const [economyRows, setEconomyRows] = useState(0);
  const [businessRows, setBusinessRows] = useState(0);
  const [platinumRows, setPlatinumRows] = useState(0);
  const [selectedPassenger, setSelectedPassenger] = useState(passengers[0]?.passport);

  useEffect(() => {
    const fetchOccupiedSeats = async () => {
      try {
        if (!flight_id) return;
  
        console.log('Fetching occupied seats for flight_id:', flight_id);
        const response = await axios.get(`/seat/occupied/${flight_id}`);

        const seatTuples = response.data.occupiedSeats.map(seat => [seat.row, seat.column]);
        const lockedSeatTuples = response.data.lockedSeats.map(seat => [seat.row, seat.column]);
        

        setOccupiedSeats(seatTuples);
        setLockedSeats(lockedSeatTuples);

      } catch (error) {
        message.error('Failed to fetch occupied seats');
        console.error(error);
      }
    };
    
    fetchOccupiedSeats();
  }, [flight_id]);
  
  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log('Fetching model for aircraft_id:', aircraft_id);
        const response = await axios.get(`/aircraft/models/${aircraft_id}`);
        console.log('Aircraft Response:', response.data);
        setModel(response.data.model);
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
      if (!model) return; 

      try {
        const response = await axios.get(`/model/${model}`); // Fetch model
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

  const handleSeatClick = (rowIndex, columnIndex, className) => {
    const seatPair = { row: rowIndex + 1, column: columnIndex + 1, className};

    // Check if the seat is already selected globally
    const seatLabel = `R${seatPair.row}C${seatPair.column}`;
    if (globalSelectedSeats[seatLabel] && globalSelectedSeats[seatLabel] !== selectedPassenger) {
      message.error('This seat has already been selected for another passenger!');
      return;
    }

    const currentPassengerSeat = passengerSeats[selectedPassenger];

    // If the seat is currently selected by the passenger, deselect it
    if (currentPassengerSeat && currentPassengerSeat.row === seatPair.row && currentPassengerSeat.column === seatPair.column) {
      const updatedGlobalSelectedSeats = { ...globalSelectedSeats };  // duplicate globalseats
      delete updatedGlobalSelectedSeats[seatLabel];
      setPassengerSeats({
        ...passengerSeats,
        [selectedPassenger]: null,
      });
      setGlobalSelectedSeats(updatedGlobalSelectedSeats);
      return;
    }

    // If not selected, select the new seat and deselect the previous seat if any
    const updatedGlobalSelectedSeats = { ...globalSelectedSeats };

    if (currentPassengerSeat) {
      const previousSeatLabel = `R${currentPassengerSeat.row}C${currentPassengerSeat.column}`;
      delete updatedGlobalSelectedSeats[previousSeatLabel];
    }

    updatedGlobalSelectedSeats[seatLabel] = selectedPassenger;
    setPassengerSeats({
      ...passengerSeats,
      [selectedPassenger]: seatPair,
    });
    setGlobalSelectedSeats(updatedGlobalSelectedSeats);
  };

  const handleConfirmSelection = async () => {
    if (Object.keys(passengerSeats).length < passengers.length) {
      message.error('Please assign seats to all passengers.');
      return;
    }

    const seatData = {
      flight_id: flight_id,
      passengerSeats,
    };
    console.log('passengers seats', passengerSeats)
    try {
        const response = await axios.post('/seat/lock', seatData);
        onSeatsSelected(passengerSeats);
        message.success('Seats selected successfully!');
    } catch (error) {
        console.error('Failed to lock seats:', error.message);
        message.error(error.response.data.error);
    }
  };

  // Render seat rows based on class
  const renderSeats = (startRow, numRows, className) => (
    <div className={`${className}-section`}>
      <h2 className="seat-class-title">{className} Class</h2>
      {[...Array(numRows)].map((_, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {[...Array(columns)].map((_, columnIndex) => {
            const seatPair = { row: startRow + rowIndex + 1, column: columnIndex + 1, className: className };
            const seatLabel = `R${seatPair.row}C${seatPair.column}`;
            // isSelected - selected by current passenger
            // is global selected - selected by any passenger
            const isSelected = passengerSeats[selectedPassenger]?.row === seatPair.row && passengerSeats[selectedPassenger]?.column === seatPair.column;
            const isOccupied = occupiedSeats.some(seat => seat[0] === seatPair.row && seat[1] === seatPair.column);
            const isLocked = lockedSeats.some(seat => seat[0] === seatPair.row && seat[1] === seatPair.column);
            const isGlobalSelected = globalSelectedSeats[seatLabel];

            return (
              <Button
                key={columnIndex}
                className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''} ${isLocked ? 'locked' : ''} ${isGlobalSelected ? 'global-selected' : ''}`}
                onClick={() => handleSeatClick(startRow + rowIndex, columnIndex, className)}
                disabled={(isOccupied || isLocked) && !isSelected} // Disable button if occupied (but allow selection for the current passenger)
                style={{
                  backgroundColor: isOccupied ? '#ff4d4d' : isLocked ? 'gray':  (isGlobalSelected ? 'lightgreen' : ''), // Set color for occupied seats
                  color: isOccupied || isLocked ? '#a9a9a9' : '', // Change text color for occupied seats
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
