// import { Request, Response, NextFunction } from "express";
// const jwt = require("jsonwebtoken");

// interface CustomRequest extends Request {
//   payload?: { email: string; password: string }; // Optional payload
// }

// function isAuthenticated(
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     res.status(401);
//     throw new Error("🚫 Un-Authorized 🚫");
//   }

//   try {
//     const token = authorization.split(" ")[1];
//     const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as {
//       email: string;
//       password: string;
//     };
//     req.payload = payload;
//   } catch (err: string | any) {
//     res.status(401);
//     if (err.name === "TokenExpiredError") {
//       throw new Error(err.name);
//     }
//     throw new Error("🚫 Un-Authorized 🚫");
//   }

//   return next();
// }

// export { isAuthenticated };
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

// interface JWTPayload {
//   userId: string;
//   iat: number;
//   exp: number;
// }
interface CustomRequest extends Request {
  payload?: { userId: string };
}

function isAuthenticated(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    // Attach the payload to the request object for further use
    req.payload = payload;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "🚫 Token expired 🚫" });
    }
    return res.status(401).json({ error: "🚫 Invalid token 🚫" });
  }

  return next(); // Proceed to the next middleware or route handler
}

export { isAuthenticated };
