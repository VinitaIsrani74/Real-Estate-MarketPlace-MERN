import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoute.js";
import authRouter from "./Routes/authRoute.js";

dotenv.config();

const app = express();

app.use(express.json())
mongoose
  .connect(process.env.DB)
  .then(() =>{ console.log("database connected")})
  .catch((error) => console.log(error));
app.listen(5000, () => {
  console.log("server running");
});

//routes
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)