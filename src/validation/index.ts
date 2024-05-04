import { Response } from "express";
import { MESSAGES } from "../constants/errors";
import { User } from "../types";
import { getUserById } from "../database/queries/users";

export function validateCreateUser(
  res: Response,
  { email, name, password }: Omit<User, "id">,
) {
  if (!email || !name || !password) {
    res.status(400).send({ message: MESSAGES.USER_REQUIRED });

    return false;
  }

  return true;
}

export async function validateFindUser(res: Response, id: string) {
  const user = await getUserById(id);

  if (!user) {
    res.status(404).send({ message: MESSAGES.USER_NOT_FOUND });

    return false;
  }

  return user.rows[0];
}
