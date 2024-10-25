import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCounts, getCountsByDestination , getCountsByAge, getCountsByTime, getPastFlightModel, updateFlightStatus, getRevenueByAircraftType} from '../models/adminModel.js';


  
  export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findByEmail(email.toLowerCase());
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials!' });
      }

      const token = jwt.sign({ id: user[0].user_id, email: user[0].email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ success: true, token, message: 'Login successful' });
      
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };



  export const loadInitialData = async (req, res) => {
    try {
      const counts = await getCounts();
      res.status(200).json(counts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching counts', error });
    }
  };



  export const getCountbyDestination = async (req, res) => {
    const { destinationCode, startDate, endDate } = req.query;
  
    try {
      // Fetch the passenger count and details
      const { passenger_count, passenger_details } = await getCountsByDestination(destinationCode, startDate, endDate);
      
      // Send the count and details in the response
      res.status(200).json({
        passengerCount: passenger_count,   // Send the passenger count
        passengerDetails: passenger_details // Send the passenger details
      });
    } catch (error) {
      // Handle error by sending a 500 status code and an error message
      res.status(500).json({ message: 'Error fetching counts', error });
    }
  };
  

  export const getCountbyTime = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      const counts = await getCountsByTime(startDate, endDate);
      res.status(200).json({ passengerCount: counts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching counts', error });
    }
  };

  export const getCountbyAge = async (req, res) => {
    const {flightNumber} = req.query;
  
    try {
      const counts = await getCountsByAge(flightNumber);
      res.status(200).json({ passengerCount: counts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching counts', error });
    }
  };


  export const getPastFlights = async (req, res) => {
    const { originCode, destinationCode, startDate, endDate } = req.query;
  
    try {
      // Fetch past flights using the model
      const { flights } = await getPastFlightModel(originCode, destinationCode, startDate, endDate);
  
      // Return the flight data in the response
      res.status(200).json({
        message: 'Past flights retrieved successfully',
        flights, // Send the fetched flight data to the client
      });
    } catch (error) {
      console.error('Error fetching past flights:', error);
      
      // Send error response
      res.status(500).json({
        message: 'Error fetching past flights',
        error: error.message || error,
      });
    }
  };
  
  export const updateStatus = async (req, res) => {
    const { flight_id, status } = req.body; // Expect flight_id and status in the request body
  
    // Validate the input
    if (!flight_id || !status) {
      return res.status(400).json({ message: 'Flight ID and status are required' });
    }
  
    try {
      // Call the model function to update the flight status
      await updateFlightStatus(flight_id, status);
      res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating status', error });
    }
  };


  export const getRevenueByType = async (req, res) => {
    try {
      const counts = await getRevenueByAircraftType();
      res.status(200).json(counts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching counts', error });
    }
  };