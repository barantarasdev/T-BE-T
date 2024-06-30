import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getMessage } from "../constants/messages";
import { BadRequestError } from "../error";

export interface CustomRequest extends Request {
  user?: { [key: string]: string };
}

export function verifyRefreshToken(
  req: CustomRequest,
  _: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new BadRequestError(getMessage("token").NOT_PROVIDED);
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
    ) as { userId: string; refreshToken: string };

    req.user = {
      userId: decodedToken.userId,
      refreshToken: token,
    };

    next();
  } catch (error) {
    throw new BadRequestError(getMessage("token").INVALID);
  }
}
