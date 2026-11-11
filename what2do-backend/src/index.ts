import express, { type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import path from "node:path";

import authRouter from "./modules/auth/auth.router";
import todoRouter from "./modules/todo/todo.router";
import { ErrorHandler } from "./middleware/errorHandler";

export const app = express();

const __dirname = path.resolve()

console.log(process.env.VITE_API_BASE_URL,process.env.JWT_SECRET)

app.use(helmet());
app.use(
  cors({
    origin: '*',
  }),
);

app.use("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "ok",
  });
});

app.use(express.json());

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.use(ErrorHandler);

// app.use(express.static(path.join(__dirname, "../what2do-frontend/dist")))
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname,"../what2do-frontend","dist","index.html"))
// })

app.listen(process.env.PORT, () => {
  console.log("server running on port:", process.env.PORT);
});

export default app;
