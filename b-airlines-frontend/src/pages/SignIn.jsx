import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/api/user/sign-in', {
        username: values.username,
        password: values.password,
      });

      const { success, token, message } = response.data;

      if (success) {
        localStorage.setItem('token', token);
        navigate('/home'); // Updated navigation
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
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div style={{ textAlign: 'center' }}>
          <h2>Log in to Your Account</h2>
        </div>
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="username"
            label="Email or Account Number"
            rules={[{ required: true, message: 'Please enter your username or account number!' }]}
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
          Not a member yet? <a href="/signup">Join now</a>
        </div>
      </Col>
    </Row>
  );
};

export default SignIn;
