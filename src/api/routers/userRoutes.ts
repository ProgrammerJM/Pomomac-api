import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import userController from "../controllers/userController";

const router: Router = Router();

router.get("/profile", isAuthenticated, userController.getProfile);

export default router;
