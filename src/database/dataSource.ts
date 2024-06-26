import "reflect-metadata";
import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";

configDotenv();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_LOCAL_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  entities: ["./src/database/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
});
