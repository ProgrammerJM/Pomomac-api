import { db } from "../utils/db";
import bcrypt from "bcrypt";

async function CreateUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // Create User with the provided values
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Create UserSettings with default values and link it to the user
  const userSettings = await db.userSetting.create({
    data: {
      userId: user.id, // Link to the created user
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
    },
  });

  return { user, userSettings };
}

async function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

async function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export { CreateUser, findUserByEmail, findUserById };
