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

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.redirect("/signup");
      } else {
        const user = new User({
          email: req.body.email,
          password: req.body.password,
          cart: { items: [] },
        });
        return user.save();
      }
    })
    .then(() => res.redirect("/"));
};
