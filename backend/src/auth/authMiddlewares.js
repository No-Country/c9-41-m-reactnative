import wrapAsync from "../../utils/wrapAsync.js";
import User from "../db/models/user.js";

export const verificateAdminRole = wrapAsync(async (req, res, next) => {
  let user = await User.findOne({
    where: {
      email: req.user?.email,
    },
  });
  if (user.role === "admin" || user.role === "superadmin") {
    next();
  } else {
    return res.status(403).send("Not authorized");
  }
});

export const verificateSuperAdminRole = wrapAsync(async (req, res, next) => {
  let user = await User.findOne({
    where: {
      email: req.user?.username,
    },
  });
  if (user.role === "superadmin") {
    next();
  } else {
    return res.status(403).send("Not authorized");
  }
});

export const isLogIn = wrapAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(403).send("Not authorized");
  }
});
