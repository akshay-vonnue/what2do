import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { loginUserController, registerUserController } from "./auth.controller";

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  registerUserController(req, res).catch(next),
);

router.post("/login",(req: Request, res: Response, next: NextFunction) =>
  loginUserController(req, res).catch(next),
)

export default router;
