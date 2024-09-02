import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/signup", authController.signUpUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logOutUser);
router.post("/refreshToken", authController.getRefreshToken);
// router.get("/checkAuth", authController.checkAuth);

export default router;
