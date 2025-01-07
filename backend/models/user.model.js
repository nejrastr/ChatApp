import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  gender: {
    type: String,
  },
  profilePic: {
    required: true,
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
