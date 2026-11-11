import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  updateTodoController,
  updateTodoStatusController,
} from "./todo.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    createTodoController(req, res).catch(next),
);

router.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    getAllTodoController(req, res).catch(next),
);

router.patch(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    updateTodoController(req, res).catch(next),
);

router.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    deleteTodoController(req, res).catch(next),
);

router.patch(
  "/:id/status",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    updateTodoStatusController(req, res).catch(next),
);

export default router;
