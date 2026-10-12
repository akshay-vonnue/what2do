import type { Todo } from "../../generated/prisma/client";
import { CustomError } from "../../utils/Error";
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

export const getAllTodoService = async (userId: number) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        created_by: userId,
      },
    });

    return todos;
  } catch (error) {
    throw error;
  }
};

export const updateTodoService = async (
  data: Partial<Todo>,
  userId: number,
  todoId: number,
) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) throw new CustomError(404, "todo not found");

    if (todo.created_by === userId)
      throw new CustomError(401, "unauthorised action");

    const result = await prisma.user.update({
      where: {
        id: todoId,
      },
      data: {
        ...data,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoService = async (todoId: number, userId: number) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) throw new CustomError(404, "todo not found");

    if (todo.created_by === userId)
      throw new CustomError(401, "unauthorised action");

    const result = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
