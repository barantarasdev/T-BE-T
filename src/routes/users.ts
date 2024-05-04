import express from "express";
import * as bcrypt from "bcrypt";
import { MESSAGES } from "../constants/errors";
import { validateCreateUser, validateFindUser } from "../validation";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../database/queries/users";

const usersRoutes = express.Router();

usersRoutes.get("/", async (_, res) => {
  const users = await getUsers();

  res.status(200).send(users.rows);
});

usersRoutes.get("/:id", async ({ params }, res) => {
  const validatedUser = await validateFindUser(res, params.id);

  if (validatedUser) {
    res.status(200).send(validatedUser);
  }
});

usersRoutes.post("/", async ({ body }, res) => {
  const validatedUser = validateCreateUser(res, body);

  if (validatedUser) {
    const { name, email, password } = body;
    const user = {
      name,
      email,
    };
    const hashedPassword: string = await bcrypt.hash(password, 10);

    await createUser({ ...user, password: hashedPassword });
    res.status(201).send({ message: MESSAGES.USER_CREATED });
  }
});

usersRoutes.put("/:id", async ({ params, body }, res) => {
  const validatedUser = await validateFindUser(res, params.id);

  if (validatedUser) {
    await updateUser({ ...validatedUser, ...body });
    res.status(201).send({ message: MESSAGES.USER_CHANGED });
  }
});

usersRoutes.patch("/:id", async ({ params, body }, res) => {
  const validatedUser = await validateFindUser(res, params.id);

  if (validatedUser) {
    await updateUser({ ...validatedUser, ...body });
    res.status(200).send({ message: MESSAGES.USER_CHANGED });
  }
});

usersRoutes.delete("/:id", async ({ params }, res) => {
  const validatedUser = await validateFindUser(res, params.id);

  if (validatedUser) {
    await deleteUser(params.id);
    res.status(200).send({ message: MESSAGES.USER_REMOVED });
  }
});

export default usersRoutes;
