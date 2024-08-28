import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
  payload?: { userId: string }; // Optional payload
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
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    req.payload = payload;

    next(); // Proceed to the next middleware or route handler
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "🚫 Token expired 🚫" });
    }
    return res.status(401).json({ error: "🚫 Invalid token 🚫" });
  }
}

export { isAuthenticated };
