import { Task } from "../interfaces/pomoInterface";
import { db } from "../utils/db";

const getTask = async (userId: string) => {
  return await db.task.findMany({
    where: {
      userId,
    },
  });
};

const createTask = async (userId: string, data: Task) => {
  return await db.task.create({
    data: {
      userId: userId,
      name: data.name,
      description: data.description,
      status: "PENDING",
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
