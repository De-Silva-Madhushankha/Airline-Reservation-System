import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography
} from '@mui/material';
import './TicketDetails.css';

const TicketDetails = ({ flight }) => {
  // Helper function to truncate long IDs
  const truncateID = (id) => (id.length > 10 ? `${id.slice(0, 10)}...` : id);

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        title="B Airways E-Ticket"
        sx={{ backgroundColor: 'primary.main', color: 'white' }}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Booking ID:</span> {truncateID(flight.booking_id)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Booking Date:</span> {new Date(flight.booking_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Total Amount:</span> ${flight.total_amount.toFixed(2)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Payment Status:</span> {flight.payment_status}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Passenger Name:</span> {`${flight.passenger_first_name} ${flight.passenger_last_name}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Passport ID:</span> {truncateID(flight.passport_id)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Flight ID:</span> {truncateID(flight.flight_id)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Seat:</span> Row {flight.seat_row}, Column {flight.seat_column}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Seat Class:</span> {flight.seat_class_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Departure:</span> {`${flight.origin_code} - ${new Date(flight.departure).toLocaleString()}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="font-medium">Arrival:</span> {`${flight.destination_code} - ${new Date(flight.arrival).toLocaleString()}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TicketDetails;