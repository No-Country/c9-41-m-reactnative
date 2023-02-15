import wrapAsync from "../../utils/wrapAsync.js";
import User from "../db/models/user.js";

export const getUsers = wrapAsync(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({ users });
});

export const getUserDetails = wrapAsync(async (req, res, next) => {
  const { userid } = req.params;
  const userDetails = await User.findById(userid);
  return res.status(200).json({ userDetails });
});

