import readUser from "../usecases/readUser";
import createUser from "../usecases/createUser";
import User from "../domain/entities/User";
import MemoryUserRepository from "../adapters/memory/MemoryUserRepository";

describe("User use cases", () => {
  let userRepository: MemoryUserRepository;

  beforeAll(() => {
    userRepository = new MemoryUserRepository();
  });

  it("should read an existing user", async () => {
    const name = "John";
    const email = "john@example.com";
    const password = "password";
    const newUser = await createUser(userRepository, name, email, password);
    const existingUser = await readUser(userRepository, newUser.id);
    expect(existingUser).toBeInstanceOf(User);
    expect(existingUser.id).toBe(newUser.id);
    expect(existingUser.name).toBe(name);
    expect(existingUser.email).toBe(email.toLowerCase());
  });
});
