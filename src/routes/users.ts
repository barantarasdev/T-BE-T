import express from "express";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";
import { users } from "../database/users";
import { ERRORS } from "../constants/errors";
import { validateCreateUser, validateFindUser } from "../validation";

const usersRoutes = express.Router();

usersRoutes.get("/", (_, res) => {
  res.status(200).send(users);
});

usersRoutes.get("/:id", ({ params }, res) => {
  const validatedUser = validateFindUser(res, params.id);

  if (validatedUser) {
    res.status(200).send(validatedUser.user);
  }
});

usersRoutes.post("/", async ({ body }, res) => {
  const validatedUser = validateCreateUser(res, body);

  if (validatedUser) {
    const { name, email, password } = body;
    const user = {
      id: uuid(),
      name,
      email,
    };
    const hashedPassword: string = await bcrypt.hash(password, 10);

    users.push({ ...user, password: hashedPassword });
    res.status(201).send({ message: ERRORS.USER_CREATED });
  }
});

usersRoutes.put("/:id", ({ params, body }, res) => {
  const validatedUser = validateFindUser(res, params.id);

  if (validatedUser) {
    const { index, user } = validatedUser;

    users[index] = { ...user, ...body };
    res.status(201).send({ message: ERRORS.USER_CHANGED });
  }
});

usersRoutes.patch("/:id", ({ params, body }, res) => {
  const validatedUser = validateFindUser(res, params.id);

  if (validatedUser) {
    const { index, user } = validatedUser;

    users[index] = { ...user, ...body };
    res.status(200).send({ message: ERRORS.USER_CHANGED });
  }
});

usersRoutes.delete("/:id", ({ params }, res) => {
  const validatedUser = validateFindUser(res, params.id);

  if (validatedUser) {
    users.splice(validatedUser.index, 1);
    res.status(200).send({ message: ERRORS.USER_REMOVED });
  }
});

export default usersRoutes;
