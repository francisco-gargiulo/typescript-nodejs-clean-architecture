import MemoryUserRepository from "../adapters/memory/MemoryUserRepository";
import deleteUser from "../usecases/deleteUser";
import createUser from "../usecases/createUser";

describe("Use case: delete", () => {
  let userRepository: MemoryUserRepository;

  beforeAll(() => {
    userRepository = new MemoryUserRepository();
  });

  it("should delete an existing user", async () => {
    const name = "John";
    const email = "john@example.com";
    const password = "password";
    const newUser = await createUser(userRepository, name, email, password);
    await deleteUser(userRepository, newUser.id);
    const deletedUser = await userRepository.findById(newUser.id);
    expect(deletedUser).toBeNull();
  });
});