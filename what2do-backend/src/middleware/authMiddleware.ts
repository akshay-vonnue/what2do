import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export type AuthenticatedRequest = Request & {
  userId: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const user = verifyToken(token);
    (req as AuthenticatedRequest).userId = Number(user.userId);
    next();
  } catch (error) {
    next(error);
  }
};
