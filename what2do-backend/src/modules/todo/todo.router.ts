import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createTodoController } from "./todo.controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) =>
  createTodoController(req, res).catch(next),
);

export default router;
