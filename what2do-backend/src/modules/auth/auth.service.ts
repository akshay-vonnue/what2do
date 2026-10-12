import { CustomError } from "../../utils/Error";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import type { User } from "../../generated/prisma/client";
import { signToken } from "../../utils/jwt";

function toSafeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isExistingUser) {
      throw new CustomError(409, "user already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUserService = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new CustomError(404, "user not found");

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) throw new CustomError(401, "invalid credentials");

    const token = await signToken({ userId: user.id });
    return {
      user: toSafeUser(user),
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const meService = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new CustomError(404, "user not found");

    return toSafeUser(user);
  } catch (error) {
    // console.log(error)
    throw error;
  }
};
