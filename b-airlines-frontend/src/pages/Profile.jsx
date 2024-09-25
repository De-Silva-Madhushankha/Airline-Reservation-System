import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import axios from 'axios';
import ProfileCard from '../components/profileComponents/ProfileCard';
import FlightHistory from '../components/profileComponents/FlightHistory';
import ProfileInfo from '../components/profileComponents/ProfileInfo';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/user/profile',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="profile-container" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <ProfileCard name={user.name} email={user.email} loyaltyPoints={user.loyaltyPoints} />
        </Col>
        <Col xs={24} sm={24} md={16} lg={18}>
          <FlightHistory flights={user.flights} />
          <ProfileInfo userInfo={user.profileInfo} />
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;