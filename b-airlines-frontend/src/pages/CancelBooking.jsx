import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig.js';
import UserNavbar from '../components/UserNavbar';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Paper,
  TableContainer,
  Box,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[200],
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const NoticeBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[800]}`,
  textAlign: 'center',
}));

const CancelBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/booking/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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
      setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError(err.response?.data?.message || 'Error deleting booking');
    }
  };

  return (
    <>
      <UserNavbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Manage Your Bookings
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center" mb={3}>
            View and manage your upcoming bookings.
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                maxWidth: '100%',
                backgroundColor: 'grey.50',
              }}
            >
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
                <TableBody>
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <StyledTableRow key={booking.booking_id}>
                        <TableCell align="center">{booking.flight_id}</TableCell>
                        <TableCell align="center">{booking.first_name}</TableCell>
                        <TableCell align="center">{booking.last_name}</TableCell>
                        <TableCell align="center">{new Date(booking.booking_date).toLocaleString()}</TableCell>
                        <TableCell align="center">${booking.total_amount}</TableCell>
                        <TableCell align="center">{booking.payment_status}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(booking.booking_id)}
                            sx={{
                              minWidth: '120px',
                              fontSize: '0.875rem',
                              fontWeight: 'bold',
                            }}
                          >
                            Cancel Booking
                          </Button>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="subtitle1" color="textSecondary">
                          No bookings available.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Cashback Notice */}
            <NoticeBox>
              <Typography variant="body1" color="textSecondary">
                Note: You are eligible for only a <strong>40% cashback</strong> upon booking cancellation.
              </Typography>
            </NoticeBox>
          </>
        )}
      </Container>
    </>
  );
};

export default CancelBooking;
