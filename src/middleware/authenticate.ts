import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (token == null) {
    return res.status(401).json({
        "status" : false,
        "message" : "User unauthorized"
    }); 
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    console.log(token);
    if (err) {
        return res.status(403).json({
            "status" : false,
            "message" : "Invalid token"
        }); 
    }
    req.user = user as JwtPayload; // Store the user object in the request for further use
    next(); // Proceed to the next middleware or route handler
  });
};


