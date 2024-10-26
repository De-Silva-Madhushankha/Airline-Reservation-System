import React from 'react';
import { Layout, Form, Input, Select, Button } from 'antd';
import Header from '../components/Header';

const { Content, Footer } = Layout;
const { Option } = Select;

const PassengerForm = () => {
  const handleFormSubmit = (values) => {
    console.log('Form Data:', values);
  };

  return (
    <Layout>
      <Header />  
      <Content style={{ padding: '20px 50px', paddingTop: '100px' }}>
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <h2>Passenger 1 (Adult)</h2>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please select your title!' }]}>
            <Select placeholder="Title">
              <Option value="Mr">Mr</Option>
              <Option value="Ms">Ms</Option>
              <Option value="Mrs">Mrs</Option>
              <Option value="Dr">Dr</Option>
            </Select>
          </Form.Item>

          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name!' }]}>
            <Input placeholder="First name" />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name!' }]}>
            <Input placeholder="Last name" />
          </Form.Item>

          <h3>Your Frequent Flyer benefits</h3>
          <Form.Item label="Airline/Programme" name="airline" rules={[{ required: true, message: 'Please select an airline/programme!' }]}>
            <Select placeholder="Select Airline/Programme">
              <Option value="Emirates">Emirates</Option>
              <Option value="Qatar Airways">Qatar Airways</Option>
              <Option value="British Airways">British Airways</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Frequent Flyer Number" name="frequentFlyerNumber" rules={[{ required: true, message: 'Please enter your frequent flyer number!' }]}>
            <Input placeholder="Frequent flyer number" />
          </Form.Item>

          <Button type="primary" htmlType="submit">Save & Next</Button>
        </Form>
      </Content>
      <Footer style={{ textAlign: 'center' }}>B Airways ©2024 Created by Team 23</Footer>
    </Layout>
  );
};

export default PassengerForm;
