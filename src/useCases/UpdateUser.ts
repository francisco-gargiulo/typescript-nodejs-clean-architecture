// src/useCases/UpdateUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/entities/User";

export default class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.updatedAt = new Date();

    return await this.userRepository.update(user);
  }
}
