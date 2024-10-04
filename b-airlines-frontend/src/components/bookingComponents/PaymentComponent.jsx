import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import './PaymentComponent.css';

const PaymentComponent = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    message.loading('Processing payment...', 0); // Display loading message

    // Simulating a payment process
    setTimeout(() => {
      setLoading(false);
      message.success('Payment processed successfully!', 2);
    }, 2000);
  };

  return (
    <div className="layout"> 
      <div className="container">
        <h1 className="title">Payment Details</h1>
        <p className="subtitle">Please enter your payment information below.</p>

        <Form layout="vertical" className="form">
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: 'Please enter your card number!' }]}
          >
            <Input placeholder="1234 5678 9123 4567" />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expirationDate"
            rules={[{ required: true, message: 'Please enter the expiration date!' }]}
          >
            <Input placeholder="MM/YY" />
          </Form.Item>

          <Form.Item
            label="CVV"
            name="cvv"
            rules={[{ required: true, message: 'Please enter the CVV!' }]}
          >
            <Input placeholder="123" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="submit-btn"
              loading={loading}
              onClick={handlePayment}
              block
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PaymentComponent;
