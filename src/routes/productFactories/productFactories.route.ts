import express from "express";
import ProductFactoriesService from "./productFactories.service";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";

const productFactoriesRoutes = express.Router();
const productsService = new ProductFactoriesService();

productFactoriesRoutes.use(verifyAccessToken);

productFactoriesRoutes.post("/", async ({ body }, res) => {
  res.status(201).send(productsService.createProductFactory(body));
});

export default productFactoriesRoutes;
