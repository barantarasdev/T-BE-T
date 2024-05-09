import express from "express";
import { getMessage } from "../constants/messages";
import { createFactory } from "../database/queries/factories";

const factoriesRoutes = express.Router();

factoriesRoutes.post("/", async ({ body }, res) => {
  const { name } = body;

  await createFactory({ name });
  res.status(201).send({ message: getMessage("Factory").CREATED });
});

export default factoriesRoutes;
