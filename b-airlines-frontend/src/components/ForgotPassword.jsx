import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './ForgotPassword.css'; // For responsive styles (we'll add this below)

const { Content } = Layout;
const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('/api/send-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });
      
      if (response.ok) {
        message.success('A password reset link has been sent to your email.');
      } else {
        throw new Error('Failed to send reset link.');
      }
    } catch (error) {
      message.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content className="forgot-password-content">
        <div className="form-container">
          <Title level={3}>Forgot Your Password?</Title>
          <Text>Enter your email address, and we’ll send you a link to reset your password.</Text>
          
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: '20px', width: '100%' }}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
                {
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default ForgotPasswordPage;
