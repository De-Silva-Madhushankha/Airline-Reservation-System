import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
