import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
mongoose
  .connect(process.env.DB)
  .then(() =>{ console.log("database connected")})
  .catch((error) => console.log(error));
app.listen(5000, () => {
  console.log("server running");
});
