import { Session } from "../interfaces/pomoInterface";
import { db } from "../utils/db";

const createSession = async (data: Session) => {
  return await db.pomodoroSession.create({
    data,
  });
};

const getSessions = async (userId: string) => {
  return await db.pomodoroSession.findMany({
    where: { userId },
  });
};

const updateSession = async (id: string, data: Session) => {
  return await db.pomodoroSession.update({
    where: { id },
    data,
  });
};

const deleteSession = async (id: string) => {
  return await db.pomodoroSession.delete({
    where: { id },
  });
};

export default { createSession, deleteSession, getSessions, updateSession };
