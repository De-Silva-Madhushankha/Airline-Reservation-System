import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, Select, MenuItem, Typography } from '@mui/material';

// Mock function to get booking details (you would replace this with an API call)
const getBookingDetails = () => {
  return {
    flightNumber: 'AR1234',
    departure: 'New York (JFK)',
    destination: 'Los Angeles (LAX)',
    date: '2024-10-15',
    planeType: 'Boeing 737',
  };
};

const ChangeBooking = () => {
  // State for booking details
  const [bookingDetails, setBookingDetails] = useState(getBookingDetails());
  // State for the selected plane type
  const [selectedPlane, setSelectedPlane] = useState(bookingDetails.planeType);

  // Handle plane type change
  const handlePlaneChange = (event) => {
    setSelectedPlane(event.target.value);
  };

  // Handle form submission (you would make an API call here)
  const handleSubmit = () => {
    // Update booking details with the new plane
    const updatedBooking = {
      ...bookingDetails,
      planeType: selectedPlane,
    };

    console.log('Updated Booking:', updatedBooking);
    // Add API call here to submit the updated booking details
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Change Your Booking
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Booking Detail</strong></TableCell>
            <TableCell><strong>Value</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Flight Number */}
          <TableRow>
            <TableCell>Flight Number</TableCell>
            <TableCell>{bookingDetails.flightNumber}</TableCell>
          </TableRow>

          {/* Route (non-editable) */}
          <TableRow>
            <TableCell>Departure</TableCell>
            <TableCell>{bookingDetails.departure}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Destination</TableCell>
            <TableCell>{bookingDetails.destination}</TableCell>
          </TableRow>

          {/* Date */}
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>{bookingDetails.date}</TableCell>
          </TableRow>

          {/* Plane Type (editable) */}
          <TableRow>
            <TableCell>Plane Type</TableCell>
            <TableCell>
              <Select
                value={selectedPlane}
                onChange={handlePlaneChange}
                fullWidth
              >
                <MenuItem value="Boeing 737">Boeing 737</MenuItem>
                <MenuItem value="Airbus A320">Airbus A320</MenuItem>
                <MenuItem value="Boeing 747">Boeing 747</MenuItem>
                <MenuItem value="Airbus A380">Airbus A380</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default ChangeBooking;
