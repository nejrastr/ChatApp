import User from "../models/user.model.js";

export const getUsers = async () => {
  try {
    const loggedUser = req.user._id;
    const allUsersFromDB = await User.find().select("-password");

    return response.status(200).json(allUsersFromDB);
  } catch (error) {
    console.log("Error in get users", error.message);
    resizeBy.status(500).json("Internal sERVER eRROR");
  }
};
