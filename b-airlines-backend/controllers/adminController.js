import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCounts } from '../models/adminModel.js';

// export const loadInitialData = async (req, res) => {
//     try {
//       const responseData = {
//         status : 'Success'
//       };
  
//       // Log the response data
//       console.log('Response Data:', JSON.stringify(responseData, null, 2));
      
//       return res.json(responseData);
  
//     } catch (error) {
//       console.error('Error:', error.message);
//       return res.status(500).json({ error: error.message });
//     }
//   };
  


  
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