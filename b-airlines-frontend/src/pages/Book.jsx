import React, { useState } from 'react';
import { Layout, Steps, Button, Form, Input } from 'antd';
import Header from '../components/Header';
import FlightSearch from '../components/FlightSearchComponent';


const { Content, Footer } = Layout;
const { Step } = Steps;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

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


  return (
    <Layout>

      <Header />
      <div style={{
        position: 'flex',
        top: '80px', /* Place it under the header (adjust based on header height) */
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 999, /* Ensure it stays above the content */
        padding: '10px 50px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', /* Optional shadow for better visual separation */
      }}>
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>
      
      <Content style={{ padding: '20px 50px', paddingTop: '100px' }}>
        
        <div style={{ marginTop: '40px' }}>
          {currentStep === 0 && (
            <FlightSearch />
            
          )}
          {currentStep === 1 && (
            <Form layout="vertical">
              <Form.Item label="Number of Passengers">
                <Input placeholder="1 Passenger" />
              </Form.Item>
            </Form>
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
