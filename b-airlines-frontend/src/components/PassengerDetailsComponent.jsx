import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import './PassengerDetailsComponent.css';

const PassengerDetailsComponent = ({ onNextStep }) => {
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', passport: '' }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePassengerChange = (field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[currentIndex][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleNext = () => {
    const { firstName, lastName, passport } = passengers[currentIndex];
    if (firstName === '' || lastName === '' || passport === '') {
      message.error('Please fill out all passenger details.');
      return;
    }

    if (currentIndex < passengers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // If at last passenger, handle the logic to finalize or go to the next step
      message.success('All passenger details saved!');
      onNextStep(); // Trigger next step when finished
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddPassenger = () => {
    const updatedPassengers = [...passengers, { firstName: '', lastName: '', passport: '' }];
    setPassengers(updatedPassengers);
    setCurrentIndex(updatedPassengers.length - 1); // Move to the new passenger
  };

  return (
    <div className="passenger-details-layout">
      <div className="passenger-details-background">
        <h1 className="title">Passenger Details</h1>
        <p className="subtitle">Please enter the details of passenger {currentIndex + 1}.</p>
        <Form layout="vertical" className="passenger-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input
                  placeholder="Enter first name"
                  value={passengers[currentIndex].firstName}
                  onChange={(e) => handlePassengerChange('firstName', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" required>
                <Input
                  placeholder="Enter last name"
                  value={passengers[currentIndex].lastName}
                  onChange={(e) => handlePassengerChange('lastName', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Passport Number" required>
            <Input
              placeholder="Enter passport number"
              value={passengers[currentIndex].passport}
              onChange={(e) => handlePassengerChange('passport', e.target.value)}
            />
          </Form.Item>
        </Form>

        {/* Button Container */}
        <div style={{ display: 'flex', justifyContent: currentIndex > 0 ? 'space-between' : 'center', marginTop: '20px' }}>
          {currentIndex > 0 && (
            <Button onClick={handlePrev} style={{ marginRight: 10 }}>
              Previous
            </Button>
          )}
          {currentIndex < passengers.length - 1 ? (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleAddPassenger}>
              Add Another Passenger
            </Button>
          )}
        </div>

        {/* Confirm Button */}
        <Button type="primary" onClick={handleNext} className="add-passenger-btn" style={{ marginTop: 20 }}>
          Confirm Details
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetailsComponent;
