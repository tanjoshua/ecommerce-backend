const bcrypt = require("bcryptjs");

const User = require("../models/user");

// controller names are self explanatory

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      // if no user
      res.redirect("/login");
    } else {
      // user found, proceed to authentication
      bcrypt.compare(password, user.password).then((matches) => {
        if (matches) {
          req.session.loggedIn = true;
          req.session.user = user;
          req.session.save(() => {
            // only redirect after done saving
            res.redirect("/");
          });
        } else {
          // incorrect password
          res.redirect("/login");
        }
      });
    }
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
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.redirect("/signup");
    } else {
      bcrypt
        .hash(req.body.password, 12)
        .then((hashedPw) => {
          const user = new User({
            name: "dummy",
            email: req.body.email,
            password: hashedPw,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => res.redirect("/"));
    }
  });
};
