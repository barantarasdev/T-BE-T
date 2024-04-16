import { NextFunction, Request, Response } from "express";

export function cors(_: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOW_URL || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    process.env.ALLOW_METHODS || "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    process.env.ALLOW_CONTENT_HEADERS || "Content-type",
  );
  next();
}
