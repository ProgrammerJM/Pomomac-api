import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function CreateUser(name: string, email: string) {
  return await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
}

async function FindAllUsers() {
  return await prisma.user.findMany();
}

export default { CreateUser, FindAllUsers };
