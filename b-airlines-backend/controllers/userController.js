import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()


// Function to hash the password using bcrypt
async function hashPassword(password) {
  // Generate a salt
  const saltRounds = 10; // Number of rounds for salting
  const salt = await bcrypt.genSalt(saltRounds);
  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Function to insert a new user into the database
export const registerUser = async (req, res) => {
  const { title, firstName, lastName, email, password, dateOfBirth, country, mobileNumber } = req.body;
  try {

    const existingUser = await User.findByEmail(email);
    console.log(existingUser);
    if (existingUser.length > 0) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);


    // Insert the user into the database
    const insert_id = await User.create(title, firstName, lastName, email, hashedPassword, dateOfBirth, country, mobileNumber);
    console.log(insert_id);
    res.status(201).json({ insert_id, success: true, message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.getAll();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const affectedRows = await User.update(id, updates);
    if (affectedRows) {
      res.json({ message: 'user updated successfully' });
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await User.delete(id);
    if (affectedRows) {
      res.json({ message: 'user deleted successfully' });
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email.toLowerCase());
    //console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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

export const getUserProfile = async (req, res) => {
  try {
    const user_info = await User.findById(req.user.id);
    const user_flights = await User.getUserFlights(req.user.id);

    // Log the fetched user info
    //console.log('Fetched User Info:', user_info);
    //console.log('Fetched User Flights:', user_flights);

    if (!user_info) {
      return res.status(404).json({ message: 'User not found' });
    }

    const responseData = {
      title: user_info[0].title || '',
      firstName: user_info[0].first_name || '',
      lastName: user_info[0].last_name || '',
      email: user_info[0].email || '',
      loyaltyPoints: user_info[0].loyalty_points || 0,
      dateOfBirth: user_info[0].date_of_birth || 'N/A',
      country: user_info[0].country || 'N/A',
      mobileNumber: user_info[0].mobile_number || 'N/A',
      flights: user_flights ? user_flights : [],
    };

    // Log the response data
    console.log('Response Data:', JSON.stringify(responseData, null, 2));
    
    return res.json(responseData);

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
