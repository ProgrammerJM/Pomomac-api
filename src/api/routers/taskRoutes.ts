import { Router } from "express";
import taskController from "../controllers/taskController";
import isAuthenticated from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/todos", isAuthenticated, taskController.getTask);
router.post("/todo", isAuthenticated, taskController.createTask);
router.delete("/todo/:id", isAuthenticated, taskController.deleteTask);

// router.get("/tasks/:userId", taskController.getTask);
// router.post("/tasks", taskController.createTask);
// router.put("/tasks/:id", taskController.updateTask);
// router.delete("/tasks/:id", taskController.deleteTask);

export default router;
