import React from 'react';
import { Form, Input, Checkbox, Button, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Row justify="center">
        <Col xs={24} sm={12} md={8} style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2}>Log in to Emirates</Title>
          <Text type="secondary">
            Earn Miles every time you fly with us and our partners. And spend your Skywards Miles on a world of rewards.
          </Text>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: '24px' }}
          >
            <Form.Item
              name="email"
              label="Email or Emirates Skywards number"
              rules={[{ required: true, message: 'Please enter your email or Skywards number!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Checkbox>Keep me logged in on this device</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>

            <Form.Item>
              <Text>
                <a href="#">Forgot your email or account number?</a>
              </Text>
            </Form.Item>
            <Form.Item>
              <Text>
                <a href="#">Forgot/Create password?</a>
              </Text>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={0} sm={12} md={8} style={{ padding: '30px', textAlign: 'center' }}>
          <Title level={4}>Not an Emirates Skywards member yet?</Title>
          <Text>
            Register now to make the most of every mile with <a href="#">Emirates Skywards</a>.
          </Text>
          <Button type="default" style={{ marginTop: '16px' }}>
            Join now
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;