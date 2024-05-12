import express from 'express'
import { google, signin, signup } from '../Controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("/google", google)

export default authRouter