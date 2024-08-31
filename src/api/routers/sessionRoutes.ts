import { Router } from "express";
import sessionController from "../controllers/sessionController";

const router: Router = Router();

router.post("/sessions", sessionController.createSession);
router.get("/sessions/:userId", sessionController.getSessions);
router.put("/sessions/:id", sessionController.updateSession);
router.delete("/sessions/:id", sessionController.deleteSession);

export default router;
