import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/Error";

export const ErrorHandler = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
    
    return res.status(500).json({
        message:'internal server error'
    })
};
