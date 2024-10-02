import React from 'react';
import { Table, Card } from 'antd';
import './FlightHistory.css';

const FlightHistory = ({ flights }) => {
  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'booking_id',
      key: 'booking_id',
    },
    {
      title: 'Flight ID',
      dataIndex: 'flight_id',
      key: 'flight_id',
    },
    {
      title: 'Seat ID',
      dataIndex: 'seat_id',
      key: 'seat_id',
    },
    {
      title: 'Booking Date',
      dataIndex: 'booking_date',
      key: 'booking_date',
      render: (text) => new Date(text).toLocaleDateString(), // Format the date
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount) => `$${amount.toFixed(2)}`, // Format the amount
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
  ];

  return (
    <Card title="Flight History" className='highlighted-table'>
      <Table columns={columns} dataSource={flights} rowKey="booking_id" />
    </Card>
  );
};

export default FlightHistory;