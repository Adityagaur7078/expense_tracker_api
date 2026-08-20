import type { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http.js";
import { login, register } from "../services/auth.service.js";
import type { ApiResponse } from "../types/api.types.js";
import type { AuthUser } from "../types/auth.types.js";

type AuthResponse = {
  user: AuthUser;
  token: string;
};

export async function registerUser(
  req: Request,
  res: Response<ApiResponse<AuthResponse>>
): Promise<void> {
  const result = await register(
    req.body.email,
    req.body.password
  );

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: result,
  });
}

export async function loginUser(
  req: Request,
  res: Response<ApiResponse<AuthResponse>>
): Promise<void> {
  const result = await login(
    req.body.email,
    req.body.password
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: result,
  });
}