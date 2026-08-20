import { UserModel } from "../models/user.model.js";

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email }).select("+passwordHash").exec();
}

export async function createUser(email: string, passwordHash: string) {
  return UserModel.create({ email, passwordHash });
}
