import React from 'react';
import { Card, Row, Col } from 'antd';
import { CheckOutlined, CoffeeOutlined, WifiOutlined, TeamOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './Options.css'; 

const benefits = [
  {
    title: 'Baggage allowance',
    description: '35kg',
    icon: <TeamOutlined style={{ fontSize: '40px', color: '#1890ff' }} />,
  },
  {
    title: 'Regular seat selection',
    description: '',
    icon: <CheckOutlined style={{ fontSize: '40px', color: '#52c41a' }} />,
  },
  {
    title: 'Inflight entertainment',
    description: '',
    icon: <VideoCameraOutlined style={{ fontSize: '40px', color: '#f5222d' }} />,
  },
  {
    title: 'Economy Class dining',
    description: '',
    icon: <CoffeeOutlined style={{ fontSize: '40px', color: '#fa8c16' }} />,
  },
  {
    title: 'Stay connected',
    description: '',
    icon: <WifiOutlined style={{ fontSize: '40px', color: '#722ed1' }} />,
  },
];

const OptionsSection = () => {
  return (
    <div className="options-section-container">
      <h2 className="options-title">Your benefits</h2>
      <p className="options-subtitle">
        Your included benefits depend on your selected class and fare and your membership tier.
      </p>
      <Row gutter={[24, 24]}>
        {benefits.map((benefit, index) => (
          <Col xs={24} sm={12} md={8} lg={8} key={index}>
            <Card
              hoverable
              bordered={false}
              className="benefit-card"
              bodyStyle={{ padding: '30px 20px' }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OptionsSection;
