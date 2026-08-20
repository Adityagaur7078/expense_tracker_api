import { AppError } from "../errors/app.error.js";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";
import type { AuthUser } from "../types/auth.types.js";
import { signAccessToken } from "../utils/jwt.js";
import { mapUser } from "../utils/user.mapper.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export async function register(email: string, password: string): Promise<{ user: AuthUser; token: string }> {
  const existing = await findUserByEmail(email);

  if (existing) {
    throw new AppError("Email already registered", 409);
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser(email, passwordHash);
  const authUser = mapUser(user);
  const token = signAccessToken({ sub: authUser.id, email: authUser.email });

  return { user: authUser, token };
}

export async function login(email: string, password: string): Promise<{ user: AuthUser; token: string }> {
  const user = await findUserByEmail(email);

  if (!user || !user.passwordHash) {
    throw new AppError("Invalid email or password", 401);
  }

  const valid = await comparePassword(password, user.passwordHash);

  if (!valid) {
    throw new AppError("Invalid email or password", 401);
  }

  const authUser = mapUser(user);
  const token = signAccessToken({ sub: authUser.id, email: authUser.email });

  return { user: authUser, token };
}
