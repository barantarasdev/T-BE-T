import express from "express";
import FactoriesService from "./factories.service";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";

const factoriesRoutes = express.Router();
const factoriesService = new FactoriesService();

factoriesRoutes.use(verifyAccessToken);

factoriesRoutes.post("/", async ({ body }, res) => {
  return res.status(201).send(await factoriesService.createFactory(body));
});

export default factoriesRoutes;
