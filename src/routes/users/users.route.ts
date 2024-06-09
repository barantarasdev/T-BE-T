import express from "express";
import UsersService from "./users.service";

const usersRoutes = express.Router();
const usersService = new UsersService();

usersRoutes.get("/", async (_, res) => {
  return res.status(200).send(await usersService.getUsers());
});

usersRoutes.get("/:id", async ({ params }, res) => {
  return res.status(200).send(await usersService.getUserById(params.id));
});

usersRoutes.post("/", async ({ body }, res) => {
  return res.status(201).send(await usersService.createUser(body));
});

usersRoutes.put("/:id", async ({ params, body }, res) => {
  return res.status(201).send(await usersService.updateUser(params.id, body));
});

usersRoutes.delete("/:id", async ({ params }, res) => {
  return res.status(200).send(await usersService.deleteUser(params.id));
});

export default usersRoutes;
