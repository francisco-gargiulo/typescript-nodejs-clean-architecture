import updateUser from "../usecases/updateUser";
import createUser from "../usecases/createUser";
import User from "../domain/entities/User";
import MemoryUserRepository from "../adapters/memory/MemoryUserRepository";

describe("User use cases", () => {
  let userRepository: MemoryUserRepository;

  beforeAll(() => {
    userRepository = new MemoryUserRepository();
  });

  it("should update an existing user", async () => {
    const name = "John";
    const email = "john@example.com";
    const password = "password";
    const newUser = await createUser(userRepository, name, email, password);
    const newName = "John Doe";
    const newEmail = "johndoe@example.com";
    const newPassword = "newpassword";
    const updatedUser = await updateUser(
      userRepository,
      newUser.id,
      newName,
      newEmail,
      newPassword
    );
    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.id).toBe(newUser.id);
    expect(updatedUser.name).toBe(newName);
    expect(updatedUser.email).toBe(newEmail.toLowerCase());
  });
});
