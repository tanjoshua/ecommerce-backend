const express = require("express");

const router = express.Router();

router.get("/add-message", (req, res, next) => {
  res.send(
    "<form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>send</button></form>"
  );
});

router.post("/message", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/", (req, res, next) => {
  res.send("home");
});

module.exports = router;
