import React, { useState } from 'react';
import { Layout, Steps, Button } from 'antd';
import Header from '../components/Header';
import FlightSearch from '../components/FlightSearchComponent';
import FlightSchedule from '../components/FlightScheduleComponent';
import PassengerDetailsComponent from '../components/PassengerDetailsComponent';
import SeatSelectionComponent from '../components/SeatSelectionComponent';
import PaymentComponent from '../components/PaymentComponent';

const { Content, Footer } = Layout;
const { Step } = Steps;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [flightResults, setFlightResults] = useState([]); // Initialize as empty array
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', passport: '' }]); // Initialize passengers state here
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPassengerConfirmed, setIsPassengerConfirmed] = useState(false); // Track if passengers are confirmed

  const steps = [
    { title: 'Flights' },
    { title: 'Passengers' },
    { title: 'Options' },
    { title: 'Payment' },
    { title: 'Confirm' }
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSearchResults = (results) => {
    setFlightResults(results);
    setFlightResults(results);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    console.log(flight);
    nextStep();
  };

  const handlePassengers = (passengerDetails) => {
    setPassengers(passengerDetails);
    setIsPassengerConfirmed(true); // Mark passengers as confirmed
    nextStep();
  };

  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
    nextStep();
  };

  return (
    <Layout>
      <Header />
      <div style={{
        display: 'flex',
        top: '80px',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 999,
        padding: '10px 50px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>

      <Content style={{ padding: '20px 50px', paddingTop: '100px' }}>
        <div style={{ marginTop: '20px' }}>
          {currentStep === 0 && (
            <>
              <FlightSearch onSearch={handleSearchResults}/>
              {flightResults.length > 0 && (
                <FlightSchedule flights={flightResults} onFlightSelect={handleFlightSelect} />
              )}
            </>
          )}

          {currentStep === 1 && (
            <PassengerDetailsComponent 
              passengers={passengers} 
              setPassengers={setPassengers} // Pass the function to update passengers
              onNextStep={handlePassengers}
              isConfirmed={isPassengerConfirmed}  // Pass confirmation status to PassengerDetailsComponent
            />
          )}

          {currentStep === 2 && (
            <SeatSelectionComponent passengers={passengers} onSeatsSelected={handleSeatsSelected} />
          )}

          {currentStep === 3 && <PaymentComponent />}
        </div>

        <div style={{ marginTop: '20px' }}>
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
          {currentStep < steps.length - 1 && (flightResults.length > 0 || passengers.length > 0 || selectedSeats.length > 0) && (
            <Button type="primary" onClick={nextStep}>Next</Button>
          )}
          {currentStep === steps.length - 1 && <Button type="primary">Confirm Booking</Button>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>B Airways ©2024 Created by Madhushankha De Silva</Footer>
    </Layout>
  );
};

export default BookingPage;
