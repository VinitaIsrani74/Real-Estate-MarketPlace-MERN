import express from 'express'
import { signup } from '../Controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signup)

export default authRouter