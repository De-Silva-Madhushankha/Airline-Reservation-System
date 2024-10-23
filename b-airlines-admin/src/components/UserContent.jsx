import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Space, Button, Tag, Avatar, Modal } from 'antd';
import { SearchOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const UserContent = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/users');
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const getAgeFromDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getCountryColor = (country) => {
    const colors = {
      'Sri Lanka': 'green',
      'Vietnam': 'yellow',
      'Singapore': 'blue',
      'Thailand': 'purple',
      'India': 'orange',
      'Argentina': 'cyan',
      'Egypt': 'magenta',
      'USA': 'geekblue'
    };
    return colors[country] || 'default';
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      fixed: 'left',
      width: 250,
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <div className="font-medium">{`${record.title} ${record.first_name} ${record.last_name}`}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'date_of_birth',
      width: 100,
      render: (dob) => getAgeFromDOB(dob),
      sorter: (a, b) => getAgeFromDOB(a.date_of_birth) - getAgeFromDOB(b.date_of_birth),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      width: 150,
      render: (country) => (
        <Tag color={getCountryColor(country)}>{country}</Tag>
      ),
      filters: [...new Set(users.map(user => user.country))].map(country => ({
        text: country,
        value: country,
      })),
      onFilter: (value, record) => record.country === value,
    },
    {
      title: 'Phone',
      dataIndex: 'mobile_number',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleRowClick(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const filteredUsers = users.filter(user =>
    Object.values(user).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleRowClick = async (record) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/admin/users/${record.user_id}`);
      setUserDetails(response.data);
      setSelectedUser(record);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <Card
      className="w-full"
      title="User Management"
      extra={
        <Space>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            className="w-64"
          />
          <Button type="primary">Search</Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="user_id"
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        scroll={{ x: 1000 }}
      />
      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {userDetails && (
          <div>
            <h3>{`${selectedUser.title} ${selectedUser.first_name} ${selectedUser.last_name}`}</h3>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.mobile_number}</p>
            <p>Country: {selectedUser.country}</p>
            <h4>Bookings:</h4>
            <ul>
              {userDetails.bookings.map(booking => (
                <li key={booking.booking_id}>
                  Booking ID: {booking.booking_id}, Date: {booking.date}
                </li>
              ))}
            </ul>
            <h4>Passengers:</h4>
            <ul>
              {userDetails.passengers.map(passenger => (
                <li key={passenger.passenger_id}>
                  {passenger.first_name} {passenger.last_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default UserContent;