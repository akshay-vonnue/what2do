import express from "express";
import helmet from "helmet";
import cors from 'cors'
import "dotenv/config";

import authRouter from "./modules/auth/auth.router";
import { ErrorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors())
app.use(helmet());
app.use(express.json());

app.use("/auth", authRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("server running on port:", process.env.PORT);
});
