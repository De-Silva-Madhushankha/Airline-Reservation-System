import React, { useState, useEffect } from 'react';
import { Table, Card, Modal, Button, message } from 'antd';
import axios from '../../axiosConfig.js';
import TicketDetails from './TicketDetails';
import './FlightHistory.css';

const FlightHistory = ({ flights }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'booking_id',
      key: 'booking_id',
      render: (text) => `${text.substring(0, 8)}...`, // Shorten the ID
    },
    {
      title: 'Flight ID',
      dataIndex: 'flight_id',
      key: 'flight_id',
      render: (text) => `${text.substring(0, 8)}...`, // Shorten the ID
    },
    {
      title: 'Seat ID',
      dataIndex: 'seat_id',
      key: 'seat_id',
      render: (text) => `${text.substring(0, 8)}...`, // Shorten the ID
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

  const handleRowClick = async (record) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        message.error('User is not authenticated');
        setLoading(false);
        return;
      }

      const response = await axios.get('/booking/bookings-passengers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookingDetails = response.data.find((booking) => booking.booking_id === record.booking_id);
      setSelectedFlight(bookingDetails);
      setIsModalVisible(true);
    } catch (error) {
      message.error('Failed to fetch booking details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFlight(null);
  };

  return (
    <Card title="Flight History" className='highlighted-table'>
      <Table 
        columns={columns} 
        dataSource={flights} 
        rowKey="booking_id" 
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        loading={loading}
      />
      <Modal
        title="Ticket Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {selectedFlight && <TicketDetails flight={selectedFlight} />}
      </Modal>
    </Card>
  );
};

export default FlightHistory;