import User from "../models/user.model.js";
import bcrypt from "bcrypt";
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


