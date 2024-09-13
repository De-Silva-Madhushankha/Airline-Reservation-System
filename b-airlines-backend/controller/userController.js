import bcrypt from 'bcrypt';
import User from '../models/userModel';

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
exports.createUser = async (username, password, phoneNumber, email) => {
  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the user into the database
    const user_id = await User.create(username, hashedPassword, phoneNumber, email, loyaltyPoints);
    res.status(201).json({ User_ID: user_id, username });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.getAll();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  console.log("Requesting user with id: ", id);
  try {
    const user = await User.getById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
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

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', User: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};