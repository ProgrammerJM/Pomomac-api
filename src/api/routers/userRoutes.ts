import { Request, Response, NextFunction } from "express";
import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { findUserById } from "../services/userServices";

interface CustomRequest extends Request {
  payload?: { userId: string }; // Optional payload
}

const router = express.Router();

router.get(
  "/profile",
  isAuthenticated,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { userId } = req.payload;
      const user = await findUserById(userId);
      delete (user as { password?: any })?.password;
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
