import UserRepository from "../domain/repositories/UserRepository";
import User from "../domain/entities/User";

export default async function readUser(
  userRepository: UserRepository,
  id: string
): Promise<User> {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
