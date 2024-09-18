// components/FlightHistory.js
import React from 'react';
import { Table, Card } from 'antd';

const FlightHistory = ({ flights }) => {
  const columns = [
    {
      title: 'Flight Number',
      dataIndex: 'flightNumber',
      key: 'flightNumber',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Card
      title="Flight History"
      bordered={false}
      style={{ marginBottom: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <Table
        columns={columns}
        dataSource={flights}
        pagination={false}
        rowKey="key"
        responsive
      />
    </Card>
  );
};

export default FlightHistory;
