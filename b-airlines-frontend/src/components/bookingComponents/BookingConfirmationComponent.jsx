import React, { useEffect, useState } from 'react';
import { List, Button, message, Typography, Row, Col, Card, Tag } from 'antd';
import axios from 'axios';
import './BookingConfirmationComponent.css';

const { Title, Text } = Typography;

const BookingConfirmationComponent = ({ passengers, passengerSeats, selectedFlight, setPassengerCosts }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [passengerCosts, setLocalPassengerCosts] = useState({});

  useEffect(() => {
    const fetchPassengerCosts = async () => {
      try {
        let total = 0;
        const costs = {};

        // Fetch the cost for each passenger's seat
        for (const passenger of passengers) {
          const seat = passengerSeats[passenger.passport];
          const response = await axios.post('http://localhost:3001/api/booking/cost', {
            flight_id: selectedFlight.flight_id,
            seat,
          });

          const cost = response.data.totalCost;
          costs[passenger.passport] = cost;
          total += cost;
        }

        setLocalPassengerCosts(costs);  // Store costs locally for display
        setPassengerCosts(costs); // Update the parent component with passenger costs
        setTotalCost(total); // Update the total cost
      } catch (error) {
        message.error('Failed to retrieve booking costs');
        console.error(error);
      }
    };

    fetchPassengerCosts();
  }, [passengers, passengerSeats, selectedFlight, setPassengerCosts]);

  return (
    <div className="booking-confirmation-layout">
      <Card className="confirmation-card">
        <Title level={2} className="booking-title">Booking Confirmation</Title>

        {/* List of Passengers */}
        <List
          itemLayout="vertical"
          dataSource={passengers}
          renderItem={(passenger) => {
            const seat = passengerSeats[passenger.passport];
            const cost = passengerCosts[passenger.passport] || 'Fetching...';

            return (
              <Card className="passenger-card" key={passenger.passport}>
                <Row className="passenger-info" gutter={[16, 16]}>
                  
                  {/* Column 1: Name, Origin-Destination, Seat Class */}
                  <Col xs={24} sm={16}>
                    <Text strong className="passenger-name">{`${passenger.firstName} ${passenger.lastName}`}</Text><br/>
                    <Text className="flight-route-text">{`${selectedFlight.origin} to ${selectedFlight.destination}`}</Text><br/>
                    <Text className="seat-text">{`Seat: Row ${seat.row}, Column ${seat.column}`}</Text>
                    <Tag color="blue" className="seat-class-tag">{seat.class}</Tag>
                  </Col>

                  {/* Departure and Arrival Times */}
                  <Col xs={24} sm={16}>
                    <Text className="flight-text">{`Departs: ${selectedFlight.departureTime} >> Arrives: ${selectedFlight.arrivalTime}`}</Text><br/>
                  </Col>

                  {/* Passenger Cost */}
                  <Col xs={24} sm={8} className="cost-column" style={{ textAlign: 'right' }}>
                    <Text className="cost-text">Cost: ${cost}</Text>
                  </Col>
                </Row>
              </Card>
            );
          }}
        />

        {/* Total Cost Section in a Separate AntD Component */}
        <Card className="subtotal-card">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} style={{ textAlign: 'left' }}>
              <Title level={4}>Flight Subtotal</Title>
            </Col>
            <Col xs={24} sm={12} className="cost-column" style={{ textAlign: 'right' }}>
              <Title level={4}>${totalCost}</Title>
            </Col>
          </Row>
        </Card>


        <div className="button-container">
          <Button type="primary" size="large">
            Confirm Booking
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmationComponent;
