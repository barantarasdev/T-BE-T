import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import { cors } from "./middleware/cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log("Welcome to T-BE-T 🚀");
});
