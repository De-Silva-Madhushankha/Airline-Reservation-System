import React, { useState } from 'react';
import { Card, Avatar, Typography, Divider, Button, Progress, Input, Form, Spin, Alert } from 'antd';
import { EditOutlined, UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ProfileCard.css';


const { Title, Text } = Typography;

const ProfileCard = ({ title, firstName, lastName, email, loyaltyPoints, country, mobileNumber, birthDay }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    title,
    firstName,
    lastName,
    email,
    loyaltyPoints,
    country,
    mobileNumber,
    birthDay
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const saveProfileData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.put('http://localhost:3001/api/user/update', profileData, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });

      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Error Updating profile');
      } finally {
        setLoading(false);
      }
    };
    saveProfileData();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setProfileData({ title, firstName, lastName, email, loyaltyPoints, country, mobileNumber, birthDay });
    setIsEditing(false);
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

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
        isEditing ? (
          <>
            <Button type="link" icon={<SaveOutlined />} onClick={handleSaveClick}>Save</Button>
            <Button type="link" icon={<CloseOutlined />} onClick={handleCancelClick}>Cancel</Button>
          </>
        ) : (
          <Button type="link" icon={<EditOutlined />} onClick={handleEditClick}>Edit Profile</Button>
        ),
      ]}
    >
      {isEditing ? (
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Country">
            <Input
              name="country"
              value={profileData.country}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Mobile Number">
            <Input
              name="mobileNumber"
              value={profileData.mobileNumber}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      ) : (
        <>
          <Title level={4}>{profileData.title} {profileData.firstName} {profileData.lastName}</Title>
          <Divider />
          <Text type="secondary">{profileData.country}</Text>
          <Divider />
          <Text type="secondary">{profileData.mobileNumber}</Text>
          <Divider />
          <Text type="secondary">{profileData.birthDay}</Text>
          <Divider />
          <Text type="secondary">{profileData.email}</Text>
          <Divider />
          <Text>Loyalty Points: {profileData.loyaltyPoints}</Text>
          <Progress percent={(profileData.loyaltyPoints / 100) * 100} showInfo={false} />
          <Button type="primary" style={{ marginTop: '12px' }}>Redeem Points</Button>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
