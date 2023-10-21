import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";

// REGISTER

export const register = async (req, res, next) => {
  try {
    const formattedName =
      req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    const formattedLastname =
      req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(createError(409, "User with this email already exists"));
    }

    const hash = bcrypt.hashSync(
      req.body.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    const newUser = new User({
      ...req.body,
      name: formattedName,
      lastName: formattedLastname,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

//LOGIN

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
  } catch {
    console.og(err);
  }
};

// GET EMAIL

export const getEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json({ user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
