import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

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
      setBookings(bookings.filter((booking) => booking.booking_id !== bookingId)); // Update the bookings list
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError(err.response?.data?.message || 'Error deleting booking');
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3, mb: 3 }}>
        Manage Your Bookings
      </Typography>

     
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Flight ID</StyledTableCell>
                <StyledTableCell>Passenger Firstname</StyledTableCell>
                <StyledTableCell>Passenger Lastname</StyledTableCell>
                <StyledTableCell>Booking Date</StyledTableCell>
                <StyledTableCell>Total Amount</StyledTableCell>
                <StyledTableCell>Payment Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            {bookings.length > 0 ? (
                <TableBody>
                  {bookings.map((booking) => (
                    <StyledTableRow key={booking.booking_id}>
                      <TableCell align="center">{booking.flight_id}</TableCell>
                      <TableCell align="center">{booking.first_name}</TableCell>
                      <TableCell align="center">{booking.last_name}</TableCell>
                      <TableCell align="center">{new Date(booking.booking_date).toLocaleString()}</TableCell>
                      <TableCell align="center">${booking.total_amount}</TableCell>
                      <TableCell align="center">{booking.payment_status}</TableCell>
                      <TableCell align="center">
                        {
                          booking.payment_status !==  "Paid" &
                          <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(booking.booking_id)}
                        >
                          Cancel Booking
                        </Button>
                        }
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>  ) :   (
            <Typography align="center">No bookings available.</Typography>
          )}
          
              </Table>
            </TableContainer>
    </Container>
  );
};

export default CancelBooking;
