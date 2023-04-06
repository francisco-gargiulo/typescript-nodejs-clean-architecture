// src/useCases/CreateUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/entities/User";

export default function createUser(userRepository: UserRepository) {
  function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  return async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const id = generateUniqueId();
    const createdAt = new Date();
    const updatedAt = new Date();
    const newUser = new User(id, name, email, password, createdAt, updatedAt);
    return await userRepository.create(newUser);
  };
}
