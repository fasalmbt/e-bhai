import user from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = await req.body.password;
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new user({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("New user created..")
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const usr = await user.findOne({ username: req.body.username });
    if (!usr) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      usr.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: usr._id, isAdmin: usr.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = usr._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
