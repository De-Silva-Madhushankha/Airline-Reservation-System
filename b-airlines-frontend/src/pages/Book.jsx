import React, { useState } from 'react';
import { Layout, Steps, Button } from 'antd';
import Header from '../components/Header';
import FlightSearch from '../components/FlightSearchComponent';
import FlightSchedule from '../components/FlightScheduleComponent';
import Passenger from '../components/passengerComponent';
import Options from '../components/Options';

import PassengerDetailsComponent from '../components/bookingComponents/PassengerDetailsComponent';
import SeatSelectionComponent from '../components/bookingComponents/SeatSelectionComponent';
import PaymentComponent from '../components/bookingComponents/PaymentComponent';
import BookingConfirmationComponent from '../components/bookingComponents/BookingConfirmationComponent';

const { Content, Footer } = Layout;
const { Step } = Steps;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [flightResults, setFlightResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', passport: '' }]); // Initialize passengers state here
  const [selectedSeats, setSelectedSeats] = useState({});
  const [isPassengerConfirmed, setIsPassengerConfirmed] = useState(false);
  const [globalSelectedSeats, setGlobalSelectedSeats] = useState({});
  const [passengerSeats, setPassengerSeats] = useState({});
  const [passengerCosts, setPassengerCosts] = useState({});

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
  };

  const handleFlightSelect = (flight) => {
    if (selectedFlight?.id !== flight.id) {
      // console.log(selectedFlight.id, flight.id);
      setGlobalSelectedSeats({});
      setPassengerSeats({});
      setPassengerCosts({});
    }
    setSelectedFlight(flight);
    nextStep();
  };

  const handlePassengers = (passengerDetails) => {
    setPassengers(passengerDetails);
    setIsPassengerConfirmed(true);
    nextStep();
  };

  const handleSeatsSelected = (seats) => {
    setPassengerSeats(seats);
    nextStep();
  };

  const handleConfirmBooking = () => {
    message.success('Booking confirmed successfully!');
    setCurrentStep(currentStep + 1);
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
              <FlightSearch onSearch={handleSearchResults} />
              {flightResults.length > 0 && (
                <FlightSchedule flights={flightResults} onFlightSelect={handleFlightSelect} />
              )}
            </>
          )}

          {currentStep === 1 && (
            <PassengerDetailsComponent
              passengers={passengers}
              setPassengers={setPassengers}
              onNextStep={handlePassengers}
              isConfirmed={isPassengerConfirmed}
              prevPage={prevStep}
            />
          )}

          {currentStep === 2 && (
            <SeatSelectionComponent
              passengers={passengers}
              onSeatsSelected={handleSeatsSelected}
              aircraft_id={selectedFlight?.aircraft_id}
              flight_id={selectedFlight?.flight_id}
              passengerSeats={passengerSeats}
              globalSelectedSeats={globalSelectedSeats}
              setGlobalSelectedSeats={setGlobalSelectedSeats}
              setPassengerSeats={setPassengerSeats}
              prevPage={prevStep}
            />
          )}

          {currentStep === 3 && <PaymentComponent
            nextPage={nextStep
            } />}

          {currentStep === 4 && (
            <BookingConfirmationComponent
              selectedFlight={selectedFlight}
              passengers={passengers}
              passengerSeats={passengerSeats}
              setPassengerCosts={setPassengerCosts}
            />
          )}
        </div>


        {/* <div style={{ marginTop: '20px' }}>
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
          {0 < currentStep && currentStep < steps.length - 1 && (
            <Button type="primary" onClick={nextStep} disabled={currentStep === 1 && !isPassengerConfirmed}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          )}
        </div> */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>B Airways ©2024 Created by Madhushankha De Silva</Footer>
    </Layout>
  );
};

export default BookingPage;
