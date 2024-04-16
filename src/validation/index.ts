import { Response } from "express";
import { ERRORS } from "../constants/errors";
import { users } from "../database/users";
import { User } from "../types";

export function validateCreateUser(
  res: Response,
  { email, name, password }: Omit<User, "id">,
) {
  if (!email || !name || !password) {
    res.status(400).send({ message: ERRORS.USER_REQUIRED });

    return false;
  }

  return true;
}

export function validateFindUser(res: Response, id: string) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).send({ message: ERRORS.USER_NOT_FOUND });

    return false;
  }

  return { index, user: users[index] };
}
