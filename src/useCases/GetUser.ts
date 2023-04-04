// src/useCases/GetUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/entities/User";

export default class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}
