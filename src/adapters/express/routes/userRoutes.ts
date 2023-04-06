import { Router } from "express";

import MemoryUserRepository from "../../memory/MemoryUserRepository";

import createUser from "../../../useCases/createUser";
import getUser from "../../../useCases/getUser";
import deleteUser from "../../../useCases/deleteUser";
import updateUser from "../../../useCases/updateUser";

const userRepository = new MemoryUserRepository();

const createUserUseCase = createUser(userRepository);
const getUserUseCase = getUser(userRepository);
const deleteUserUseCase = deleteUser(userRepository);
const updateUserUseCase = updateUser(userRepository);

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUserUseCase(name, email, password);
  res.status(201).json(user);
});

router.get("/:id", async ({ params: { id } }, res) => {
  try {
    const user = await getUserUseCase(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

router.put(
  "/:id",
  async ({ params: { id }, body: { name, email, password } }, res) => {
    try {
      const updatedUser = await updateUserUseCase(id, name, email, password);
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }
);

router.delete("/:id", async ({ params: { id } }, res) => {
  try {
    await deleteUserUseCase(id);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
