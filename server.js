import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.listen(process.env.PORT || 8000, () => {
  console.log("backend server is running");
});

app.get("/api/test", () => {
  console.log("test is successfull");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to mongoDB");
} catch (error) {
  console.log(error);
}
