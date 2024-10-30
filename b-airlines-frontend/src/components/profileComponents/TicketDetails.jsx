import React from 'react';
import './TicketDetails.css'; // Import the CSS file for custom styles

const TicketDetails = () => {
  const ticketData = {
    booking_id: '3e6cf004-9...',
    booking_date: '10/30/2024',
    total_amount: 4182.00,
    payment_status: 'Paid',
    passenger_name: 'virat shammi',
    passport_id: '1298712429...',
    flight_id: 'e531742c-9...',
    seat: 'Row 8, Column 1',
    seat_class: 'Economy',
    departure: 'CGK - 11/2/2024, 10:00:00 AM',
    arrival: 'BIA - 11/2/2024, 1:00:00 PM'
  };

  const TicketRow = ({ label, value }) => (
    <div className="ticket-row">
      <div className="ticket-label">{label}</div>
      <div className="ticket-value">{value}</div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">B Airways E-Ticket</h2>
      </div>
      <div className="card-content">
        <TicketRow label="Booking ID" value={ticketData.booking_id} />
        <TicketRow label="Booking Date" value={ticketData.booking_date} />
        <TicketRow 
          label="Total Amount" 
          value={`$${ticketData.total_amount.toFixed(2)}`} 
        />
        <TicketRow 
          label="Payment Status" 
          value={
            <span className="status-paid">
              {ticketData.payment_status}
            </span>
          } 
        />
        <TicketRow label="Passenger Name" value={ticketData.passenger_name} />
        <TicketRow label="Passport ID" value={ticketData.passport_id} />
        <TicketRow label="Flight ID" value={ticketData.flight_id} />
        <TicketRow label="Seat" value={ticketData.seat} />
        <TicketRow 
          label="Seat Class" 
          value={
            <span className="seat-class">
              {ticketData.seat_class}
            </span>
          } 
        />
        <TicketRow label="Departure" value={ticketData.departure} />
        <TicketRow label="Arrival" value={ticketData.arrival} />
      </div>
    </div>
  );
};

export default TicketDetails;
