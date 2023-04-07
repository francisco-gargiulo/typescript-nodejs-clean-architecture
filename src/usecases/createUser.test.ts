import createUser from "../usecases/createUser";
import User from "../domain/entities/User";
import MemoryUserRepository from "../adapters/memory/MemoryUserRepository";

describe("Use case: create", () => {
  let userRepository: MemoryUserRepository;

  beforeAll(() => {
    userRepository = new MemoryUserRepository();
  });

  it("should create a new user", async () => {
    const name = "John";
    const email = "john@example.com";
    const password = "password";
    const newUser = await createUser(userRepository, name, email, password);
    expect(newUser).toBeInstanceOf(User);
    expect(newUser.id).toBeTruthy();
    expect(newUser.name).toBe(name);
    expect(newUser.email).toBe(email.toLowerCase());
  });
});