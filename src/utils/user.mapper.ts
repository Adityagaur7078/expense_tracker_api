import type { UserDocument } from "../models/user.model.js";
import type { AuthUser } from "../types/auth.types.js";

export function mapUser(document: UserDocument & { _id: unknown }): AuthUser {
  return {
    id: String(document._id),
    email: document.email
  };
}
