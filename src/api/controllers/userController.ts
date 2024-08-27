import { Request, Response, NextFunction } from "express";
import { findUserById } from "../services/userServices";

// Define a custom request interface that extends the default Request
interface CustomRequest extends Request {
  payload?: { userId: string }; // Optional payload
}

async function getProfile(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.payload) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure sensitive information such as password is not sent in the response
    const { password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
}

export default { getProfile };
