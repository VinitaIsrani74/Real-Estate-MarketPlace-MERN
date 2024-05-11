import userModel from "../Models/userModel.js"
import bcryptjs from 'bcryptjs'
// import { errorHandler } from "../utils/error.js"
export const signup = async (req,res, next) =>{
    const {username, email, password}= req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new userModel({username, email, password: hashedPassword})

    try {
         await  newUser.save();
        res.status(200).json(newUser)
    } catch (error) {
        // res.status(401).json({message: error.message})
    next(error)
    }
}