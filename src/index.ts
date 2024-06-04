import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import { cors } from "./middleware/cors";
import productsRoutes from "./routes/products";
import factoriesRoutes from "./routes/factories";
import AppDataSource from "./database/data-source";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/factories", factoriesRoutes);

AppDataSource.initialize()
.then(async () => {
  app.listen(process.env.PORT);
})
.catch((error) => console.log(error));