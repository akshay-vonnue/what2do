import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { loginUserController, registerUserController } from "./auth.controller";
import { rateLimit } from "express-rate-limit";

const router = Router();

const rateLimiter = rateLimit({
  max: 5,
  windowMs: 15 * 60 * 1000,
});

router.post(
  "/register",
  rateLimiter,
  (req: Request, res: Response, next: NextFunction) =>
    registerUserController(req, res).catch(next),
);

router.post(
  "/login",
  rateLimiter,
  (req: Request, res: Response, next: NextFunction) =>
    loginUserController(req, res).catch(next),
);

export default router;
