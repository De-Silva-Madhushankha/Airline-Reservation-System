import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/api/user/sign-in', {
        email: values.email,
        password: values.password,
      });

      const { success, token, message } = response.data;

      if (success) {
        // Store token based on "Keep me logged in" option
        if (values.remember) {
          localStorage.setItem('token', token);  // Store in localStorage for persistence
        } else {
          sessionStorage.setItem('token', token); // Store in sessionStorage for single session
        }

        navigate('/');
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
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#bccbde', 
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
        <h2 style={{ textAlign: 'center' }}>Log in to Your Account</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>Enjoy exclusive rewards and benefits.</p>
        
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Keep me logged in</Checkbox>
            </Form.Item>
            <a href="/forgot-password" style={{ float: 'right' }}>Forgot password?</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Not a member yet? <a href="/sign-up">Join now</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
