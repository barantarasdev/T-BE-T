import express from "express";
import FactoriesService from "./factories.service";

const factoriesRoutes = express.Router();
const factoriesService = new FactoriesService();

factoriesRoutes.post("/", async ({ body }, res) => {
  return res.status(201).send(await factoriesService.createFactory(body));
});

export default factoriesRoutes;
