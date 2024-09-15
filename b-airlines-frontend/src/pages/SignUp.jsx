import React, { useState } from 'react';
import { Form,Checkbox, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import axios from 'axios';
// import './Join.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-color: black;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: black;
    border-color: grey;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: black;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-checked .ant-checkbox-inner {
    background-color: black;
    border-color: grey;
  }
`;


const { Option } = Select;

const countryCodes = {
  "Sri Lanka": "+94",
  "Indonesia": "+62",
  "India": "+91",
  "Thailand": "+66",
  "Singapore": "+65"
};

const Join = () => {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

const onFinish = (values) => {
  console.log('Received values:', values);

  axios.post('http://localhost:3001/api/user/sign-up', {
    title: values.title,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
    country: values.country,
    mobileNumber: values.mobileNumber,
  })
  .then((response) => {
    if (response.data.success) {
      alert(response.data.message);
      navigate('/'); // Navigate to home page
    } else if(!response.data.success) {
      alert(response.data.message);
    }
  })
  .catch((error) => {
    if(error.response.status === 400) {
      alert('User already exists. Enter a different email address.');
      navigate('/sign-up');
      window.location.reload();
    }
    else{
      console.log(error);
    }

  });
};

const handleCountryChange = (value) => {
  setCountryCode(countryCodes[value]);
};

const validatePhoneNumber = (_, value) => {
  const phoneNumberPattern = /^[0-9]{7,14}$/; //7 to 14 digits only
  if (value && phoneNumberPattern.test(value)) {
    return Promise.resolve(); // Validation passed
  }
  return Promise.reject('Please enter a valid phone number (7-14 digits)');
};

  return (
    <div style={{ backgroundColor: '#bccbde', padding: '50px 0' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Join B Airways</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>Open up a world of rewards every time you travel. Enjoy reward flights and exclusive benefits.</p>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Select placeholder="Select title">
                  <Option value="Mr">Mr</Option>
                  <Option value="Ms">Ms</Option>
                  <Option value="Mrs">Mrs</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input placeholder="First name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter a password' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: 'Please select your date of birth' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="country" label="Region of Residence" rules={[{ required: true }]}>
                <Select placeholder="Select country" onChange={handleCountryChange}>
                  <Option value="Sri Lanka" >Sri Lanka</Option>
                  <Option value="Indonesia" >Indonesia</Option>
                  <Option value="India" >India</Option>
                  <Option value="Thailand" >Thailand</Option>
                  <Option value="Singapore" >Singapore</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true,  validator: validatePhoneNumber}]}>
                <Input addonBefore = {countryCode} placeholder="Mobile number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <CustomCheckbox>
              By clicking 'Create an account', you agree to our Terms & Conditions and Privacy Policy.
            </CustomCheckbox>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#1d1e22', borderColor: '#d4d4dc' }}>
              Create an account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Join;
