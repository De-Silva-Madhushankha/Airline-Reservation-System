import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCounts, getCountsByDestination} from '../models/adminModel.js';


  
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
      const counts = await getCountsByDestination(destinationCode, startDate, endDate);
      res.status(200).json({ passengerCount: counts });
    } catch (error) {
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