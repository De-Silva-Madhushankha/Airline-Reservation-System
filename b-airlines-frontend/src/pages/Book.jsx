import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

function Book() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Booking successful!');
    // Here you can handle the form submission, e.g., send the data to the server
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form for errors.');
  };

  return (
    <div className="booking-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 className="text-center">Book a Flight</h2>
      <Form
        form={form}
        name="booking"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter your full name!' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Flight Number"
          name="flightNumber"
          rules={[{ required: true, message: 'Please enter your flight number!' }]}
        >
          <Input placeholder="Enter your flight number" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Seat"
          name="seat"
          rules={[{ required: true, message: 'Please select a seat!' }]}
        >
          <Select placeholder="Select a seat">
            <Option value="A1">A1</Option>
            <Option value="A2">A2</Option>
            <Option value="B1">B1</Option>
            <Option value="B2">B2</Option>
            {/* Add more seat options as needed */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Book Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Book;