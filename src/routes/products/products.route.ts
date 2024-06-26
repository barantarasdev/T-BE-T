import express from "express";
import ProductsService from "./products.service";
import { verifyAccessToken } from "../../middleware/verifyAccessToken";

const productsRoutes = express.Router();
const productsService = new ProductsService();

productsRoutes.use(verifyAccessToken);

productsRoutes.get("/", async (_, res) => {
  res.status(200).send(await productsService.getAllProducts());
});

productsRoutes.get("/search", async ({ body }, res) => {
  res.status(200).send(await productsService.searchProducts(body));
});

productsRoutes.post("/", async ({ body }, res) => {
  res.status(201).send(await productsService.createProduct(body));
});

export default productsRoutes;
