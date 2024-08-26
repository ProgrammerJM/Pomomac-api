import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/signup", authController.authenticateSignUpUser);
router.post("/login", authController.authenticateLoginUser);
router.post("/refreshToken", authController.refreshToken);
// router.get("/auth", authController.checkAuth);

export default router;
