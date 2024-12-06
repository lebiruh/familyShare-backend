import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthenticated = (req, res, next) => {
  
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({message: "Unauthorized"})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.status(400).json({message: "Invalid token"})
    }
    next();
  });
}
