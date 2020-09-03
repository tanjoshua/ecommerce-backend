// external imports
const express = require("express");

// internal imports

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product");
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });

  res.redirect("/");
});

module.exports.routes = router;
module.exports.products = products;
