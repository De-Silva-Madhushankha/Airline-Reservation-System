import React from 'react';
import { Card, Row, Col } from 'antd';
import './TicketDetails.css';

const TicketDetails = ({ flight }) => {
  return (
    <Card className="ticket-card">
      <Row className="ticket-header">
        <Col span={12}>
          <h2>Flight Ticket</h2>
        </Col>
        <Col span={12} className="text-right">
          <h2>{flight.flight_id.substring(0, 8)}...</h2>
        </Col>
      </Row>
      <Row className="ticket-body">
        <Col span={12}>
          <p><strong>Booking ID:</strong> {flight.booking_id.substring(0, 8)}...</p>
          <p><strong>Seat ID:</strong> {flight.seat_id.substring(0, 8)}...</p>
          <p><strong>Booking Date:</strong> {new Date(flight.booking_date).toLocaleDateString()}</p>
        </Col>
        <Col span={12}>
          <p><strong>Total Amount:</strong> ${flight.total_amount.toFixed(2)}</p>
          <p><strong>Payment Status:</strong> {flight.payment_status}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default TicketDetails;