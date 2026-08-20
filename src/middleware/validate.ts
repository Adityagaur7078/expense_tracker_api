import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ZodType } from "zod";
import { AppError } from "../errors/app.error.js";

export function validateBody<T extends Record<string, unknown>>(schema: ZodType<T>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(new AppError("Validation failed", 400, result.error.flatten().fieldErrors));
      return;
    }

    req.body = result.data as typeof req.body;
    next();
  };
}

export function validateParams<T extends ParamsDictionary>(schema: ZodType<T>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      next(new AppError("Invalid route parameters", 400, result.error.flatten().fieldErrors));
      return;
    }

    req.params = result.data as T;
    next();
  };
}
