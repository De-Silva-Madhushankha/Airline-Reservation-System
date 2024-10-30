import React, { useEffect, useState } from 'react';
import { List, Button, message, Typography, Row, Col, Card, Tag } from 'antd';
import axios from '../../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import './BookingConfirmationComponent.css';

const { Title, Text } = Typography;

const BookingConfirmationComponent = ({ passengers, passengerSeats, selectedFlight, setPassengerCosts }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [passengerCosts, setLocalPassengerCosts] = useState({});
  const [discount, setDiscount] = useState(0); // Initialize discount as a single value
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassengerCosts = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          message.error('User is not authenticated');
          return;
        }

        const passengerSeatsData = passengers.map(passenger => ({
          passport: passenger.passport,
          seat: passengerSeats[passenger.passport],
        }));

        const response = await axios.post('/booking/cost', {
          flight_id: selectedFlight.flight_id,
          passengerSeats: passengerSeatsData,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { costs, totalCost, discount } = response.data;

        setLocalPassengerCosts(costs);
        setPassengerCosts(costs);
        setTotalCost(totalCost);
        setDiscount(discount); // Set the overall discount
      } catch (error) {
        message.error('Failed to retrieve booking costs');
        console.error(error);
      }
    };

    fetchPassengerCosts();
  }, [passengers, passengerSeats, selectedFlight, setPassengerCosts]);

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        message.error('User is not authenticated');
        return;
      }

      const bookingData = {
        flight_id: selectedFlight.flight_id,
        passengers: passengers.map(passenger => ({
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          age: passenger.age,
          phoneNumber: passenger.phoneNumber,
          passport: passenger.passport,
          email: passenger.email,
          seatRow: passengerSeats[passenger.passport].row,
          seatColumn: passengerSeats[passenger.passport].column,
        })),
      };

      const response = await axios.post('/booking/create', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        message.success('Booking confirmed successfully!', 1);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        message.error('Failed to confirm booking. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred while confirming the booking.');
      console.error(error);
    }
  };

  const discountedTotal = totalCost - (totalCost * discount / 100); // Apply discount to the total cost

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
                    <Text className="flight-route-text">{`${selectedFlight.origin_code} to ${selectedFlight.destination_code}`}</Text><br/>
                    <Text className="seat-text">{`Seat R${seat.row}C${seat.column}`}</Text>
                    <Tag color="blue" className="seat-class-tag">{seat.className}</Tag>
                  </Col>

                  {/* Departure and Arrival Times */}
                  <Col xs={24} sm={16}>
                    <Text className="flight-text">{`Departs: ${selectedFlight.dep_time} >> Arrives: ${selectedFlight.arr_time}`}</Text><br/>
                  </Col>

                  {/* Passenger Cost */}
                  <Col xs={24} sm={8} className="cost-column" style={{ textAlign: 'right' }}>
                    <Text className="cost-text">Cost: ${cost}</Text><br/>
                  </Col>
                </Row>
              </Card>
            );
          }}
        />

        <Card className="subtotal-card">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} style={{ textAlign: 'left' }}>
              <Title level={4}>Flight Subtotal</Title>
            </Col>
            <Col xs={24} sm={12} className="cost-column" style={{ textAlign: 'right' }}>
              <Title level={4}>{`Subtotal: $${totalCost.toFixed(2)}`}</Title>
              <Title level={4} className="discount-text">{`Discount: ${discount}%`}</Title>
              <Title level={4}>{`Total after discount: $${discountedTotal.toFixed(2)}`}</Title>
            </Col>
          </Row>
        </Card>

        <div className="button-container">
          <Button type="primary" size="large" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmationComponent;