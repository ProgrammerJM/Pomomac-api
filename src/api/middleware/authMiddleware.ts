import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  payload?: { userId: string; jti: string; iat: number; exp: number }; // Optional payload
}

function isAuthenticated(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.accessToken; // Get the token from cookies

  if (!token) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: string;
      jti: string;
      iat: number;
      exp: number;
    };

    req.payload = payload;
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "🚫 Token expired 🚫" });
    }
    return res.status(401).json({ error: "🚫 Invalid token 🚫" });
  }

  return next();
}

export { isAuthenticated };
