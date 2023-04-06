// src/useCases/DeleteUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";

export default function deleteUser(userRepository: UserRepository) {
  return async (id: string): Promise<void> => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await userRepository.delete(id);
  };
}
