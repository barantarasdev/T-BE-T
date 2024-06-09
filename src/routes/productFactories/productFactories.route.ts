import express from "express";
import ProductFactoriesService from "./productFactories.service";

const productFactoriesRoutes = express.Router();
const productsService = new ProductFactoriesService();

productFactoriesRoutes.post("/", async ({ body }, res) => {
  res.status(201).send(productsService.createProductFactory(body));
});

export default productFactoriesRoutes;
