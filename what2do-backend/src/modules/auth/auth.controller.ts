import type { Request, Response } from "express";
import {
  loginUserService,
  meService,
  registerUserService,
} from "./auth.service";
import type { AuthenticatedRequest } from "../../middleware/authMiddleware";

export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await registerUserService(name, email, password);
  return res.status(200).json(result);
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUserService(email, password);
  return res.status(200).json(result);
};

export const meController = async (req: Request, res: Response) => {
  console.log((req as AuthenticatedRequest).userId);
  const result = await meService((req as AuthenticatedRequest).userId);
  return res.status(200).json(result);
};
