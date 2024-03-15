import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

// GET USER
export const getUser = async (req, res, next) => {
  res.status(200).send(req.user);
};

//DELETE
export const deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.userId);
  res.status(200).send("deleted.");
};

//UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const { name, lastName, profilePic } = req.body;

    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUserSlug = async (req,res) => {
  const slug = req.params.slug;
   try{
    const user = await User.findOne({ slug });
   } catch(error){
    console.log(error);
   }
}

export const loginUser = async (req,res,next) => {
  try{
    const {email,password} =req.body;

    const user = await User.findOne({email});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError(401, "Invalid email or password");
    }
    const token = jwt.sign({ userId: user._id }, "", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user });
  } catch(err){

  }
}

