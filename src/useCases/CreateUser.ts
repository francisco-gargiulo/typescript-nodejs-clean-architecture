// src/useCases/CreateUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/entities/User";

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const id = generateUniqueId();
    const createdAt = new Date();
    const updatedAt = new Date();
    const newUser = new User(id, name, email, password, createdAt, updatedAt);

    return await this.userRepository.create(newUser);
  }
}
