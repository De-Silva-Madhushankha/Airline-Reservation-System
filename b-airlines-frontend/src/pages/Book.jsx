import React, { useState } from 'react';
import { Layout, Steps, Button, Form, Input } from 'antd';
import Header from '../components/Header';
import FlightSearch from '../components/FlightSearchComponent';
import FlightSchedule from '../components/FlightScheduleComponent';
import Passenger from '../components/passengerComponent';
import Options from '../components/Options';


const { Content, Footer } = Layout;
const { Step } = Steps;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [flightResults, setFlightResults] = useState(null); 

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

  return (
    <Layout>
      <Header />
      <div style={{
        position: 'flex',
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

          
              {flightResults && (
                <FlightSchedule flights={flightResults} />
              )}
            </>
          )}

          {currentStep === 1 && (
            <Passenger></Passenger>
          )}

          {currentStep === 2 && (
            <Options></Options>
          )}
          {/* Add similar forms for Options, Payment, and Confirmation */}
        </div>

        <div style={{ marginTop: '20px' }}>
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
          {currentStep < steps.length - 1 && <Button type="primary" onClick={nextStep}>Next</Button>}
          {currentStep === steps.length - 1 && <Button type="primary">Confirm Booking</Button>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>B Airways ©2024 Created by Madhushankha De Silva</Footer>
    </Layout>
  );
};

export default BookingPage;
