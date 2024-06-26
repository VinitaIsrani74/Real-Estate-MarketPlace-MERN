import express from 'express'
import { google, signOut, signin, signup } from '../Controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("/google", google)
authRouter.get("/signout", signOut)

export default authRouter