import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import axios from '../axiosConfig.js';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/profileComponents/ProfileCard';
import FlightHistory from '../components/profileComponents/FlightHistory';
import dayjs from 'dayjs';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });
        console.log("Received Data: ", response.data); // Debugging log
        setUser(response.data); // Set user data
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Error fetching profile');
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
    <>

      <Navbar />

      <div className="profile-container" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={6}>
            <ProfileCard title={user.title} firstName={user.firstName} lastName={user.lastName} email={user.email} loyaltyPoints={user.loyaltyPoints} country={user.country} mobileNumber={user.mobileNumber} birthDay={dayjs(user.dateOfBirth).format('YYYY-MM-DD')} />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            <FlightHistory flights={user.flights} />
          </Col>
        </Row>
      </div>


    </>

  );
};

export default UserProfile;