import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const signToken = (payload: { userId: number }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "4hr",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc5MTk0ODEwNywiZXhwIjoxNzkxOTYyNTA3fQ.ULJdTIUXbVM-EY-9SyfM5kaDCF0_JtlMJ5dpvk3t_LQ"))