import express from "express";
import morgan from "morgan";
import config from "./config/index.js";
import { errors } from "./messages/errors.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration
app.set("port", config.app.port);

// Routes
app.use("/", router);
app.use(errors);

export default app;
