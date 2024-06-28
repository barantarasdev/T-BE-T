import express from "express";
import UsersService from "./users.service";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";

const usersRoutes = express.Router();
const usersService = new UsersService();

usersRoutes.use(verifyAccessToken);

usersRoutes.get("/", async (_, res) => {
  return res.status(200).send(await usersService.getUsers());
});

usersRoutes.get("/:id", async ({ params }, res) => {
  return res.status(200).send(await usersService.getUserById(params.id));
});

usersRoutes.put("/:id", async ({ params, body }, res) => {
  return res.status(201).send(await usersService.updateUser(params.id, body));
});

export default usersRoutes;
