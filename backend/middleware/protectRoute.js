import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json("Unauthorized - Missing token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json("Invalid token");
    }

    const user = await User.findById(decoded.userId).select("-username");

    if (!user) {
      res.status(401).json("Unauthorized - User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route function", error.message);
    res.status(500).json("Internal Server Error");
  }
};

export default protectRoute;
