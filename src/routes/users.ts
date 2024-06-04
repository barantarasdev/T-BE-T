import express from "express";
import { validateFindUser } from "../validation";
import { getMessage } from "../constants/messages";

const usersRoutes = express.Router();

usersRoutes.get("/", async (_, res) => {
  // const users = await getUsers();

  // res.status(200).send(users.rows);

  res.status(200).send([]);
});

usersRoutes.get("/:id", async ({ params }, res) => {
  const validatedUser = await validateFindUser(res, params.id);

  if (validatedUser) {
    res.status(200).send(validatedUser);
  }
});

usersRoutes.post("/", async ({ body }, res) => {
  // const validatedUser = validateCreateUser(res, body);

  // if (validatedUser) {
  //   const { name, email, password } = body;
  //   const user = {
  //     name,
  //     email,
  //   };
  //   const hashedPassword: string = await bcrypt.hash(password, 10);

  //   await createUser({ ...user, password: hashedPassword });
  //   res.status(201).send({ message: getMessage().CREATED });
  // }

  res.status(201).send({ message: getMessage().CREATED });
});

usersRoutes.put("/:id", async ({ params, body }, res) => {
  // const validatedUser = await validateFindUser(res, params.id);

  // if (validatedUser) {
  //   await updateUser({ ...validatedUser, ...body });
  //   res.status(201).send({ message: getMessage().CHANGED });
  // }

  res.status(201).send({ message: getMessage().CHANGED });
});

usersRoutes.patch("/:id", async ({ params, body }, res) => {
  // const validatedUser = await validateFindUser(res, params.id);

  // if (validatedUser) {
  //   await updateUser({ ...validatedUser, ...body });
  //   res.status(200).send({ message: getMessage().CHANGED });
  // }

  res.status(200).send({ message: getMessage().CHANGED });
});

usersRoutes.delete("/:id", async ({ params }, res) => {
  // const validatedUser = await validateFindUser(res, params.id);

  // if (validatedUser) {
  //   await deleteUser(params.id);
  //   res.status(200).send({ message: getMessage().REMOVED });
  // }
  res.status(200).send({ message: getMessage().REMOVED });
});

export default usersRoutes;
