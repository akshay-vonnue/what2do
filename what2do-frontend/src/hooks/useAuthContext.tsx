import { createContext, useContext } from "react";

export type UserInAuthContext = {
  id: string;
  name: string;
  email: string;
};

export const AuthContext = createContext<UserInAuthContext | undefined>(
  undefined,
);

export function useAuthContext() {
  const user = useContext(AuthContext);
  console.log(user);
  if (user === undefined)
    throw new Error("useAuthContext can't be used with Authcontext");
  return user;
}
