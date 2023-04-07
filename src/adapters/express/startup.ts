import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/", routes);

export default app;
