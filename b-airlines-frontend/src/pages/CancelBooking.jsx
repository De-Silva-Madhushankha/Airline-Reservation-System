import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CancelBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Get the token from localStorage or sessionStorage

    if (!token) {
      setError('User is not authenticated');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.get('http://localhost:3001/api/booking/bookings', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      console.log(response.data)
      setBookings(response.data); // Set bookings data from response
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Error fetching bookings');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings when the component mounts
  }, []);

  const handleDelete = async (bookingId) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/booking/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(bookings.filter((booking) => booking.id !== bookingId)); // Update the bookings list
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError(err.response?.data?.message || 'Error deleting booking');
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Your Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.booking_id} style={{ marginBottom: '20px' }}>
              <p><strong>Booking ID:</strong> {booking.booking_id}</p>
              <p><strong>Flight ID:</strong> {booking.flight_id}</p>
              <p><strong>Passenger ID:</strong> {booking.passenger_id}</p>
              <p><strong>Seat ID:</strong> {booking.seat_id}</p>
              <p><strong>User ID:</strong> {booking.user_id}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ${booking.total_amount}</p>
              <p><strong>Payment Status:</strong> {booking.payment_status}</p>
              <button onClick={() => handleDelete(booking.booking_id)}>Cancel Booking</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
  
};

export default CancelBooking;
