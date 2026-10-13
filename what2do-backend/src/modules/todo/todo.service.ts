import type { Todo, TodoStatus } from "../../generated/prisma/client";
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
    console.log(error);
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
  console.log("data:",data);
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) throw new CustomError(404, "todo not found");

    console.log(typeof todo.created_by, typeof userId);

    if (todo.created_by !== userId) throw new CustomError(401, "unauthorised action");

    const result = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...data,
      },
    });
    console.log(result)
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoService = async (todoId: number, userId: number) => {
  console.log("deleteTodoService", todoId, typeof todoId);
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    console.log(todo);

    if (!todo) throw new CustomError(404, "todo not found");

    if (todo.created_by !== userId)
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

export const updateTodoStatusService = async (
  todoId: number,
  userId: number,
  status: string,
) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) throw new CustomError(404, "todo not found");

    if (!todo) throw new CustomError(404, "todo not found");

    if (todo.created_by !== userId)
      throw new CustomError(401, "unauthorised action");

    const result = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        status: status as TodoStatus,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
