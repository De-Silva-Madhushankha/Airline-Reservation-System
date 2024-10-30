import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig.js';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Box,
  TableContainer,
} from '@mui/material';
import { styled } from '@mui/material/styles';


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

const ChangeBooking = () => {
  const [bookings, setBookings] = useState([]); // Store bookings
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedBooking, setSelectedBooking] = useState(null); // Selected booking to change
  const [selectedPlane, setSelectedPlane] = useState(''); // Store new plane type
  const [selectedDate, setSelectedDate] = useState(''); // Store new date

  // Fetch bookings data
  const fetchBookings = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated'); // If no token, set an error
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.get('/booking/bookings', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });

      setBookings(response.data); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized: Please login again.');
        localStorage.removeItem('token'); // Remove invalid token
        sessionStorage.removeItem('token');
      } else {
        console.error('Error fetching bookings:', err);
        setError(err.response?.data?.message || 'Error fetching bookings');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle plane type change
  const handlePlaneChange = (event) => {
    setSelectedPlane(event.target.value);
  };

  // Function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  
  const handleUpdateBooking = async (bookingId) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      return;
    }

    const updatedBooking = {
      planeType: selectedPlane,
      date: selectedDate,
    };

    try {
      await axios.put(`/booking/bookings/${bookingId}`, updatedBooking, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Booking updated successfully!');
      setSelectedBooking(null); // Clear selected booking
      fetchBookings(); // Refresh the booking list
    } catch (err) {
      console.error('Error updating booking:', err);
      setError(err.response?.data?.message || 'Error updating booking');
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings when component mounts
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3, mb: 3 }}>
        Manage Your Bookings
      </Typography>

      {bookings.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Booking ID</StyledTableCell>
                <StyledTableCell>Flight ID</StyledTableCell>
                <StyledTableCell>Passenger ID</StyledTableCell>
                <StyledTableCell>Seat ID</StyledTableCell>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>Booking Date</StyledTableCell>
                <StyledTableCell>Total Amount</StyledTableCell>
                <StyledTableCell>Payment Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <StyledTableRow key={booking.booking_id}>
                  <TableCell align="center">{booking.booking_id}</TableCell>
                  <TableCell align="center">{booking.flight_id}</TableCell>
                  <TableCell align="center">{booking.passenger_id}</TableCell>
                  <TableCell align="center">{booking.seat_id}</TableCell>
                  <TableCell align="center">{booking.user_id}</TableCell>
                  <TableCell align="center">{new Date(booking.booking_date).toLocaleString()}</TableCell>
                  <TableCell align="center">${booking.total_amount}</TableCell>
                  <TableCell align="center">{booking.payment_status}</TableCell>
                  <TableCell align="center">
                    {selectedBooking === booking.booking_id ? (
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Select value={selectedPlane} onChange={handlePlaneChange} displayEmpty fullWidth>
                          <MenuItem value=""><em>Select Plane</em></MenuItem>
                          <MenuItem value="Boeing 737">Boeing 737</MenuItem>
                          <MenuItem value="Airbus A320">Airbus A320</MenuItem>
                          <MenuItem value="Boeing 747">Boeing 747</MenuItem>
                          <MenuItem value="Airbus A380">Airbus A380</MenuItem>
                        </Select>
                        <TextField
                          type="date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          fullWidth
                        />
                        <Box display="flex" gap={1}>
                          <Button variant="contained" color="primary" onClick={() => handleUpdateBooking(booking.booking_id)}>
                            Save
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={() => setSelectedBooking(null)}>
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Button variant="contained" color="primary" onClick={() => {
                        setSelectedBooking(booking.booking_id);
                        setSelectedPlane(booking.planeType); // Set initial plane
                        setSelectedDate(booking.date); // Set initial date
                      }}>
                        Change Booking
                      </Button>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center">No bookings available.</Typography>
      )}
    </Container>
  );
};

export default ChangeBooking;
