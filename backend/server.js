import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

import connectToDB from "./db/connect.js";
import { signup } from "./controllers/auth.controller.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("this works");
});
app.use(express.json());
app.use("/api/auth", authRoutes); //midleware

connectToDB();
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
