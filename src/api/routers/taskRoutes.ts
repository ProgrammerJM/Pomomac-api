import { Router } from "express";
import taskController from "../controllers/taskController";

const router: Router = Router();

router.get("/tasks/:userId", taskController.getTask);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
