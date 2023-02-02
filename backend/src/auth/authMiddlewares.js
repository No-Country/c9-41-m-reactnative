import User from "../db/models/user.js";

export const verificateAdminRole = async (req, res, next) => {
  let user = await User.findOne({
    where: {
      name: req.user.name,
    },
  });
  if (user.role === "admin" || user.role === "superAdmin") {
    next();
  } else {
    res.status(403).send("Not authorized");
  }
};

export const verificateSuperAdminRole = async (req, res, next) => {
  let user = await User.findOne({
    where: {
      name: req.user.name,
    },
  });
  if (user.rol === "superAdmin") {
    next();
  } else {
    res.status(403).send("Not authorized");
  }
};

export const isLogIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).send("Not authorized");
  }
};
