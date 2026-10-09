import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const signToken = (payload: { userId: number }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1hr",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
