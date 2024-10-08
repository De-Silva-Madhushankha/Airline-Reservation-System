import React, { useState } from 'react';
import { Button, Form, Input, Card, Row, Col, message } from 'antd';
import './PaymentComponent.css'; 

const PaymentComponent = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = async () => {
    setLoading(true);
    message.loading('Processing payment...', 0);

    // Simulate a payment process
    setTimeout(() => {
      setLoading(false);
      message.destroy();
      message.success('Payment processed successfully!', 2);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateCardNumber = (_, value) => {
    const regex = /^[0-9]{16}$/;
    if (value && !regex.test(value.replace(/\s+/g, ''))) {
      return Promise.reject(new Error('Card number must be 16 digits'));
    }
    return Promise.resolve();
  };

  const validateExpiry = (_, value) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (value && !regex.test(value)) {
      return Promise.reject(new Error('Expiry date must be in MM/YY format'));
    }
    return Promise.resolve();
  };

  const validateCVV = (_, value) => {
    const regex = /^[0-9]{3,4}$/;
    if (value && !regex.test(value)) {
      return Promise.reject(new Error('CVV must be 3 or 4 digits'));
    }
    return Promise.resolve();
  };

  return (
    <div className="payment-container">
      <Row gutter={[16, 16]} justify="center">
        {/* Payment Form */}
        <Col xs={24} md={12} lg={10}>
          <Card title="Payment Details" bordered={false} className="payment-card">
            <Form layout="vertical" onFinish={handlePayment}>
              <Form.Item
                label="Cardholder Name"
                name="cardName"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input
                  name="cardName"
                  placeholder="John Doe"
                  onChange={handleInputChange}
                  value={formData.cardName}
                />
              </Form.Item>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                  { required: true, message: 'Please enter your card number!' },
                  { validator: validateCardNumber }
                ]}
              >
                <Input
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  onChange={handleInputChange}
                  value={formData.cardNumber}
                />
              </Form.Item>
              <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[
                  { required: true, message: 'Please enter the expiry date!' },
                  { validator: validateExpiry }
                ]}
              >
                <Input
                  name="expiry"
                  placeholder="MM/YY"
                  onChange={handleInputChange}
                  value={formData.expiry}
                />
              </Form.Item>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[
                  { required: true, message: 'Please enter the CVV!' },
                  { validator: validateCVV }
                ]}
              >
                <Input
                  name="cvv"
                  placeholder="123"
                  onChange={handleInputChange}
                  value={formData.cvv}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Card Preview */}
        <Col xs={24} md={12} lg={8}>
          <Card bordered={false} className="card-preview">
            <div className="card-mockup">
              <div className="card-front">
                <div className="card-chip"></div>
                <div className="card-details">
                  <div className="card-number">
                    {formData.cardNumber || 'XXXX XXXX XXXX XXXX'}
                  </div>
                  <div className="card-info">
                    <span className="card-name">{formData.cardName || 'Cardholder Name'}</span>
                    <span className="card-expiry">
                      {formData.expiry || 'MM/YY'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentComponent;