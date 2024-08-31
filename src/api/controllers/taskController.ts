import taskService from "../services/taskService";
import { Request, Response, NextFunction } from "express";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const tasks = await taskService.getTask(userId);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(id, req.body);
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { createTask, getTask, updateTask, deleteTask };
