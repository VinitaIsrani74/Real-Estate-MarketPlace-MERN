import userModel from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    // res.status(401).json({message: error.message})
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validateUser = await userModel.findOne({ email });

    //validating email
    if (!validateUser) {
      return next(errorHandler(404, "User Not Found"));
    }

    //validating password
    const validatePassword = bcryptjs.compareSync(
      password,
      validateUser.password
    );
    if (!validatePassword) {
      return next(errorHandler(404, "Incorrect Password"));
    }

    //jwt token
    const token = jwt.sign(
      {
        id: validateUser._id,
      },
      process.env.JWT_SECRET
    );

    const {password: pass, ...rest} = validateUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
