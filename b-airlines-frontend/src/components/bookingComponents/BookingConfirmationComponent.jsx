// src/components/bookingComponents/BookingConfirmationComponent.js
import React from 'react';

const BookingConfirmationComponent = ({ selectedFlight, passengers, selectedSeats }) => {
  return (
    <div>
      <h2>Booking Confirmation</h2>
      <h3>Flight Details</h3>
      <p>Flight ID: {selectedFlight?.flight_id}</p>
      <p>Aircraft ID: {selectedFlight?.aircraft_id}</p>
      <p>Departure: {selectedFlight?.departure}</p>
      <p>Arrival: {selectedFlight?.arrival}</p>
      
      <h3>Passenger Details</h3>
      {passengers.map((passenger, index) => (
        <div key={index}>
          <p>
            {index + 1}. {passenger.firstName} {passenger.lastName} (Passport: {passenger.passport})
          </p>
        </div>
      ))}

      <h3>Selected Seats</h3>
      {Object.keys(selectedSeats).length > 0 ? (
        Object.entries(selectedSeats).map(([seat, passengerIndex]) => (
          <p key={seat}>
            Seat: {seat}, Passenger: {passengers[passengerIndex]?.firstName} {passengers[passengerIndex]?.lastName}
          </p>
        ))
      ) : (
        <p>No seats selected.</p>
      )}
      
      <p>Thank you for booking with B Airways!</p>
    </div>
  );
};

export default BookingConfirmationComponent;
