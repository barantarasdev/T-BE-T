import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { cors } from "./middleware/cors";
import { AppDataSource } from "./database/dataSource";
import productFactoriesRoutes from "./routes/productFactories/productFactories.route";
import usersRoutes from "./routes/users/users.route";
import productsRoutes from "./routes/products/products.route";
import factoriesRoutes from "./routes/factories/factories.route";
import logger from "./logger";
import authRoutes from "./routes/auth/auth.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/factories", factoriesRoutes);
app.use("/productFactories", productFactoriesRoutes);
app.use("/auth", authRoutes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.LOCAL_PORT);
  })
  .catch((error) => logger.info(error));
