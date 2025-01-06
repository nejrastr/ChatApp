const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello!!!!!!!!!!!!");
});

app.listen(PORT, () => console.log("Server is running on port 5000"));
