import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // CREATE
  await prisma.user.create({
    data: {
      name: "JohnDoe",
      email: "johndoe@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like Doe" },
      },
    },
  });
  // FIND ALL USERS / GET ALL USERS
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
  // UPDATE
  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: false },
  // });
  // console.log(post);
  // DELETE
  // await prisma.user.delete({
  //   where: {
  //     email: "johndoe@prisma.io",
  //   },
  // });
  // await prisma.profile.deleteMany({
  //   where: {
  //     userId: 4,
  //   },
  // });
  // await prisma.post.deleteMany({
  //   where: {
  //     authorId: 4,
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
