import userModel from "../Models/userModel.js"
import bcryptjs from 'bcryptjs'
export const signup = async (req,res) =>{
    const {username, email, password}= req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new userModel({username, email, password: hashedPassword})

    try {
         await  newUser.save();
        res.status(200).json(newUser)
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}