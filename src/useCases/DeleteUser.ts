// src/useCases/DeleteUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";

export default class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
