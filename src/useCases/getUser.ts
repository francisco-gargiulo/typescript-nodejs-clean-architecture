// src/useCases/GetUser.ts

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/entities/User";

export default function getUser(userRepository: UserRepository) {
  return async (id: string): Promise<User> => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  };
}
