import UserRepository from "../domain/repositories/UserRepository";
import User from "../domain/entities/User";

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default async function createUser(
  userRepository: UserRepository,
  name: string,
  email: string,
  password: string
): Promise<User> {
  const id = generateUniqueId();
  const newUser = new User(
    id,
    name,
    email.toLowerCase(),
    password,
    new Date(),
    new Date()
  );
  return await userRepository.create(newUser);
}
