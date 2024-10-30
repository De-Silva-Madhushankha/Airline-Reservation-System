import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert, Row, Col } from 'antd';
import axios from '../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';



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

const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('/admin/sign-in', {
        email: values.email,
        password: values.password,
      });

      const { success, token, message } = response.data;

      if (success) {
        if (values.remember) {
          localStorage.setItem('token', token);  
        } else {
          sessionStorage.setItem('token', token);
        }

        navigate('/Adminhome');
      } else {
        setErrorMessage(message || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred during login.');
      } else {
        setErrorMessage('Server not reachable. Please try again later.');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <div style={{ 
      height: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
      }}>
      <h1 style={{ textAlign: 'center' }}>
        <strong>Log in to Admin Account</strong>
      </h1>
              
        {errorMessage && (
          <Row justify="center">
            <Col span={24}>
              <Alert message={errorMessage} type="error" showIcon />
            </Col>
          </Row>
        )}

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="email"
            label="Email or Account Number"
            rules={[{ required: true, message: 'Please enter your email or account number!' }]}
          >
            <Input placeholder="Enter email or account number" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} style={{ backgroundColor: '#1d1e22', borderColor: '#d4d4dc' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        
      </div>
    </div>
    </div>
    
  );
};

export default SignIn;
