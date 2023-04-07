import UserRepository from "../domain/repositories/UserRepository";
import User from "../domain/entities/User";

export default async function updateUser(
  userRepository: UserRepository,
  id: string,
  name: string,
  email: string,
  password: string
): Promise<User> {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = new User(
    id,
    name,
    email.toLowerCase(),
    password,
    user.createdAt,
    new Date()
  );

  return await userRepository.update(updatedUser);
}
