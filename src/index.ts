import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { cors } from "./middleware/cors";
import { AppDataSource } from "./database/dataSource";
import productFactoriesRoutes from "./routes/productFactories/productFactories.route";
import usersRoutes from "./routes/users/users.route";
import productsRoutes from "./routes/products/products.route";
import factoriesRoutes from "./routes/factories/factories.route";
import logger from "./logger";
import authRoutes from "./routes/auth/auth.route";

export function errorHandler(
  err: Error & { statusCode: number | undefined },
  _: Request,
  res: Response,
  _2: NextFunction,
) {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
}

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

app.use(errorHandler);
