import express from 'express'
import { updateUser } from '../Controllers/userController.js';
import { validateToken } from '../utils/validateUser.js';

const userRouter = express.Router();

//routes
userRouter.post("/update/:id",validateToken, updateUser)

export default userRouter