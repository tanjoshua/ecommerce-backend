const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const User = require("../models/user");

//init transporter for sending mails
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "<REDACTED>",
    },
  })
);

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
            email: req.body.email,
            password: hashedPw,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => {
          transporter.sendMail({
            to: email,
            from: "noreply@shop.com",
            subject: "Signup successful",
            html: "welcome",
          });
          res.redirect("/login");
        });
    }
  });
};

exports.getReset = (req, res, next) => {
  res.render("reset");
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.redirect("/");
    }

    const token = buffer.toString("hex");
    // find user with the email
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        // if user does not exist
        res.redirect("/reset");
      } else {
        // user exists, send email
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1h
        user.save();
      }
    });
  });
};
