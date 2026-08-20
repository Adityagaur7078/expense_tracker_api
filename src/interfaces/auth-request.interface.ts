import type { Request } from "express";
import type { AuthUser } from "../types/auth.types.js";

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
