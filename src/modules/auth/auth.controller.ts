import type { Request, Response } from "express";
import { loginUserService, registerUserService } from "./auth.service";

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
