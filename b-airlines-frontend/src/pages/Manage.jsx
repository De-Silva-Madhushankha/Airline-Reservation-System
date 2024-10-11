import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Manage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5, color: '#000000' }}>
        <Grid container spacing={4}>
          {/* Manage Booking Card - Highlighted */}
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: '#f9f9f9',
                color: '#000000',
                boxShadow: '0 10px 30px rgba(0, 123, 255, 0.3)',
                borderRadius: '16px',
                padding: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                {/* Manage Your Booking Title */}
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  Manage Your Booking
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: '#333', fontSize: '1.1rem' }}>
                  Choose from the following options:
                </Typography>
                <List>
                  <ListItem
                    button
                    onClick={() => handleNavigation('/manage/cancel-booking')}
                    sx={{
                      backgroundColor: '#e0e0e0',
                      '&:hover': {
                        backgroundColor: '#bdbdbd',
                        color: '#000',
                        '& .MuiTypography-root': {
                          color: '#1976d2', // Change text color to blue on hover
                        },
                      },
                      borderRadius: '8px',
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary="Cancel Your Booking"
                      sx={{ fontSize: '1rem', fontWeight: '600', '&:hover': { color: '#1976d2' } }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleNavigation('/manage/change-booking')}
                    sx={{
                      backgroundColor: '#e0e0e0',
                      '&:hover': {
                        backgroundColor: '#bdbdbd',
                        color: '#000',
                        '& .MuiTypography-root': {
                          color: '#1976d2', // Change text color to blue on hover
                        },
                      },
                      borderRadius: '8px',
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary="Change Your Booking"
                      sx={{ fontSize: '1rem', fontWeight: '600', '&:hover': { color: '#1976d2' } }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleNavigation('/manage/change-seat')}
                    sx={{
                      backgroundColor: '#e0e0e0',
                      '&:hover': {
                        backgroundColor: '#bdbdbd',
                        color: '#000',
                        '& .MuiTypography-root': {
                          color: '#1976d2', // Change text color to blue on hover
                        },
                      },
                      borderRadius: '8px',
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary="Choose Your Seat"
                      sx={{ fontSize: '1rem', fontWeight: '600', '&:hover': { color: '#1976d2' } }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Before You Fly Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                color: '#000',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Before You Fly
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Check in, review your flight details, and manage special requests before you fly.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, backgroundColor: '#000', '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}
                  onClick={() => handleNavigation('/manage/before-you-fly')}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Baggage Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                color: '#000',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Baggage
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Review baggage policies and purchase additional baggage allowance.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, backgroundColor: '#000', '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}
                  onClick={() => handleNavigation('/manage/baggage')}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Visa & Passport Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                color: '#000',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Visa & Passport
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ensure your travel documents are ready for international travel.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, backgroundColor: '#000', '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}
                  onClick={() => handleNavigation('/manage/visa-passport')}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Manage;
