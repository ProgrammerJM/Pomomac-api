import { Router } from "express";
import userController from "../controllers/userController";

const router: Router = Router();

router.post("/signup", userController.createUser);
router.get("/users", userController.getAllUsers);

export default router;
