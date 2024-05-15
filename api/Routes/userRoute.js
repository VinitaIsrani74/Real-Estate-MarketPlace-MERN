import express from 'express'
import { deleteUser, getUserListing, updateUser } from '../Controllers/userController.js';
import { validateToken } from '../utils/validateUser.js';

const userRouter = express.Router();

//routes
userRouter.post("/update/:id",validateToken, updateUser)
userRouter.delete("/delete/:id",validateToken, deleteUser)
userRouter.get("/listings/:id", validateToken, getUserListing)

export default userRouter