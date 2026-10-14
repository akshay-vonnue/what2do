import express, { type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

import authRouter from "./modules/auth/auth.router";
import todoRouter from "./modules/todo/todo.router";
import { ErrorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(helmet());
app.use(cors({
  origin:'http://localhost:5173'
}));

app.use("/health", (req:Request,res:Response) => {
  res.status(200).json({
    message:"ok"
  })
})

app.use(express.json());

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("server running on port:", process.env.PORT);
});
