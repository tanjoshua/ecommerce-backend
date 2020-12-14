exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  req.session.loggedIn = true;
  res.redirect("/");
};
