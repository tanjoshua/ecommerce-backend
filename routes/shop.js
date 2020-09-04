// external imports
const express = require("express");

// internal imports
const productsController = require("../controllers/products");

// create routes
const router = express.Router();

router.get("/", productsController.getProducts);

module.exports = router;
