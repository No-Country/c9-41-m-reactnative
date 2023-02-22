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

export const changeUserRole = wrapAsync(async (req, res, next) => {
  const { userid } = req.params;
  const { role } = req.body;

  if (role !== "user" && role !== "admin") throw new Error("Role not valid.");

  const user = await User.findOne({ _id: userid });

  if (user.role === "superadmin")
    throw new Error("Can not change superadmin role");

  user.role = role;
  await user.save();

  return res.status(200).json({ user });
});

export const retrieveUser = wrapAsync(async (req, res, next) => {
  const recoveredUser = await User.findOneAndUpdate(
    { _id: req.params.userid },
    { active: true },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ recoveredUser });
});

export const banUser = wrapAsync(async (req, res, next) => {
  const bannedUser = await User.findOne({ _id: req.params.userid });

  if (bannedUser.role === "admin" || bannedUser === "superadmin") {
    throw new Error("Can not ban admin o superadmin users");
  } else {
    bannedUser.active = false;
    await bannedUser.save();
  }

  return res.status(200).json({ bannedUser });
});
