import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/authMiddleware";
import {
  createTodoService,
  deleteTodoService,
  getAllTodoService,
  updateTodoService,
  updateTodoStatusService,
} from "./todo.service";

export const createTodoController = async (req: Request, res: Response) => {
  const { title, description, scheduled_at } = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const result = await createTodoService(
    title,
    description,
    new Date(scheduled_at),
    userId,
  );

  return res.status(201).json(result);
};

export const getAllTodoController = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;

  const result = await getAllTodoService(userId);
  return res.status(200).json(result);
};

export const updateTodoController = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const todoId = Number(req.params.id);

  console.log("body:",req.body,userId,todoId)
  const result = await updateTodoService(req.body, userId, todoId);
  return res.status(200).json(result);
};

export const deleteTodoController = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const todoId = Number(req.params.id);

  const result = await deleteTodoService(todoId, userId);
  return res.status(200).json(result);
};

export const updateTodoStatusController = async (
  req: Request,
  res: Response,
) => {
  const userId = (req as AuthenticatedRequest).userId;
  const todoId = Number(req.params.id);
  const { status } = req.body;

  const result = await updateTodoStatusService(userId, todoId, status);
  return res.status(200).json(result);
};
