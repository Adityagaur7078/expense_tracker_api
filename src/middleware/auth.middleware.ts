import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const header = req.header("authorization");

  if (!header?.startsWith("Bearer ")) {
    next(new AppError("Authentication required", 401));
    return;
  }

  try {
    const token = header.slice("Bearer ".length);
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
}