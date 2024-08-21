import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
