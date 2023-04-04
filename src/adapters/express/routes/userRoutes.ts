// src/adapters/express/routes/userRoutes.ts

import { Router } from "express";

import CreateUser from "../../../useCases/CreateUser";
import GetUser from "../../../useCases/GetUser";
import UpdateUser from "../../../useCases/UpdateUser";
import DeleteUser from "../../../useCases/DeleteUser";

import { MemoryUserRepository } from "../../memory/MemoryUserRepository";

const userRepository = new MemoryUserRepository();
const createUser = new CreateUser(userRepository);
const getUser = new GetUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser.execute(name, email, password);
  res.status(201).json(user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser.execute(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const updatedUser = await updateUser.execute(id, name, email, password);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteUser.execute(id);
  res.status(204).json();
});

export default router;
