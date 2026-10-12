import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { createTodoService } from "./todo.service";

export const createTodoController = async (req: Request, res: Response) => {
  const { title, description, scheduled_at } = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const result = await createTodoService(
    title,
    description,
    scheduled_at,
    userId,
  );

  return res.status(201).json(result);
};
