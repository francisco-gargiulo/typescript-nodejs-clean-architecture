// src/adapters/express/startup.ts

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/users", userRoutes);

export default app;
