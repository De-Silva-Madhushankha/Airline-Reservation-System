import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Manage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Your Booking
      </Typography>
      <Grid container spacing={4}>
        {/* Before You Fly Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: '200px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Before You Fly
              </Typography>
              <Typography variant="body1" gutterBottom>
                Check in, review your flight details, and manage special requests before you fly.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation('/manage/before-you-fly')}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Baggage Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: '200px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Baggage
              </Typography>
              <Typography variant="body1" gutterBottom>
                Review baggage policies and purchase additional baggage allowance.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation('/manage/baggage')}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Visa & Passport Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: '200px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Visa & Passport
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ensure your travel documents are ready for international travel.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation('/manage/visa-passport')}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Booking Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: '250px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage Your Booking
              </Typography>
              <Typography variant="body1" gutterBottom>
                Choose from the following options to manage your booking:
              </Typography>
              <List>
                <ListItem button onClick={() => handleNavigation('/manage/cancel-booking')}>
                  <ListItemText primary="Cancel your booking" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/manage/change-booking')}>
                  <ListItemText primary="Change your booking" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/manage/change-seat')}>
                  <ListItemText primary="Choose your seat" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Manage;
