import React, { useState } from 'react';
import { Button, message } from 'antd';
import './SeatSelectionComponent.css'; // Ensure to style your seat selection as needed

const SeatSelectionComponent = ({ passengers, onSeatsSelected }) => {
  // Dummy values for rows and columns
  const rows = 10; // Example: 10 rows
  const columns = 4; // Example: 4 columns

  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState(Array(rows).fill(null).map(() => Array(columns).fill(false)));
  const [occupiedSeats, setOccupiedSeats] = useState([2, 5]); // Example: Seat indices that are occupied

  const handleSeatClick = (rowIndex, columnIndex) => {
    if (occupiedSeats.includes(rowIndex * columns + columnIndex)) {
      message.error('This seat is already taken!');
      return;
    }

    const updatedSeats = [...selectedSeats];
    updatedSeats[rowIndex][columnIndex] = !updatedSeats[rowIndex][columnIndex]; // Toggle seat selection
    setSelectedSeats(updatedSeats);
  };

  const handleConfirmSelection = () => {
    const selected = [];
    selectedSeats.forEach((row, rowIndex) => {
      row.forEach((isSelected, columnIndex) => {
        if (isSelected) {
          selected.push(`Row ${rowIndex + 1}, Column ${columnIndex + 1}`);
        }
      });
    });
    onSeatsSelected(selected); // Return selected seats
    message.success('Seats selected successfully!');
  };

  return (
    <div className="seat-selection-layout">
      <h1 className="title">Select Your Seats</h1>
      <div className="seat-map">
        {selectedSeats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((isSelected, columnIndex) => (
              <Button
                key={columnIndex}
                className={`seat ${isSelected ? 'selected' : ''} ${occupiedSeats.includes(rowIndex * columns + columnIndex) ? 'occupied' : ''}`}
                onClick={() => handleSeatClick(rowIndex, columnIndex)}
                disabled={occupiedSeats.includes(rowIndex * columns + columnIndex)} // Disable button if occupied
              >
                {`R${rowIndex + 1}C${columnIndex + 1}`} {/* Seat Label */}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <Button type="primary" onClick={handleConfirmSelection} style={{ marginTop: 20 }}>
        Confirm Seat Selection
      </Button>
    </div>
  );
};

export default SeatSelectionComponent;
