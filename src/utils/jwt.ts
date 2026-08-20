import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import type { JwtPayload } from "../types/auth.types.js";

export function signAccessToken(payload: JwtPayload): string {
  const options = {
    ...(env.JWT_EXPIRES_IN ? { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] } : {}),
  } as SignOptions;

  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  const payload = jwt.verify(token, env.JWT_SECRET);

  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof payload.sub !== "string" ||
    typeof payload.email !== "string"
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    sub: payload.sub,
    email: payload.email,
  };
}