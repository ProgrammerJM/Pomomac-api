import intervalService from "../services/intervalServices";
import { Request, Response, NextFunction } from "express";

const createInterval = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const interval = await intervalService.createInterval(req.body);
    res.status(201).json(interval);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getIntervals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const intervals = await intervalService.getIntervals(sessionId);
    res.status(200).json(intervals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateInterval = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedInterval = await intervalService.updateInterval(id, req.body);
    res.status(200).json(updatedInterval);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInterval = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await intervalService.deleteInterval(id);
    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { createInterval, getIntervals, updateInterval, deleteInterval };
