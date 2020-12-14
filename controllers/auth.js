const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  User.findById("5fd4621bff9a8750a8fff8d2").then((user) => {
    req.session.loggedIn = true;
    req.session.user = user;
    req.session.save(() => {
      res.redirect("/");
    });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
