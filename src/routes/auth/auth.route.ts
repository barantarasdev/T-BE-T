import express from "express";
import AuthService from "./auth.service";
import {
  CustomRequest,
  verifyAccessToken,
} from "../../middleware/verifyAccessToken";
import { validateRegisterData } from "./validate/validate.register";
import { validationResult } from "express-validator";
import { verifyRefreshToken } from "../../middleware/verifyRefreshToken";

const authRoutes = express.Router();
const authService = new AuthService();

authRoutes.post(
  "/register",
  validateRegisterData,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ message: errors.array()[0].msg });
    }

    return res.status(201).send(await authService.register(req.body));
  },
);

authRoutes.post("/login", async ({ body }, res) => {
  return res.status(200).send(await authService.login(body));
});

authRoutes.get(
  "/refresh",
  verifyRefreshToken,
  async (req: CustomRequest, res) => {
    return res
      .status(200)
      .send(await authService.refreshToken(req.user?.refreshToken || ""));
  },
);

authRoutes.post("/logout", async ({ body }, res) => {
  return res.status(200).send(await authService.logout(body));
});

export default authRoutes;
