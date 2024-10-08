import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Row, Col, List } from 'antd';
import './PassengerDetailsComponent.css';

const PassengerDetailsComponent = ({ passengers, setPassengers, onNextStep, isConfirmed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState(isConfirmed);

  useEffect(() => {
    setViewMode(isConfirmed);
  }, [isConfirmed]);

  const validatePassport = (passport) => /^[a-zA-Z0-9]{6,9}$/.test(passport);

  const handlePassengerChange = (field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[currentIndex][field] = value;
    setPassengers(updatedPassengers);
  };

  const validatePhoneNumber = (_, value) => {
    const phoneNumberPattern = /^[0-9]{7,14}$/; //7 to 14 digits only
    if (value && phoneNumberPattern.test(value)) {
      return Promise.resolve(); // Validation passed
    }
    return Promise.reject('Please enter a valid phone number (7-14 digits)');
  };

  const handleNext = () => {
    const { firstName, lastName, age, phoneNumber, passport, email } = passengers[currentIndex];

    if (firstName === '' || lastName === '' || passport === ''|| age === ''|| phoneNumber === '' || email === '') {
      message.error('Please fill out all fields.');
      return;
    }

    // if (!validatePassport(passport)) {
    //   message.error('Please enter a valid passport number (6-9 alphanumeric characters).');
    //   return;
    // }

    if (currentIndex < passengers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      message.success('All passenger details saved!');
      setViewMode(true);
      onNextStep(passengers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddPassenger = () => {
    const updatedPassengers = [...passengers, { firstName: '', lastName: '', age: '', phoneNumber: '', passport: '' , email: ''}];
    setPassengers(updatedPassengers);
    setCurrentIndex(updatedPassengers.length - 1);
    setViewMode(false);
  };

  const handleEditPassenger = (index) => {
    setCurrentIndex(index);
    setViewMode(false);
  };

  // Render view mode if passenger details have been confirmed
  if (viewMode) {
    return (
      <div className="passenger-details-layout">
        <div className="passenger-details-background">
          <h1 className="title">Confirmed Passengers</h1>
          <List
            itemLayout="horizontal"
            dataSource={passengers}
            renderItem={(passenger, index) => (
              <List.Item actions={[<Button onClick={() => handleEditPassenger(index)}>Edit</Button>]}>
                <List.Item.Meta
                  title={`Passenger ${index + 1}`}
                  description={`Name: ${passenger.firstName} ${passenger.lastName}, Age: ${passenger.age}, PhoneNumber: ${passenger.phoneNumber} , Passport: ${passenger.passport}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }

  // Render form mode if passengers are not confirmed yet or in edit mode
  return (
    <div className="passenger-details-layout">
      <div className="passenger-details-background">
        <h1 className="title">Passenger Details</h1>
        <p className="subtitle">Please enter or edit the details of passenger {currentIndex + 1}.</p>
        <Form layout="vertical" className="passenger-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input
                  placeholder="Enter first name"
                  value={passengers[currentIndex]?.firstName} // Use optional chaining
                  onChange={(e) => handlePassengerChange('firstName', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" required>
                <Input
                  placeholder="Enter last name"
                  value={passengers[currentIndex]?.lastName} // Use optional chaining
                  onChange={(e) => handlePassengerChange('lastName', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Age" required>
                <Input
                  placeholder="Enter age"
                  value={passengers[currentIndex]?.age} // Use optional chaining
                  onChange={(e) => handlePassengerChange('age', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number"  required>
                <Input
                  placeholder="Enter phone number"
                  value={passengers[currentIndex]?.phoneNumber} // Use optional chaining
                  onChange={(e) => handlePassengerChange('phoneNumber', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>


          <Form.Item label="Passport Number" required>
            <Input
              placeholder="Enter passport number"
              value={passengers[currentIndex]?.passport} // Use optional chaining
              onChange={(e) => handlePassengerChange('passport', e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              placeholder="Enter your email"
              value={passengers[currentIndex]?.email} // Use optional chaining
              onChange={(e) => handlePassengerChange('email', e.target.value)}
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
        <br />
        <Button type="primary" onClick={handleNext} className="add-passenger-btn" style={{ marginTop: 20 }}>
          Confirm Details
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetailsComponent;
