// external imports
const express = require("express");

// internal imports
const rootPath = require("../utils/path");
const products = require("./admin").products;

// create routes
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(products);
  //__dirnames gives the path to the directory of the file, join gives us the right path based on OS
  res.render("shop", { products });
});

module.exports = router;
