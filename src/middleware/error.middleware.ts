import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";
import { AppError } from "../errors/app.error.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      data: null,
      error: error.message,
      ...(error.details !== undefined ? { details: error.details } : {})
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    data: null,
    error: env.NODE_ENV === "production" ? "Internal Server Error" : "Unexpected server error"
  });
};
