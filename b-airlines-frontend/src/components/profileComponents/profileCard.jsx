import React from 'react';
import { Card, Avatar, Typography, Divider, Button, Progress } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProfileCard = ({ title, firstName, lastName, email, loyaltyPoints }) => {
  return (
    <Card
      bordered={false}
      style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      cover={
        <Avatar
          size={120}
          src="https://via.placeholder.com/120"
          style={{ margin: '24px auto' }}
        />
      }
      actions={[
        <Button type="link" icon={<UploadOutlined />}>Upload Picture</Button>,
        <Button type="link" icon={<EditOutlined />}>Edit Profile</Button>,
      ]}
    >
      <Title level={4}>{name}</Title>
      <Text type="secondary">{email}</Text>
      <Divider />
      <Text>Loyalty Points: {loyaltyPoints}</Text>
      <Progress percent={loyaltyPoints / 40} showInfo={false} />
      <Button type="primary" style={{ marginTop: '12px' }}>Redeem Points</Button>
    </Card>
  );
};

export default ProfileCard;
