import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running");
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to mongoDB");
} catch (error) {
  console.log(error);
}
