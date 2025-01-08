import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectToDB from "./db/connect.js";
import { signup } from "./controllers/auth.controller.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("this works");
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); //midleware

connectToDB();
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
