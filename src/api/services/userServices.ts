import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function CreateUser(email: string, password: string) {
  // Create User with the provided values
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  // Create UserSettings with default values and link it to the user
  const userSettings = await prisma.userSetting.create({
    data: {
      userId: user.id, // Link to the created user
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
    },
  });

  return { user, userSettings };
}

async function FindAllUsers() {
  return await prisma.user.findMany();
}

export default { CreateUser, FindAllUsers };
