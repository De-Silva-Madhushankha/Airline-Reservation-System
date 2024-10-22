import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Space, Button, Tag, Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const UserContent = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

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
  ];

  const filteredUsers = users.filter(user =>
    Object.values(user).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

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
    </Card>
  );
};

export default UserContent;