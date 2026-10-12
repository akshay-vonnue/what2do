import prisma from "../../utils/prisma";

export const createTodoService = async (
  title: string,
  description: string,
  scheduledAt: Date,
  userId: number,
) => {
  try {
    const result = await prisma.todo.create({
      data: {
        title,
        description,
        scheduled_at: scheduledAt,
        created_by: userId,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
