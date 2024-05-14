import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoute.js";
import authRouter from "./Routes/authRoute.js";
import cookieParser from "cookie-parser";
import listingRoute from "./Routes/listingRoute.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())
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
app.use("/api/listing", listingRoute)

//error handling
app.use((err,req,res,next) =>{
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})