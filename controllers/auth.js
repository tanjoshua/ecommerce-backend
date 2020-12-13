exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  req.loggedIn = true;
  res.redirect("/");
};
