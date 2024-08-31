import sessionService from "../services/sessionService";
import { Request, Response, NextFunction } from "express";

const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const sessions = await sessionService.getSessions(userId);
    res.status(200).json(sessions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedSession = await sessionService.updateSession(id, req.body);
    res.status(200).json(updatedSession);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await sessionService.deleteSession(id);
    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { createSession, getSessions, updateSession, deleteSession };
