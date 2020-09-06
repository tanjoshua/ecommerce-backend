// external imports
const express = require("express");

// internal imports
const productsController = require("../controllers/products");

// create routes
const router = express.Router();

router.get("/", productsController.getProducts);

router.get("/cart", productsController.getCart);

// :productID as a dynamic parameter
router.get("/products/:productID", productsController.getProductByID);

module.exports = router;
