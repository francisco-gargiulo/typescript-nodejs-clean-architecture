import { Router } from "express";
import MemoryUserRepository from "../memory/MemoryUserRepository";
import createUser from "../../usecases/createUser";
import deleteUser from "../../usecases/deleteUser";
import readUser from "../../usecases/readUser";
import updateUser from "../../usecases/updateUser";

const userRepository = new MemoryUserRepository();

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser(userRepository, name, email, password);
  res.status(201).json(user);
});

router.get("/:id", async ({ params: { id } }, res) => {
  try {
    const user = await readUser(userRepository, id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

router.put(
  "/:id",
  async ({ params: { id }, body: { name, email, password } }, res) => {
    try {
      const updatedUser = await updateUser(
        userRepository,
        id,
        name,
        email,
        password
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }
);

router.delete("/:id", async ({ params: { id } }, res) => {
  try {
    await deleteUser(userRepository, id);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
