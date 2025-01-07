import { error } from "console";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/35`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/75`;

    const newUser = new User({
      fullName,
      username,
      password,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    res.status(201).json({
      message: "User is successfully created.",
      user: {
        _id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  console.log("login route");
};

export const logout = (req, res) => {
  res.send("logout");
};
