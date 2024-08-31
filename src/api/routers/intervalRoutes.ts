import { Router } from "express";
import intervalController from "../controllers/intervalController";

const router: Router = Router();

router.post("/intervals", intervalController.createInterval);
router.get("/intervals/:sessionId", intervalController.getIntervals);
router.put("/intervals/:id", intervalController.updateInterval);
router.delete("/intervals/:id", intervalController.deleteInterval);

export default router;
