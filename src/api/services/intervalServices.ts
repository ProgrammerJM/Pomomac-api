import { Interval } from "../interfaces/intervalInterface";
import { db } from "../utils/db";

const createInterval = async (data: Interval) => {
  return await db.pomodoroInterval.create({
    data,
  });
};

const getIntervals = async (sessionId: string) => {
  return await db.pomodoroInterval.findMany({
    where: { sessionId },
  });
};

const updateInterval = async (id: string, data: Interval) => {
  return await db.pomodoroInterval.update({
    where: { id },
    data,
  });
};

const deleteInterval = async (id: string) => {
  return await db.pomodoroInterval.delete({
    where: { id },
  });
};

export default { createInterval, getIntervals, updateInterval, deleteInterval };
