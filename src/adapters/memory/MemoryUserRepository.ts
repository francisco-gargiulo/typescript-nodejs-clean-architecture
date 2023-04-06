// src/adapters/memory/MemoryUserRepository.ts

import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export default class MemoryUserRepository implements UserRepository {
  users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      throw new Error("User not found");
    }

    this.users[index] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new Error("User not found");
    }

    this.users.splice(index, 1);
  }
}
