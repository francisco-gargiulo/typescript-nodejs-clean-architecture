import UserRepository from "../domain/repositories/UserRepository";

export default async function deleteUser(
  userRepository: UserRepository,
  id: string
): Promise<void> {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  await userRepository.delete(id);
}
