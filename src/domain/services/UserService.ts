// src/domain/services/UserService.ts

import { User } from "../entities/User";

export interface UserService {
  getUserById(id: string): Promise<User | null>;
  createUser(name: string, email: string, password: string): Promise<User>;
  updateUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
