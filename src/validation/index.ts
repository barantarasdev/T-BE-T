import { Response } from "express";
import { User } from "../types";
import { getUserById } from "../database/queries/users";
import { getMessage } from "../constants/messages";

export function validateCreateUser(
  res: Response,
  { email, name, password }: Omit<User, "id">,
) {
  if (!email) {
    res.status(400).send({ message: getMessage("EMAIL").REQUIRED });

    return false;
  }

  if (!name) {
    res.status(400).send({ message: getMessage("NAME").REQUIRED });

    return false;
  }

  if (!password) {
    res.status(400).send({ message: getMessage("PASSWORD").REQUIRED });

    return false;
  }

  return true;
}

export async function validateFindUser(res: Response, id: string) {
  const user = await getUserById(id);

  if (!user) {
    res.status(404).send({ message: getMessage().NOT_FOUND });

    return false;
  }

  return user.rows[0];
}
