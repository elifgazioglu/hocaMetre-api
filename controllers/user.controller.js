import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

// GET USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return res.status(403).send("You can delete only your account!");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

//UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can update only your account!"));
    }

    const { name, lastName } = req.body;

    if (name) user.name = name;
    if (lastName) user.lastName = lastName;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    next(error)
  }
};
