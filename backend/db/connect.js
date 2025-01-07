import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(
      "Error while trying to connect to the database:",
      error.message
    );
  }
};

export default connectToDB;
