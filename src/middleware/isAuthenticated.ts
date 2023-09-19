import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const isAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // const token: string = req.cookies.accessToken;
  // console.log("headers",req.headers.authorization)
  const token = req.headers.authorization;
  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.SECRET as string);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "invalid token" });
  }
};
