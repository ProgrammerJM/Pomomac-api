import { Task } from "../interfaces/taskInterface";
import { db } from "../utils/db";

const createTask = async (data: Task) => {
  return await db.task.create({
    data: {
      userId: data.userId,
      name: data.name,
      description: data.description,
      status: data.status,
    },
  });
};

const getTask = async (userId: string) => {
  return await db.task.findMany({
    where: {
      userId,
    },
  });
};

const updateTask = async (id: string, data: Task) => {
  return await db.task.update({
    where: { id },
    data,
  });
};

const deleteTask = async (id: string) => {
  return await db.task.delete({
    where: {
      id,
    },
  });
};

export default { createTask, deleteTask, getTask, updateTask };
