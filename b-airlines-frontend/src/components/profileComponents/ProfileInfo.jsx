import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

const { Text } = Typography;

const ProfileInfo = ({ userInfo }) => {
  return (
    <Card
      title="Profile Information"
      bordered={false}
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <Row gutter={16}>
        {userInfo.map((info, index) => (
          <Col xs={24} sm={12} key={index}>
            <div className="info-item">
              <Text strong>{info.label}: </Text>
              <Text>{info.value}</Text>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ProfileInfo;
