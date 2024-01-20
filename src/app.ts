import express from "express";
import { userRouter, chatRouter } from "./components";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);

export default app;
