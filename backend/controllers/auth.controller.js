import { error, profileEnd } from "console";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/generateToken.js";
import mongoose from "mongoose";

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

    const salt = await bcrypt.genSalt(10);

    const hashedPasword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/35`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/75`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPasword,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    generateTokenAndCookie(newUser._id, res);
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
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user) {
      res
        .status(400)
        .json({ message: "User with this username does not exist." });
    } else if (!isPasswordCorrect) {
      res.status(400).json({ message: "Wrong password" });
    }
    generateTokenAndCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.usernam,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout controller:", error.message);
    res.status(500).json("Internal Server Error");
  }
};
