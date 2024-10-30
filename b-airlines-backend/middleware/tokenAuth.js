import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  // Check if authorization header is provided
  if (!header) {
    return res.status(403).json({ message: 'Authorization header is missing' });
  }

  const token = header.split(' ')[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach the decoded user to req
    next(); // Pass to next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
