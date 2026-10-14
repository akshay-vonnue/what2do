import prisma from "../src/utils/prisma";


await prisma.user.deleteMany()
await prisma.todo.deleteMany()

async function seedDB() {
  // password: 123456
  const user = await prisma.user.create({
    data: {
      name: "admin",
      email: "a@gmail.com",
      passwordHash:
        "$2b$10$AHMYC007n8wNFHXyTOJIbeTj.zVgai8evjWLW5rcUC3t8e3Ku8B3O",
    },
  });

  await prisma.todo.createMany({
    data: [
      {
        title: "t1",
        description: "d1",
        scheduled_at: new Date("2026-10-16T12:36").toISOString(),
        created_by: user.id,
      },
      {
        title: "t2",
        description: "d2",
        scheduled_at: new Date("2026-10-14T12:36").toISOString(),
        created_by: user.id,
      },
      {
        title: "t3",
        description: "d3",
        scheduled_at: new Date("2026-10-14T12:36").toISOString(),
        created_by: user.id,
      },
      {
        title: "t4",
        description: "d4",
        scheduled_at: new Date("2026-10-13T12:36").toISOString(),
        created_by: user.id,
      },
      {
        title: "t5",
        description: "d5",
        scheduled_at: new Date("2026-09-09T12:36").toISOString(),
        created_by: user.id,
      },
      {
        title: "t6",
        description: "d6",
        scheduled_at: new Date("2026-10-14T12:36").toISOString(),
        created_by: user.id,
          },
      {
        title: "t7",
        description: "d7",
        scheduled_at: new Date().toISOString(),
        created_by: user.id,
          },
      {
        title: "t8",
        description: "d8",
        scheduled_at: new Date().toISOString(),
        created_by: user.id,
      },
    ],
  });
}

seedDB();
