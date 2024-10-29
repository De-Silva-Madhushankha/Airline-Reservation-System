import React from 'react';
import { Descriptions } from 'antd';
import './TicketDetails.css';

const TicketDetails = ({ flight }) => {
  // Helper function to truncate long IDs
  const truncateID = (id) => (id.length > 10 ? `${id.slice(0, 10)}...` : id);

  return (
    <div className="ticket-details">
      <h2 className="ticket-title">B Airways E-Ticket</h2>
      <Descriptions bordered column={2} className="ticket-descriptions">
        <Descriptions.Item label="Booking ID">{truncateID(flight.booking_id)}</Descriptions.Item>
        <Descriptions.Item label="Booking Date">{new Date(flight.booking_date).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Total Amount">${flight.total_amount.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="Payment Status">{flight.payment_status}</Descriptions.Item>
        
        <Descriptions.Item label="Passenger Name">
          {`${flight.passenger_first_name} ${flight.passenger_last_name}`}
        </Descriptions.Item>
        <Descriptions.Item label="Passport ID">{truncateID(flight.passport_id)}</Descriptions.Item>
        
        <Descriptions.Item label="Flight ID">{truncateID(flight.flight_id)}</Descriptions.Item>
        <Descriptions.Item label="Seat">{`Row ${flight.seat_row}, Column ${flight.seat_column}`}</Descriptions.Item>
        <Descriptions.Item label="Seat Class">{flight.seat_class_name}</Descriptions.Item>
        
        <Descriptions.Item label="Departure">
          {`${flight.origin_code} - ${new Date(flight.departure).toLocaleString()}`}
        </Descriptions.Item>
        <Descriptions.Item label="Arrival">
          {`${flight.destination_code} - ${new Date(flight.arrival).toLocaleString()}`}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default TicketDetails;
