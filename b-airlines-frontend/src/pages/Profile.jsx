// pages/ProfilePage.js
import React from 'react';
import { Row, Col } from 'antd';
import ProfileCard from '../components/profileComponents/ProfileCard';
import FlightHistory from '../components/profileComponents/FlightHistory';
import ProfileInfo from '../components/profileComponents/ProfileInfo';

const UserProfile = () => {
  const user = {
    name: 'Madhu De Silva',
    email: 'admin@gmail.com',
    loyaltyPoints: 2000,
    flights: [
      { key: '1', flightNumber: 'FL123', from: 'New York (JFK)', to: 'London (LHR)', date: '2024-08-12', status: 'Completed' },
      { key: '2', flightNumber: 'FL456', from: 'Dubai (DXB)', to: 'Colombo (CMB)', date: '2024-07-22', status: 'Completed' },
    ],
    profileInfo: [
      { label: 'First Name', value: 'Madhu' },
      { label: 'Last Name', value: 'De Silva' },
      { label: 'Email', value: 'admin@gmail.com' },
      { label: 'Mobile', value: '0704424913' },
      { label: 'Country', value: 'Sri Lanka' },
      { label: 'Role', value: 'Administrator' },
    ],
  };

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
